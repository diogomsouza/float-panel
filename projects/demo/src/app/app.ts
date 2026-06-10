import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FloatPanelButtonsDirective,
  FloatPanelComponent,
  FloatPanelTriggerDirective,
  FloatPanelXPosition,
  FloatPanelYPosition,
} from '@stagyra/float-panel';

interface ExamplePanel {
  title: string;
  note: string;
  xPosition: FloatPanelXPosition;
  yPosition: FloatPanelYPosition;
  icon: string;
  accent: string;
}

interface TokenGroup {
  label: string;
  values: string[];
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatIconModule,
    FloatPanelButtonsDirective,
    FloatPanelComponent,
    FloatPanelTriggerDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected xPosition: FloatPanelXPosition = 'after';
  protected yPosition: FloatPanelYPosition = 'below';
  protected offset = 1;
  protected copiedCode = '';

  protected readonly xPositions: FloatPanelXPosition[] = ['before', 'after'];
  protected readonly yPositions: FloatPanelYPosition[] = ['above', 'below'];
  protected readonly offsetOptions = [0, 1, 4, 8, 12, 16];

  protected readonly examples: ExamplePanel[] = [
    {
      title: 'Command palette',
      note: 'Quick actions near a compact toolbar button.',
      xPosition: 'after',
      yPosition: 'below',
      icon: 'bolt',
      accent: 'teal',
    },
    {
      title: 'Inspector',
      note: 'Contextual detail opened above the selected target.',
      xPosition: 'after',
      yPosition: 'above',
      icon: 'analytics',
      accent: 'blue',
    },
    {
      title: 'User card',
      note: 'A rich profile preview aligned before the trigger.',
      xPosition: 'before',
      yPosition: 'below',
      icon: 'person',
      accent: 'violet',
    },
    {
      title: 'Release note',
      note: 'A compact status panel that closes from its actions.',
      xPosition: 'before',
      yPosition: 'above',
      icon: 'rocket_launch',
      accent: 'orange',
    },
  ];

  protected readonly tokenGroups: TokenGroup[] = [
    {
      label: 'Placement',
      values: ['xPosition', 'yPosition', 'before', 'after', 'above', 'below'],
    },
    {
      label: 'Surface',
      values: ['offset', 'panelClass', 'role', 'ariaLabel', 'ariaLabelledby'],
    },
    {
      label: 'Lifecycle',
      values: ['open()', 'close()', 'toggle()', 'updatePosition()', 'isOpen'],
    },
    {
      label: 'Events',
      values: ['opened', 'closed', 'float-panel-buttons', 'outside click', 'Escape'],
    },
  ];

  protected get playgroundCode(): string {
    return `<button [floatPanelTriggerFor]="panel">Open panel</button>

<stagyra-float-panel
  #panel="floatPanel"
  xPosition="${this.xPosition}"
  yPosition="${this.yPosition}"
  [offset]="${this.offset}"
  panelClass="demo-panel"
>
  <div>Any projected content</div>
  <div float-panel-buttons>
    <button type="button">Done</button>
  </div>
</stagyra-float-panel>`;
  }

  protected exampleCode(example: ExamplePanel): string {
    return `<stagyra-float-panel
  #panel="floatPanel"
  xPosition="${example.xPosition}"
  yPosition="${example.yPosition}"
>
  <app-${example.accent}-content />
</stagyra-float-panel>`;
  }

  protected copy(value: string): void {
    this.copiedCode = value;
    void navigator.clipboard?.writeText(value);
  }
}
