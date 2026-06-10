import { Injectable } from '@angular/core';

import type { FloatPanelComponent } from './float-panel.component';

@Injectable({ providedIn: 'root' })
export class FloatPanelCoordinator {
  private activePanel: FloatPanelComponent | null = null;

  open(panel: FloatPanelComponent): void {
    if (this.activePanel && this.activePanel !== panel) {
      this.activePanel.close();
    }

    this.activePanel = panel;
  }

  close(panel: FloatPanelComponent): void {
    if (this.activePanel === panel) {
      this.activePanel = null;
    }
  }
}
