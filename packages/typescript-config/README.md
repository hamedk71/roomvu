# TypeScript Configuration

Shared TypeScript configurations for the RoomVu monorepo.

## Usage

In your `tsconfig.json` file, extend the appropriate configuration:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Available Configurations

### Base Configuration

The base TypeScript configuration that all other configurations extend:

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

### Next.js Configuration

Specific configuration for Next.js applications:

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

### React Library Configuration

Configuration for React component libraries:

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

## Configuration Details

The configurations include settings for:

- Module resolution
- Target ECMAScript version
- Strict type checking
- JSX handling
- Source maps
- And other TypeScript compiler options

## Development

When updating these configurations, ensure all projects in the monorepo continue to compile successfully. 