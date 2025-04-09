# Styles Package

This package contains shared SCSS styles, variables, and utilities for RoomVu applications.

## Usage

### Importing Styles

```scss
// Import all styles
@import "@repo/styles";

// Import specific modules
@import "@repo/styles/variables";
@import "@repo/styles/breakpoints";
@import "@repo/styles/container";
```

## Available Modules

### Variables

Common variables for colors, spacing, typography, etc.

```scss
@import "@repo/styles/variables";

.my-element {
  color: var(--color-primary);
  font-size: var(--font-size-md);
  margin: var(--spacing-md);
}
```

### Breakpoints

Media query breakpoints for responsive design.

```scss
@import "@repo/styles/breakpoints";

.my-element {
  width: 100%;
  
  @include media-breakpoint-up(md) {
    width: 50%;
  }
  
  @include media-breakpoint-up(lg) {
    width: 33%;
  }
}
```

### Container

Container classes for layout management.

```scss
@import "@repo/styles/container";

// Use in your component
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">Content</div>
  </div>
</div>
```

## Development

### Adding New Styles

1. Create new SCSS modules in the `src` directory
2. Export them in the package.json exports field
3. Update the main `index.scss` file if they should be included in the default import

### Conventions

- Use CSS variables for all design tokens
- Follow BEM methodology for class naming
- Provide mixins for common patterns
- Document usage with examples 