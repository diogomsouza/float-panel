# Float Panel

Angular floating panel anchored to a trigger, published as `@stagyra/float-panel`.

Demo: https://diogomsouza.github.io/float-panel/

The package provides a content-only surface. Buttons, forms, lists, and other controls are projected by the consuming app.

## Install

```bash
npm install @stagyra/float-panel @angular/cdk
```

Peer dependencies:

```json
{
  "@angular/cdk": ">=18.0.0 <23.0.0",
  "@angular/common": ">=18.0.0 <23.0.0",
  "@angular/core": ">=18.0.0 <23.0.0"
}
```

## Standalone Import

```ts
import {
  FloatPanelButtonsDirective,
  FloatPanelComponent,
  FloatPanelTriggerDirective,
} from '@stagyra/float-panel';
```

## NgModule Import

```ts
import { FloatPanelModule } from '@stagyra/float-panel';
```

## Usage

```html
<button type="button" [floatPanelTriggerFor]="filter">
  Open
</button>

<stagyra-float-panel
  #filter="floatPanel"
  xPosition="after"
  yPosition="below"
>
  <form>
    <input name="asset" />

    <div float-panel-buttons>
      <button type="button">Clear</button>
      <button type="submit">Search</button>
    </div>
  </form>
</stagyra-float-panel>
```

Any click inside `float-panel-buttons` closes the panel. Clicks elsewhere inside the panel do not close it.

## API

### `stagyra-float-panel`

| Input | Type | Default |
| --- | --- | --- |
| `xPosition` | `'before' \| 'after'` | `'after'` |
| `yPosition` | `'above' \| 'below'` | `'below'` |
| `offset` | `number` | `1` |
| `panelClass` | `string \| string[] \| Set<string> \| object` | `null` |
| `ariaLabel` | `string \| null` | `null` |
| `ariaLabelledby` | `string \| null` | `null` |
| `role` | `string` | `'region'` |

| Output | Payload |
| --- | --- |
| `opened` | `void` |
| `closed` | `void` |

| Template API | Description |
| --- | --- |
| `open()` | Opens the panel when a trigger is associated. |
| `close()` | Closes the panel. |
| `toggle()` | Opens or closes the panel. |
| `updatePosition()` | Recalculates overlay position. |
| `isOpen` | Current open state. |

### `[floatPanelTriggerFor]`

Receives a direct template reference to a `stagyra-float-panel`.

```html
<button [floatPanelTriggerFor]="filter">Open</button>
<stagyra-float-panel #filter="floatPanel">...</stagyra-float-panel>
```

### `float-panel-buttons`

Marks a projected content region that closes the panel on any click.

## Behavior

- Uses Angular CDK Overlay.
- Does not depend on Angular Material.
- Opens from click, `Enter`, or `Space` on the trigger.
- Closes on outside click, `Escape`, API `close()`, or any click inside `float-panel-buttons`.
- Keeps at most one panel open at a time.
- Uses preferred `xPosition` and `yPosition`, then fallback positions if the panel would overflow the viewport.
- Sizes to content until the viewport limit is reached, then scrolls internally.
- Does not show a visual backdrop.
- Does not trap focus.
- Instantiates projected content only while open.

## Development

This workspace targets Angular 22. Angular CLI 22 requires Node `>=22.22.3`, `>=24.15.0`, or `>=26.0.0`.

```bash
npm run build:lib
npm run build:demo
npm test
```

GitHub Pages demo build:

```bash
npm run build:demo:pages
```

Package handoff:

```bash
npm run build:lib
cd dist/float-panel
npm publish --dry-run --access public
npm pack --pack-destination ..
```
