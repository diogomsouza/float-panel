import { NgModule } from '@angular/core';

import { FloatPanelButtonsDirective } from './float-panel-buttons.directive';
import { FloatPanelTriggerDirective } from './float-panel-trigger.directive';
import { FloatPanelComponent } from './float-panel.component';

@NgModule({
  imports: [FloatPanelComponent, FloatPanelTriggerDirective, FloatPanelButtonsDirective],
  exports: [FloatPanelComponent, FloatPanelTriggerDirective, FloatPanelButtonsDirective],
})
export class FloatPanelModule {}
