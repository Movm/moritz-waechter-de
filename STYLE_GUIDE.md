# Moritz Wächter - Style Guide
## Professional Design System Documentation

---

## 1. Color System Architecture

### 1.1 Foundational Scale
The design system employs a single-hue eucalyptus scale (11 stops, 50-950) as the sole chromatic foundation. This monochromatic approach ensures visual coherence and simplifies cognitive load.

**Scale Structure:**
```
50  → #F0F4F3  (Δ95 lightness)
100 → #D5E1DC  (Δ85)
200 → #BACEC6  (Δ75)
300 → #A0BBB0  (Δ65)
400 → #85A899  (Δ55)
500 → #6A9583  (Δ45) ← Perceptual midpoint
600 → #5F8575  (Δ40)
700 → #445F54  (Δ28) ← Primary anchor
800 → #31453C  (Δ18)
900 → #1E2A25  (Δ10)
950 → #0B0F0D  (Δ04)
```

### 1.2 Semantic Mapping

**Light Theme:**
```css
primary:          700 → 600 → 500 → 400
primary-dark:     800 → 900 → 950
accent:           100
secondary:        600
```

**Dark Theme (Inverted):**
```css
primary:          500 → 400 → 300 → 200
primary-dark:     600 → 700 → 800
accent:           200
secondary:        500
```

**Rationale:** Dark mode inversion maintains perceptual contrast ratios while adapting to low-luminance contexts.

### 1.3 Gradient Systems

**Background Gradient (135° diagonal):**
- Light: `600 → 700` (Δ40 → Δ28)
- Dark: `500 → 700` (Δ45 → Δ28)
- Purpose: Spatial depth, hero sections

**Accent Gradient (0° horizontal):**
- Light: `600 → 700`
- Dark: `500 → 700`
- Purpose: Decorative elements, dividers, underlines

**Button Gradient (0° horizontal):**
- Universal: `700 → 800` (Δ28 → Δ18)
- Purpose: Interactive surfaces requiring depth

---

## 2. Component Patterns

### 2.1 Button System
**Centralized Definition:** `src/css/buttons.css`

**Classes:**
- `.standardButton` — `<button>` elements
- `.standardButtonLink` — `<a>` elements
- `.buttonIcon` — Icon styling

**Specifications:**
```css
background:       linear-gradient(0deg, var(--color-700), var(--color-800))
color:            #FFFFFF
border-radius:    9999px (pill morphology)
hover:            Minimal effect (no chromatic shift)
transform:        None (no scale/skew)
```

**Implementation:**
```css
.customButton {
  composes: standardButton from global;
  /* Context-specific overrides only */
}
```

### 2.2 Content Cards

**Structure:**
```css
background:       #FFFFFF (light) | rgb(31, 41, 55) (dark)
border-radius:    1.5rem (24px)
box-shadow:       0 25px 50px -12px rgba(0, 0, 0, 0.25)
padding:          2rem–3rem (context-dependent)
```

**Usage Context:** Primary content containers on gradient backgrounds

### 2.3 Form Elements

**States:**
- Default: Neutral gray borders
- Focus: `var(--ifm-color-primary)` (4px ring recommended)
- Error: External system color
- Disabled: 50% opacity

**Submit Controls:** Must use `.standardButton` class

### 2.4 Iconography

**Color Application:**
- Icon fill: `var(--ifm-color-primary)`
- Container background: `var(--color-secondary-lighter)` or 200-300 range
- Container shape: `border-radius: 50%` (circular)
- Depth: `box-shadow` for elevation

---

## 3. Typography & Contrast

### 3.1 Contrast Pairings

**Light Backgrounds (50-200):**
- Body text: 700-950 range
- Headings: 800-950 range
- Secondary text: 600-700 range

**Dark Backgrounds (800-950):**
- All text: `#FFFFFF`
- Secondary text: 50-200 range

**Gradient Backgrounds:**
- Exclusive use: `#FFFFFF`

### 3.2 Accessibility Standards
- **Minimum:** WCAG AA (4.5:1 text, 3:1 UI)
- **Target:** AAA for body text (7:1)
- **Focus indicators:** Visible 4px outlines using primary color
- **Dark mode:** Inverted scale ensures maintained ratios

---

## 4. Layout & Spatial Systems

### 4.1 Hero Sections

**Background:**
```css
linear-gradient(135deg, var(--color-950), var(--color-900))
```
- Creates near-black to very-dark transition
- Text: White only

### 4.2 Decorative Elements

**Underlines/Accents:**
- Use: `var(--accent-gradient)`
- Height: 2-4px
- Positioning: Offset from text baseline

**Dividers:**
- Solid: 200-400 range (subtle) | 600-800 range (prominent)
- Gradient: `var(--accent-gradient)`

**Section Backgrounds:**
- Primary pattern: White cards with shadow on gradient backgrounds
- Hierarchy through elevation, not color variation

---

## 5. Implementation Standards

### 5.1 Variable Usage

**Required Pattern:**
```css
/* ✓ Correct */
background: var(--color-700);
color: var(--ifm-color-primary);

/* ✗ Incorrect */
background: #445F54;
color: #5F8575;
```

**Rationale:** Variable references enable:
1. Single source of truth
2. Automatic theme switching
3. Global updates from one location
4. Self-documenting code

### 5.2 File Structure

**Color Definitions:** `src/css/custom.css`
- Base scale (--color-50 through --color-950)
- Semantic mappings
- Gradient definitions

**Button System:** `src/css/buttons.css`
- Automatically imported via `custom.css`
- Global availability

**Component Styles:** CSS Modules
- Use `composes` for button classes
- Reference variables only

### 5.3 Selection Decision Tree

```
Need color for:
├─ Backgrounds
│  ├─ Light: 50-200
│  └─ Dark: 800-950
├─ Text
│  ├─ On light: 700-950
│  └─ On dark: 50-300
├─ Borders/Dividers
│  ├─ Subtle: 200-400
│  └─ Prominent: 600-800
└─ Interactive Elements: 600-800
```

---

## 6. Design Principles

### 6.1 Consistency Over Novelty
- Single color family eliminates discord
- Gradients provide variation without introducing hues
- Depth through lightness, not saturation

### 6.2 Minimalism in Interaction
- No hover color transitions on buttons
- No transform effects (scale/rotate)
- Focus on functional clarity

### 6.3 Systematic Constraints
- All chromatic choices from one scale
- Gradients use adjacent stops only
- White text on dark, dark text on white (no mid-contrast experiments)

### 6.4 Theme Adaptability
- Inverted mappings maintain contrast in dark mode
- Same visual hierarchy across themes
- No special-case colors

---

## 7. Migration & Maintenance

### 7.1 Historical Context
**Previous System:** Phthalo green with hardcoded hex values
**Current System:** Eucalyptus variable-based scale
**Migration Goal:** Eliminate technical debt, improve maintainability

### 7.2 Backward Compatibility
- Docusaurus `--ifm-color-primary` variables preserved
- Existing components function without modification
- New components use new variable conventions

### 7.3 Future-Proofing
- Scale expansion: Add intermediate stops (e.g., 150, 250) if needed
- Hue shift: Modify base color values in one location
- Contrast adjustment: Update specific stop values without system redesign

---

## 8. Quality Assurance Checklist

**Before implementing new components:**
- [ ] All colors use `var(--color-*)` or `var(--ifm-color-*)`
- [ ] Buttons use `.standardButton` or `.standardButtonLink`
- [ ] Contrast ratios meet WCAG AA minimum
- [ ] Dark mode tested with inverted scale
- [ ] No hardcoded hex values in component CSS
- [ ] Gradients use documented patterns
- [ ] Text on gradients is white
- [ ] Form focus states use primary color

---

## 9. Reference Quick Guide

**Common Patterns:**

| Element Type | Light Mode | Dark Mode |
|--------------|------------|-----------|
| Hero background | `950 → 900` gradient | Same |
| Primary button | `700 → 800` gradient | Same |
| Content card | White + shadow | `rgb(31,41,55)` |
| Body text on white | `var(--color-800)` | N/A |
| Body text on dark | White | `var(--color-100)` |
| Accent badge | `var(--color-accent)` bg | Same |
| Icon container | `200-300` range | `700-800` range |
| Divider subtle | `var(--color-300)` | `var(--color-700)` |
| Focus ring | `var(--ifm-color-primary)` | Same |

---

## 10. Designer Handoff Requirements

**Deliverables must specify:**
1. Color by variable name (not hex)
2. Gradient direction and stops
3. Border radius in rem units
4. Shadow specifications
5. Spacing in rem units
6. Contrast ratio verification
7. Dark mode variant if differs from inverted pattern

**Example Annotation:**
```
Button:
- Class: standardButton
- Override padding: 1rem 2rem
- Override font-size: 1.125rem
- No custom colors
```

---

*This style guide is authoritative for all design implementations on Moritz Wächter's personal website.*