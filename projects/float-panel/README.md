# Float Panel

Angular floating panel anchored to a trigger.

```bash
npm install @stagyra/float-panel @angular/cdk
```

```html
<button type="button" [floatPanelTriggerFor]="filter">
  Open
</button>

<stagyra-float-panel #filter="floatPanel" xPosition="after" yPosition="below">
  <form>
    <input name="asset" />

    <div float-panel-buttons>
      <button type="button">Clear</button>
      <button type="submit">Search</button>
    </div>
  </form>
</stagyra-float-panel>
```

## Imports

```ts
import {
  FloatPanelButtonsDirective,
  FloatPanelComponent,
  FloatPanelTriggerDirective,
} from '@stagyra/float-panel';
```

For NgModule apps:

```ts
import { FloatPanelModule } from '@stagyra/float-panel';
```

## Inputs

| Input | Type | Default |
| --- | --- | --- |
| `xPosition` | `'before' \| 'after'` | `'after'` |
| `yPosition` | `'above' \| 'below'` | `'below'` |
| `offset` | `number` | `1` |
| `panelClass` | `string \| string[] \| Set<string> \| object` | `null` |
| `ariaLabel` | `string \| null` | `null` |
| `ariaLabelledby` | `string \| null` | `null` |
| `role` | `string` | `'region'` |

## Outputs

| Output | Payload |
| --- | --- |
| `opened` | `void` |
| `closed` | `void` |

## Template API

| API | Description |
| --- | --- |
| `open()` | Opens the panel when a trigger is associated. |
| `close()` | Closes the panel. |
| `toggle()` | Opens or closes the panel. |
| `updatePosition()` | Recalculates overlay position. |
| `isOpen` | Current open state. |

## Behavior

- Uses Angular CDK Overlay.
- Does not depend on Angular Material.
- Closes on outside click, `Escape`, API `close()`, or any click inside `float-panel-buttons`.
- Keeps at most one panel open at a time.
- Uses fallback positions when the preferred position would overflow.
- Sizes to content and scrolls internally at the viewport limit.
- Does not show a visual backdrop.
- Does not trap focus.
- Instantiates projected content only while open.
