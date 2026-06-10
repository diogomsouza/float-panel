import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, Subscription, auditTime, fromEvent, merge, takeUntil } from 'rxjs';

import { FloatPanelCoordinator } from './float-panel-coordinator';
import { FloatPanelClass, FloatPanelXPosition, FloatPanelYPosition } from './float-panel.types';
import type { FloatPanelTriggerDirective } from './float-panel-trigger.directive';

let nextPanelId = 0;

@Component({
  selector: 'stagyra-float-panel',
  exportAs: 'floatPanel',
  standalone: true,
  imports: [NgClass],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #panelTemplate>
      <div
        class="stagyra-float-panel"
        [ngClass]="panelClass"
        [id]="id"
        [attr.role]="role"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby || null"
        (click)="closeFromPanelButtons($event)"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
  styles: `
    :host {
      display: none;
    }

    .cdk-overlay-container,
    .cdk-global-overlay-wrapper {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .cdk-overlay-container {
      position: fixed;
      z-index: 1000;
    }

    .cdk-overlay-pane {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      max-width: 100%;
      max-height: 100%;
      pointer-events: auto;
    }

    .stagyra-float-panel {
      box-sizing: border-box;
      display: block;
      max-width: calc(100vw - 16px);
      max-height: calc(100vh - 16px);
      overflow: auto;
      padding: 16px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      background: #fff;
      color: rgba(0, 0, 0, 0.87);
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
      animation: stagyra-float-panel-enter 120ms ease-out;
      transform-origin: top left;
    }

    @keyframes stagyra-float-panel-enter {
      from {
        opacity: 0;
        transform: translateY(-2px) scale(0.98);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .stagyra-float-panel {
        animation: none;
      }
    }
  `,
})
export class FloatPanelComponent implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly scrollStrategies = inject(ScrollStrategyOptions);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly coordinator = inject(FloatPanelCoordinator);
  private readonly destroy$ = new Subject<void>();

  private overlayRef: OverlayRef | null = null;
  private positionStrategy: FlexibleConnectedPositionStrategy | null = null;
  private trigger: FloatPanelTriggerDirective | null = null;
  private viewportSubscription: Subscription | null = null;

  readonly id = `stagyra-float-panel-${nextPanelId++}`;

  @Input()
  xPosition: FloatPanelXPosition = 'after';

  @Input()
  yPosition: FloatPanelYPosition = 'below';

  @Input()
  offset = 1;

  @Input()
  panelClass: FloatPanelClass | null = null;

  @Input()
  ariaLabel: string | null = null;

  @Input()
  ariaLabelledby: string | null = null;

  @Input()
  role = 'region';

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @ViewChild('panelTemplate', { static: true })
  private readonly panelTemplate!: TemplateRef<unknown>;

  get isOpen(): boolean {
    return !!this.overlayRef?.hasAttached();
  }

  setTrigger(trigger: FloatPanelTriggerDirective): void {
    this.trigger = trigger;
  }

  clearTrigger(trigger: FloatPanelTriggerDirective): void {
    if (this.trigger === trigger) {
      this.close();
      this.trigger = null;
    }
  }

  open(): void {
    if (this.isOpen || !this.trigger) {
      return;
    }

    this.coordinator.open(this);
    this.createOverlay();

    this.overlayRef?.attach(new TemplatePortal(this.panelTemplate, this.viewContainerRef));
    this.watchViewport();
    this.opened.emit();
  }

  close(): void {
    if (!this.overlayRef) {
      return;
    }

    const wasOpen = this.isOpen;
    this.viewportSubscription?.unsubscribe();
    this.viewportSubscription = null;
    this.overlayRef.detach();
    this.coordinator.close(this);

    if (wasOpen) {
      this.closed.emit();
    }
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
      return;
    }

    this.open();
  }

  updatePosition(): void {
    this.positionStrategy?.withPositions(this.getPositions());
    this.overlayRef?.updatePosition();
  }

  protected closeFromPanelButtons(event: MouseEvent): void {
    const target = event.target;

    if (target instanceof Element && target.closest('[float-panel-buttons]')) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.viewportSubscription?.unsubscribe();
    this.overlayRef?.dispose();
    this.coordinator.close(this);
  }

  private createOverlay(): void {
    if (!this.trigger) {
      return;
    }

    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger.elementRef)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withViewportMargin(8)
      .withPositions(this.getPositions());

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.positionStrategy,
        scrollStrategy: this.scrollStrategies.reposition(),
        panelClass: 'stagyra-float-panel-overlay',
      });

      this.overlayRef
        .outsidePointerEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => this.closeFromOutsidePointer(event));

      this.overlayRef
        .keydownEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
          }
        });
      return;
    }

    this.overlayRef.updatePositionStrategy(this.positionStrategy);
  }

  private closeFromOutsidePointer(event: MouseEvent): void {
    const target = event.target;

    if (
      target instanceof Node &&
      this.trigger?.elementRef.nativeElement.contains(target)
    ) {
      return;
    }

    this.close();
  }

  private watchViewport(): void {
    this.viewportSubscription?.unsubscribe();
    this.viewportSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(document, 'scroll', { capture: true } as AddEventListenerOptions),
    )
      .pipe(auditTime(16))
      .subscribe(() => {
        if (this.hasLostAnchor()) {
          this.close();
          return;
        }

        this.updatePosition();
      });
  }

  private hasLostAnchor(): boolean {
    const origin = this.trigger?.elementRef.nativeElement;

    if (!origin?.isConnected) {
      return true;
    }

    const rect = origin.getBoundingClientRect();

    return (
      rect.right < 0 ||
      rect.left > window.innerWidth ||
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    );
  }

  private getPositions(): ConnectedPosition[] {
    const xPositions: FloatPanelXPosition[] =
      this.xPosition === 'after' ? ['after', 'before'] : ['before', 'after'];
    const yPositions: FloatPanelYPosition[] =
      this.yPosition === 'below' ? ['below', 'above'] : ['above', 'below'];

    return [
      this.createPosition(xPositions[0], yPositions[0]),
      this.createPosition(xPositions[1], yPositions[0]),
      this.createPosition(xPositions[0], yPositions[1]),
      this.createPosition(xPositions[1], yPositions[1]),
    ];
  }

  private createPosition(
    xPosition: FloatPanelXPosition,
    yPosition: FloatPanelYPosition,
  ): ConnectedPosition {
    return {
      originX: xPosition === 'after' ? 'start' : 'end',
      overlayX: xPosition === 'after' ? 'start' : 'end',
      originY: yPosition === 'below' ? 'bottom' : 'top',
      overlayY: yPosition === 'below' ? 'top' : 'bottom',
      offsetX: 0,
      offsetY: yPosition === 'below' ? this.offset : -this.offset,
    };
  }
}
