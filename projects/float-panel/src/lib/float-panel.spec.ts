import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatPanelButtonsDirective } from './float-panel-buttons.directive';
import { FloatPanelTriggerDirective } from './float-panel-trigger.directive';
import { FloatPanelComponent } from './float-panel.component';

@Component({
  standalone: true,
  imports: [FloatPanelComponent, FloatPanelTriggerDirective, FloatPanelButtonsDirective],
  template: `
    <button type="button" [floatPanelTriggerFor]="panel">Open</button>
    <stagyra-float-panel #panel="floatPanel">
      <div class="content">Content</div>
      <div float-panel-buttons>Close</div>
    </stagyra-float-panel>
  `,
})
class HostComponent {}

describe('FloatPanelComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    const overlays = document.querySelectorAll('.cdk-overlay-container');
    overlays.forEach((overlay) => overlay.remove());
  });

  it('opens from its trigger', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(document.querySelector('.stagyra-float-panel')).toBeTruthy();
  });

  it('closes when panel buttons are clicked', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    const panelButtons = document.querySelector('[float-panel-buttons]') as HTMLElement;
    panelButtons.click();
    fixture.detectChanges();

    expect(document.querySelector('.stagyra-float-panel')).toBeFalsy();
  });
});
