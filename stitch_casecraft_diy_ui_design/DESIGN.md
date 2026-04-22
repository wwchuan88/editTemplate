```markdown
# Design System Document

## 1. Overview & Creative North Star: "The Playful Atelier"

This design system is built to transform the utility of a DIY phone case app into a premium, editorial-grade creative experience. Our Creative North Star is **"The Playful Atelier"**—a space that feels as professional as a high-end design studio but as uninhibited as a sketchbook. 

We depart from the "standard app" look by rejecting rigid grids and industrial borders. Instead, we utilize **intentional asymmetry**, **soft-touch depth**, and **exaggerated roundedness** to create a UI that feels "bouncy," youthful, and tactile. By combining high-end editorial spacing with hand-drawn whimsical elements, we ensure the interface never feels like a template, but rather a curated canvas for the user’s own creativity.

---

## 2. Colors & Surface Philosophy

The palette centers on a high-energy "Solar Primary" supported by a sophisticated ecosystem of pastel neutrals.

### The Color Logic
*   **Primary (#FFD700):** Our "Solar" yellow. It is the heartbeat of the app. Use it sparingly for high-impact CTAs and moments of success.
*   **Secondary (#166665):** A deep teal used to ground the "Solar" yellow, providing professional contrast.
*   **The Pastels (Tertiary & Containers):** Tones like `tertiary_container` (#ffaebc) and `secondary_container` (#a8efed) should be used for background zones to categorize different creative themes.

### The "No-Line" Rule
**Traditional 1px borders are strictly prohibited.** We define boundaries through tonal shifts. A card does not need a line to exist; it exists because its surface (`surface_container_lowest`) is brighter than the section it sits upon (`surface`). This creates a cleaner, "limitless" aesthetic that mirrors the Pinterest-style infinite flow.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of soft-matte acrylic.
*   **Level 0 (Background):** `surface` (#f6f6f6) – The base layer.
*   **Level 1 (Sections):** `surface_container_low` – Use for grouping content blocks.
*   **Level 2 (Active Cards):** `surface_container_lowest` (#ffffff) – Reserved for the most interactive content to make it "pop" against the off-white base.

### Signature Textures & Glass
To elevate the "Canva" feel into something more bespoke, use **Glassmorphism** for floating toolbars (e.g., the case customization dock). Apply `surface_bright` at 80% opacity with a 20px backdrop blur. For primary CTAs, use a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle to give the button a "candy-coated" 3D depth.

---

## 3. Typography: Editorial Playfulness

We use a dual-typeface system to balance readability with a "hand-crafted" soul.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric clarity. Large scales (Display-LG) should be used with tight letter-spacing (-2%) to create an editorial "poster" feel. 
*   **Body & Titles (Be Vietnam Pro):** This typeface provides a soft, approachable legibility. It maintains the "rounded" DNA without compromising the density required for tool descriptions or settings.
*   **Hierarchy as Identity:** Use `display-md` for screen headers, but offset them slightly to the left or right to break the "centered" default. This asymmetry signals a "creative-first" environment.

---

## 4. Elevation & Depth: Tonal Layering

We avoid the "dirty" look of standard grey shadows. Depth is an atmosphere, not a structural tool.

*   **The Layering Principle:** Instead of shadows, nest `surface_container_high` inside `surface` to create a "recessed" area (perfect for a "Case Tray" selector).
*   **Ambient Shadows:** For floating action buttons or "Hero" phone case previews, use a shadow with a 40px blur, 10px Y-offset, and 6% opacity. The shadow color must be a tinted version of `on_surface` (a deep slate) rather than pure black.
*   **The "Ghost Border" Fallback:** If a UI element (like a white case on a white background) requires definition, use `outline_variant` at 15% opacity. It should feel like a faint pencil mark, not a digital stroke.

---

## 5. Components

### Buttons
*   **Primary:** Uses the "Solar" gradient. Roundedness: `full`. No border. Text: `title-sm` in `on_primary_fixed`.
*   **Secondary:** `surface_container_highest` background with `primary` text. Provides a soft, tactile feel.
*   **Icon Buttons:** Always enclosed in a `full` radius circle. Use `fine-line` icons with a 1.5pt stroke weight.

### Cards & Lists
*   **Pinterest-Style Cards:** Use `xl` (3rem) or `lg` (2rem) border-radius. Content must have at least 24px of internal padding.
*   **The No-Divider Rule:** Lists must never use horizontal lines. Separate list items using 12px of vertical `surface` space or by alternating between `surface_container_low` and `surface_container_highest`.

### Custom Components for DIY
*   **The "Sticker Tray":** A bottom sheet using `surface_container_lowest` with a `xl` top-corner radius. Use a `glassmorphism` header to allow stickers to "peek" through as they scroll.
*   **The Canvas Preview:** The phone case model should sit on a `surface_dim` background to make the case colors feel more vivid and true-to-life.
*   **Hand-Drawn Tooltips:** Tooltips should use a slightly irregular, "hand-drawn" vector bubble shape rather than a perfect geometric one, utilizing `primary_container`.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Whitespace:** If a screen feels "busy," increase the vertical spacing between containers rather than adding borders.
*   **Use Asymmetry:** Place "New Collection" banners slightly off-center to create a dynamic, youthful energy.
*   **Mix Media:** Pair high-resolution 3D phone case renders with flat, hand-drawn "scribble" icons to emphasize the DIY spirit.

### Don't:
*   **Don't use 90-degree corners:** Everything in this system is approachable; sharp corners are forbidden. Minimum radius is `sm` (0.5rem).
*   **Don't use pure black:** Use `on_surface` or `on_background` for text to maintain the soft, premium "ink on paper" feel.
*   **Don't over-rely on the Primary Yellow:** If the whole screen is yellow, nothing is important. Use it as a "light-switch" to guide the user's eye to the "Purchase" or "Save" actions.

---

## 7. Spacing Scale

We use a 4px-base grid but prioritize "Breathability."
*   **Layout Margin:** 24px (gives the 9:16 mobile screen an editorial "frame").
*   **Gutter:** 16px.
*   **Section Padding:** 48px to 64px (to create a sense of luxury and space).

By adhering to these principles, the design system ensures a digital experience that feels as customizable and vibrant as the phone cases our users create.```