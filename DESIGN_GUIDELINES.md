# Design Guidelines - Moritz Wächter Color System

## Color Palette

### Eucalyptus Color Scale
The design uses a unified eucalyptus color scale from light to dark. All colors are derived from this single scale, ensuring consistency across the entire application.

**Base Color Scale:**
- `--color-50`: `#F0F4F3` - Lightest (near white)
- `--color-100`: `#D5E1DC` - Very light
- `--color-200`: `#BACEC6` - Light
- `--color-300`: `#A0BBB0` - Light-medium
- `--color-400`: `#85A899` - Medium-light
- `--color-500`: `#6A9583` - Medium
- `--color-600`: `#5F8575` - Medium-dark
- `--color-700`: `#445F54` - Dark
- `--color-800`: `#31453C` - Very dark
- `--color-900`: `#1E2A25` - Near black
- `--color-950`: `#0B0F0D` - Darkest (near black)

### Primary Color Mapping

**Light Mode:**
The primary color variables map to the eucalyptus scale for consistent theming:
- `--ifm-color-primary`: `var(--color-700)` - Main brand color
- `--ifm-color-primary-dark`: `var(--color-800)` - Darker variant
- `--ifm-color-primary-darker`: `var(--color-900)` - Even darker
- `--ifm-color-primary-darkest`: `var(--color-950)` - Darkest shade
- `--ifm-color-primary-light`: `var(--color-600)` - Lighter variant
- `--ifm-color-primary-lighter`: `var(--color-500)` - Even lighter
- `--ifm-color-primary-lightest`: `var(--color-400)` - Lightest shade

**Dark Mode:**
In dark mode, the mapping is inverted for better visibility:
- `--ifm-color-primary`: `var(--color-500)` - Lighter for contrast
- `--ifm-color-primary-dark`: `var(--color-600)`
- `--ifm-color-primary-darker`: `var(--color-700)`
- `--ifm-color-primary-darkest`: `var(--color-800)`
- `--ifm-color-primary-light`: `var(--color-400)`
- `--ifm-color-primary-lighter`: `var(--color-300)`
- `--ifm-color-primary-lightest`: `var(--color-200)`

### Semantic Colors

**Light Mode:**
- `--color-accent`: `var(--color-100)` - For subtle highlights and decorative elements
- `--color-secondary`: `var(--color-600)` - For supporting UI elements

**Dark Mode:**
- `--color-accent`: `var(--color-200)` - Adjusted for dark backgrounds
- `--color-secondary`: `var(--color-500)` - Lighter for visibility

## Gradients

### Background Gradient
A diagonal gradient creates visual depth across pages using the eucalyptus scale.

**Light Mode:**
```css
--background-gradient: linear-gradient(135deg, var(--color-600) 0%, var(--color-700) 100%);
```
Result: Medium-dark eucalyptus (#5F8575) → Dark eucalyptus (#445F54)

**Dark Mode:**
```css
--background-gradient: linear-gradient(135deg, var(--color-500) 0%, var(--color-700) 100%);
```
Result: Medium eucalyptus → Dark eucalyptus for better contrast

### Accent Gradient
A horizontal gradient used for decorative lines and highlights.

**Light Mode:**
```css
--accent-gradient: linear-gradient(to right, var(--color-600) 0%, var(--color-700) 100%);
```

**Dark Mode:**
```css
--accent-gradient: linear-gradient(to right, var(--color-500) 0%, var(--color-700) 100%);
```

**Usage:**
- Decorative underlines on headings
- Dividers and separators
- Progress bars or indicators
- Any subtle decorative accent that needs visual interest

### Button Gradient
Buttons use a subtle gradient for depth.

```css
background: linear-gradient(to right, var(--color-700), var(--color-800));
```
Result: Dark eucalyptus (#445F54) → Very dark eucalyptus (#31453C)

## Usage Guidelines

### 1. Buttons (Centralized in `src/css/buttons.css`)
All buttons use the centralized `.standardButton` or `.standardButtonLink` classes:

```css
/* For <button> elements */
.standardButton {
  background: linear-gradient(to right, var(--color-700), var(--color-800));
  color: white;
  border-radius: 9999px; /* Pill shape */
  /* No hover color changes - minimal effects */
}

/* For <a> elements */
.standardButtonLink {
  background: linear-gradient(to right, var(--color-700), var(--color-800));
  color: white;
  border-radius: 9999px;
}
```

**Import in pages:**
Buttons are globally available via `@import './buttons.css';` in `src/css/custom.css`

**Usage in CSS modules:**
```css
.myButton {
  composes: standardButton from global;
  /* Add any page-specific overrides */
}
```

**Design principles:**
- Minimal hover effects (no color changes)
- Consistent gradient across all buttons
- No scaling or transform effects
- Pill-shaped with `border-radius: 9999px`

### 2. Text on Backgrounds
- **Hero sections with dark gradients**: Use white text for maximum contrast
- **Content cards**: Use white/light backgrounds with dark text
- **Gradient backgrounds**: Always white text

### 3. Badges and Tags
- **Background**: Use `var(--color-accent)` (color-100)
- **Text**: Use darker eucalyptus like `var(--color-secondary-darker)` or `var(--color-800)`
- Creates subtle, cohesive look

### 4. Icons
- **Icon color**: Use primary color `var(--ifm-color-primary)`
- **Icon backgrounds**:
  - Circular containers: `border-radius: 50%`
  - Background: `var(--color-secondary-lighter)` or light tones
  - Add shadow for depth

### 5. Decorative Elements
- **Underlines and accents**: Use `var(--accent-gradient)`
- **Dividers**: Use accent gradient or solid colors from scale
- **Section backgrounds**: White cards with shadow on gradient backgrounds

### 6. Form Elements
- **Focus states**: Use `var(--ifm-color-primary)`
- **Input borders**: Gray in normal state, primary color on focus
- **Submit buttons**: Use `.standardButton` class

### 7. Content Cards
- **Background**: White (light mode) / `rgb(31, 41, 55)` (dark mode)
- **Border-radius**: `1.5rem` for rounded corners
- **Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` for depth
- **Padding**: `2rem` to `3rem` depending on content

### 8. Hero Sections
- **Background**: Dark gradient using `linear-gradient(135deg, var(--color-950), var(--color-900))`
- **Text**: White for contrast
- **Example** (index page): Near-black to very dark eucalyptus gradient

## Color Selection Guidelines

**When choosing colors from the scale:**
1. **Backgrounds**: Use 50-200 for light backgrounds, 800-950 for dark
2. **Text on light backgrounds**: Use 700-950
3. **Text on dark backgrounds**: Use 50-300
4. **Borders and dividers**: Use 200-400 for subtle, 600-800 for prominent
5. **Interactive elements**: Use 600-800 range

**Prefer variables over hardcoded colors:**
- ✅ `background: var(--color-700)`
- ✅ `background: var(--ifm-color-primary)`
- ❌ `background: #445F54`

## Accessibility Notes

- All color combinations meet WCAG AA contrast requirements
- Text on dark gradient backgrounds uses white for maximum readability
- Form focus states use clear, visible primary color borders
- Dark mode uses lighter variants (inverted scale) for better visibility
- Buttons maintain sufficient contrast without hover effects

## Implementation

### Color System Location
All colors are defined in `src/css/custom.css`:
- Base eucalyptus scale (--color-50 through --color-950)
- Primary color mappings using `var()` references
- Semantic color names
- Gradient definitions

### Button System Location
All button styles are centralized in `src/css/buttons.css`:
- `.standardButton` for button elements
- `.standardButtonLink` for anchor elements
- `.buttonIcon` for icon styling

### Importing
The button system is automatically imported in `custom.css`:
```css
@import './buttons.css';
```

### Usage in Components
Reference colors using CSS variables:
```css
.myElement {
  background: var(--color-700);
  color: white;
}

.myButton {
  composes: standardButton from global;
}
```

### Benefits of Variable-Based System
1. **Single source of truth**: Change one value, update everywhere
2. **Automatic dark mode**: Variables remap in `[data-theme='dark']`
3. **Consistency**: All colors come from the same scale
4. **Maintainability**: Easy to adjust entire color scheme
5. **Type safety**: Named colors are self-documenting

## Migration Notes

The color system was migrated from phtalo green to eucalyptus scale to:
- Simplify the color palette
- Remove hardcoded hex values
- Create a cohesive, variable-based system
- Ensure all colors work harmoniously together
- Make future updates easier to manage

All primary color references now map to the eucalyptus scale, maintaining backward compatibility with Docusaurus's `--ifm-color-primary` variables while providing a cleaner, more maintainable foundation.
