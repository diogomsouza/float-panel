import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';

import type { FloatPanelComponent } from './float-panel.component';

@Directive({
  selector: '[floatPanelTriggerFor]',
  standalone: true,
})
export class FloatPanelTriggerDirective implements OnChanges, OnDestroy {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input('floatPanelTriggerFor')
  floatPanel: FloatPanelComponent | null = null;

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): 'true' | 'false' {
    return this.floatPanel?.isOpen ? 'true' : 'false';
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string | null {
    return this.floatPanel?.isOpen ? this.floatPanel.id : null;
  }

  @HostBinding('attr.aria-haspopup')
  readonly ariaHasPopup = 'true';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['floatPanel']) {
      const previous = changes['floatPanel'].previousValue as FloatPanelComponent | null | undefined;
      previous?.clearTrigger(this);
      this.floatPanel?.setTrigger(this);
    }
  }

  ngOnDestroy(): void {
    this.floatPanel?.clearTrigger(this);
  }

  @HostListener('click')
  protected togglePanel(): void {
    this.floatPanel?.toggle();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected togglePanelFromKeyboard(event: Event): void {
    event.preventDefault();
    this.floatPanel?.toggle();
  }
}
