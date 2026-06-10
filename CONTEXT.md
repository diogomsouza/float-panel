# Float Panel

This context defines the language for a reusable floating panel component used to show arbitrary projected content next to a user interaction target.

## Language

**Float Panel**:
A content-only floating surface anchored to a trigger.
_Avoid_: Menu, dialog, popover with built-in actions

**Float Panel Element**:
The template element `<stagyra-float-panel>` that declares a **Float Panel**.
_Avoid_: `<float-panel>`

**Float Panel Package**:
The published npm package named `@stagyra/float-panel`.
_Avoid_: Unscoped package

**Demo App**:
The Angular application that demonstrates the **Float Panel Package** on GitHub Pages.
_Avoid_: Documentation-only site

**Package Documentation**:
The README content shipped with the **Float Panel Package**.
_Avoid_: Demo-only instructions

**Trigger**:
The UI element that opens a **Float Panel**.
_Avoid_: Button, activator

**Trigger Interaction**:
The user action that toggles a **Float Panel** from its **Trigger**.
_Avoid_: Hover interaction

**Panel Content**:
The arbitrary content projected inside a **Float Panel** by the consuming app.
_Avoid_: Items, menu entries, actions

**Lazy Content**:
Panel content that is instantiated only while its **Float Panel** is open.
_Avoid_: Hidden persistent content

**Consumer State**:
State owned by the consuming app outside the **Float Panel** lifecycle.
_Avoid_: Panel-owned form state

**Panel Buttons**:
A marked region inside **Panel Content** whose clicks close the **Float Panel**.
_Avoid_: Footer, actions owned by the panel

**Preferred Position**:
The requested horizontal and vertical placement of a **Float Panel** relative to its **Trigger**.
_Avoid_: Fixed position

**Fallback Position**:
An alternate placement used when the **Preferred Position** would not fit in the viewport.
_Avoid_: Manual repositioning

**Outside Click**:
A click that occurs outside both the **Trigger** and the **Float Panel**.
_Avoid_: Backdrop click

**Panel API**:
The public template-facing controls and state exposed by a **Float Panel**.
_Avoid_: Internal overlay implementation

**Panel Inputs**:
The declarative configuration accepted by the **Float Panel Element**.
_Avoid_: Implementation options

**Panel Accessibility**:
The ARIA relationship between a **Trigger** and an open **Float Panel**.
_Avoid_: Modal accessibility

**Natural Focus**:
Focus behavior that follows the page order without trapping focus inside a **Float Panel**.
_Avoid_: Focus trap

**Import API**:
The public Angular entry points used to consume the **Float Panel Package**.
_Avoid_: Internal declarations

**Panel Surface**:
The default visible container around **Panel Content**.
_Avoid_: Theme, design system

**Panel Motion**:
The minimal CSS-based opening and closing transition of a **Float Panel**.
_Avoid_: Angular animation dependency

**Consumer UI Kit**:
The component library or styling system used inside **Panel Content** by the consuming app.
_Avoid_: Float Panel dependency

**Content Size**:
The natural size of a **Float Panel** based on its **Panel Content**.
_Avoid_: Fixed panel size

**Viewport Limit**:
The maximum visible area a **Float Panel** may occupy before its content scrolls.
_Avoid_: Clipped overflow

**Anchor Loss**:
The state where the **Trigger** is removed or no longer available as a useful visual anchor.
_Avoid_: Scroll close

**Offset**:
The gap in pixels between a **Trigger** and an open **Float Panel**.
_Avoid_: Margin

## Relationships

- A **Trigger** opens at most one **Float Panel** at a time.
- A **Trigger** references its **Float Panel** directly, not by string or id lookup.
- A **Trigger Interaction** is click, Enter, or Space.
- Programmatic opening through the **Panel API** requires an associated **Trigger**.
- Only one **Float Panel** should be open at a time.
- A **Float Panel** is declared with the **Float Panel Element**.
- The **Float Panel Package** is published as `@stagyra/float-panel`.
- The **Demo App** is published separately from the **Float Panel Package**.
- The **Demo App** primarily demonstrates a filter form with **Panel Buttons**.
- **Package Documentation** explains installation, imports, API, behavior, accessibility, and demo usage.
- A **Float Panel** renders exactly one projected **Panel Content** region.
- **Panel Content** is **Lazy Content** by default.
- **Panel Content** is owned by the consuming app, not by the **Float Panel**.
- Persistent values inside **Panel Content** should live as **Consumer State**.
- **Panel Buttons** belongs to **Panel Content**, but the **Float Panel** observes any click inside it to close itself.
- **Panel Buttons** does not support per-click exceptions.
- A **Float Panel** first tries its **Preferred Position** and may use a **Fallback Position** to remain visible.
- An **Outside Click** closes the **Float Panel** without displaying a backdrop.
- A click on the **Trigger** is a **Trigger Interaction**, not an **Outside Click**.
- A **Panel API** exposes opening, closing, toggling, position updates, open state, and open or close events.
- Open and close events in the **Panel API** are lifecycle signals without payload.
- The **Panel API** does not emit a dedicated **Panel Buttons** click event.
- **Panel Inputs** include `xPosition`, `yPosition`, `offset`, `panelClass`, `ariaLabel`, `ariaLabelledby`, and `role`.
- **Panel Accessibility** links the **Trigger** and **Float Panel** without treating the panel as modal by default.
- A **Float Panel** uses **Natural Focus** instead of trapping or stealing focus by default.
- The **Import API** supports both standalone imports and `FloatPanelModule`.
- A **Panel Surface** provides a minimal default visual container while allowing app-level class customization.
- **Panel Motion** is CSS-based and respects reduced-motion preferences.
- A **Consumer UI Kit** may be used inside **Panel Content**, but it is not owned or required by the **Float Panel**.
- A **Float Panel** follows its **Content Size** until it reaches the **Viewport Limit**.
- A **Float Panel** scrolls internally when **Panel Content** exceeds the **Viewport Limit**.
- A **Float Panel** uses an **Offset** of 1 pixel unless a consuming app sets another value.
- A **Float Panel** repositions on scroll or resize while the **Trigger** remains a useful anchor.
- **Anchor Loss** closes the **Float Panel**.

## Example dialogue

> **Dev:** "Should the **Float Panel** include a close button or filter buttons?"
> **Domain expert:** "No, those belong to the **Panel Content**. The **Float Panel** only provides the floating surface anchored to the **Trigger**."

> **Dev:** "Which element declares a **Float Panel**?"
> **Domain expert:** "Use the **Float Panel Element**: `<stagyra-float-panel>`."

> **Dev:** "Can a **Trigger** find a **Float Panel** by id string?"
> **Domain expert:** "No, it should receive a direct template reference to the **Float Panel**."

> **Dev:** "Does closed **Panel Content** stay hidden in the DOM?"
> **Domain expert:** "No, it is **Lazy Content** and exists only while the **Float Panel** is open."

> **Dev:** "Where should filter values live if they must survive closing the **Float Panel**?"
> **Domain expert:** "They should live as **Consumer State**, such as a parent form group."

> **Dev:** "If a user clicks anywhere inside **Panel Buttons**, who closes the panel?"
> **Domain expert:** "The **Float Panel** closes itself after that click, while the consuming app still owns any button behavior."

> **Dev:** "Can one click inside **Panel Buttons** opt out of closing the **Float Panel**?"
> **Domain expert:** "No, content that should not close the **Float Panel** should stay outside **Panel Buttons**."

> **Dev:** "If the **Preferred Position** does not fit on a small screen, should the panel be clipped?"
> **Domain expert:** "No, the **Float Panel** should use a **Fallback Position** when needed."

> **Dev:** "Should opening a **Float Panel** dim or block the rest of the page?"
> **Domain expert:** "No, it should only close on an **Outside Click**."

> **Dev:** "Is clicking the open panel's **Trigger** an **Outside Click**?"
> **Domain expert:** "No, it is a **Trigger Interaction** and should toggle the panel."

> **Dev:** "Can a consuming app close a **Float Panel** after an async operation?"
> **Domain expert:** "Yes, it can use the **Panel API** instead of depending only on user clicks."

> **Dev:** "Can a **Float Panel** open without a **Trigger**?"
> **Domain expert:** "No, opening requires a **Trigger** because the panel is anchored."

> **Dev:** "Do open and close events explain why the **Float Panel** changed state?"
> **Domain expert:** "No, they are lifecycle signals without payload."

> **Dev:** "Does the **Float Panel** re-emit clicks from **Panel Buttons**?"
> **Domain expert:** "No, the consuming app handles its own click events inside **Panel Content**."

> **Dev:** "Which configuration belongs in the **Panel Inputs**?"
> **Domain expert:** "Only placement, offset, surface class, and accessibility fields belong there in the initial API."

> **Dev:** "Is a **Float Panel** announced as a modal dialog?"
> **Domain expert:** "No, **Panel Accessibility** should use a non-modal role by default."

> **Dev:** "Does opening a **Float Panel** trap keyboard focus?"
> **Domain expert:** "No, it uses **Natural Focus** because it is not modal."

> **Dev:** "Can module-based Angular apps consume the **Float Panel Package**?"
> **Domain expert:** "Yes, the **Import API** includes `FloatPanelModule` in addition to standalone imports."

> **Dev:** "Does the **Float Panel** own the visual style of fields and buttons?"
> **Domain expert:** "No, it only owns the **Panel Surface**; controls inside remain **Panel Content**."

> **Dev:** "Does **Panel Motion** require Angular animations?"
> **Domain expert:** "No, **Panel Motion** should stay CSS-based so the package remains lightweight."

> **Dev:** "Does using Material buttons inside **Panel Content** make Material a **Float Panel** dependency?"
> **Domain expert:** "No, Material is only a **Consumer UI Kit** in that app or demo."

> **Dev:** "Is the **Demo App** the npm package?"
> **Domain expert:** "No, the **Demo App** shows the **Float Panel Package** but is published only to GitHub Pages."

> **Dev:** "Is the **Demo App** enough documentation for npm users?"
> **Domain expert:** "No, **Package Documentation** must ship with the package."

> **Dev:** "What should the primary **Demo App** scenario show?"
> **Domain expert:** "A filter form opened from a toolbar trigger, with actions inside **Panel Buttons**."

> **Dev:** "Should consumers set a panel width for normal use?"
> **Domain expert:** "No, the **Float Panel** should follow its **Content Size** and only scroll at the **Viewport Limit**."

> **Dev:** "How much space should exist between the **Trigger** and the **Float Panel**?"
> **Domain expert:** "The default **Offset** is 1 pixel, with an option for consumers to adjust it."

> **Dev:** "Can two **Float Panels** stay open at the same time?"
> **Domain expert:** "No, opening one **Float Panel** should close any other open **Float Panel**."

> **Dev:** "Should hovering a **Trigger** open a **Float Panel**?"
> **Domain expert:** "No, the **Trigger Interaction** is click or keyboard activation so form content remains stable."

> **Dev:** "Should scrolling close the **Float Panel** immediately?"
> **Domain expert:** "No, it should reposition until **Anchor Loss** occurs."

## Flagged ambiguities

- "painel" can sound like a complete filter UI, but here it means **Float Panel**: the surface only, without built-in controls.
