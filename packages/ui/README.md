# UI Component Library

This package contains reusable React components for the RoomVu applications.

## Usage

```tsx
import { Button } from "@repo/ui";

export default function MyComponent() {
  return <Button>Click Me</Button>;
}
```

## Available Components

Import components from the package:

```tsx
import { 
  Button,
  Card,
  // other components...
} from "@repo/ui";
```

## Development

### Adding New Components

1. Create a new component file in the appropriate directory:

```tsx
// src/components/my-component/my-component.tsx
import React from 'react';
import styles from './my-component.module.scss';

export interface MyComponentProps {
  // Define props here
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (
    <div className={styles.root}>
      {/* Component implementation */}
    </div>
  );
}
```

2. Create a styling file:

```scss
// src/components/MyComponent/my-component.module.scss
.root {
  // Component styles
}
```

3. Export the component from the index file:

```tsx
// src/index.ts
export * from './components/MyComponent/my-component';
```

### Styling Conventions

- Each component should have its own `.module.scss` file
- Follow BEM methodology adapted for React components
- Maintain proper TypeScript typing for style-related props

