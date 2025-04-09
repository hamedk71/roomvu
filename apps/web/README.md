# RoomVu Web App

A Next.js application for the RoomVu platform.

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` with your API configuration:
   ```
   NEXT_PUBLIC_API_URL=https://fakestoreapi.com
   NEXT_PUBLIC_API_TIMEOUT=10000
   ```

## Development

Run the development server:

```bash
# From the web app directory
npm run dev
# or
yarn dev
# or
pnpm dev

# From the monorepo root
pnpm dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Build

```bash
# From the web app directory
npm run build
# or 
yarn build
# or
pnpm build

# From the monorepo root
pnpm build --filter=web
```

## Project Structure

```apps/web/
├── app/            # Next.js app router pages and layouts
├── components/     # React components
├── constants/      # Application constants
├── public/         # Static assets
├── services/       # API services and data fetching
│   ├── api/        # Base API configuration
│   └── products/   # Product-specific API services
├── styles/         # Global styles
└── .env.example    # Example environment variables
```

## Styling Conventions

- Each component should have its own `.module.scss` file
- Follow BEM methodology adapted for React components
- Use CSS modules for component-specific styling
- Maintain proper TypeScript typing for style-related props

## Code Standards

Follow these practices for development:

1. Use TypeScript for type safety
2. Create modular, reusable components
3. Follow the filename conventions: `kebab-case.tsx` for components
4. Use `.service.ts`, `.api.ts` naming for service files


