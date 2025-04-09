# RoomVu Monorepo

A Turborepo monorepo with Next.js applications and shared packages.

## Setup

### Prerequisites

- Node.js v22 (preferred) or v20 (LTS versions only)
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Configuration

1. In each application directory, copy the example environment file:
```bash
cp apps/web/.env.example apps/web/.env.local
```

2. Update each `.env.local` file with the appropriate API URLs:
```
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_API_TIMEOUT=10000
```

## Development

To run all applications and packages in development mode:

```bash
pnpm dev
```

To run a specific app:

```bash
pnpm dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000) to view the web application.

## Build

To build all applications and packages:

```bash
pnpm build
```

To build a specific app:

```bash
pnpm build --filter=web
```

## Code Conventions

### Branch Naming

Branches should follow this pattern:
`type/description-in-kebab-case`

**Types:**
* `feature`: New functionality
* `bugfix`: Bug fixes
* `hotfix`: Critical fixes for production
* `docs`: Documentation updates
* `refactor`: Code improvements

**Examples:**
* `feature/user-authentication`
* `bugfix/login-validation`
* `docs/api-documentation`

### Commit Messages

All commit messages must follow this format: `type(scope): description`

**Types:**
* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `style`: Changes that don't affect code (formatting, etc.)
* `refactor`: Code change that neither fixes a bug nor adds a feature
* `test`: Adding missing tests
* `chore`: Changes to build process or auxiliary tools

**Examples:**
* `feat(auth): add login form validation`
* `fix(api): handle timeout errors properly`
* `docs(readme): update installation steps`

### Component Styling

Each React component must:
- Have its own dedicated `.module.scss` file
- Follow BEM methodology adapted for React components
- Maintain proper TypeScript typing for all style-related props
- Use scoped and modular styling approaches

### Filename Conventions

Name files with `kebab-case`. e.g. `accordion.tsx`, `my-control.tsx`, and `users-service.entity.ts`.

One or more `.` can be used to separate the name of the class or type from the logical type of the entity or the action/responsibility when multiple files of the same name exist in a directory.
For example `user.service.ts`, `user.repository.ts`, and `user.dto.ts`.
