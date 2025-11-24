# @repo/ui - Shared UI Component Library

A centralized, type-safe UI component library powered by **shadcn/ui** for the Turborepo Next.js monorepo.

## 🎯 Overview

This package provides:
- ✅ **shadcn/ui components** - Pre-built, accessible components based on Radix UI
- ✅ **Centralized styling** - Single source of truth for design system
- ✅ **Type-safe imports** - Full TypeScript support
- ✅ **Zero duplication** - Components shared across all apps
- ✅ **Easy maintenance** - Update once, applies everywhere

## 📦 Structure

```
packages/ui/
├── components.json        # shadcn/ui configuration
├── src/
│   ├── components/
│   │   └── ui/           # shadcn components (button, dialog, etc.)
│   ├── lib/
│   │   └── utils.ts      # cn() utility for class merging
│   └── styles.css        # Global styles
├── tailwind.config.ts    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## 🚀 Usage

### In Your App

**Import shadcn components:**
```tsx
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
```

**Import utilities:**
```tsx
import { cn } from '@repo/ui/lib/utils';
```

**Import styles (in your app's global CSS):**
```tsx
import '@repo/ui/styles';
```

### Example

```tsx
'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@repo/ui/components/ui/dialog';

export default function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Hello World</DialogTitle>
        <p>This is a shared component from @repo/ui!</p>
      </DialogContent>
    </Dialog>
  );
}
```

## 📚 Available Components

### UI Components (shadcn)
- **Button** - `@repo/ui/components/ui/button`
- **Dialog** - `@repo/ui/components/ui/dialog`
- **Popover** - `@repo/ui/components/ui/popover`
- **Skeleton** - `@repo/ui/components/ui/skeleton`

### Custom Components
- **Alert** - `@repo/ui/alert`
- **Card** - `@repo/ui/card`
- **Input Field** - `@repo/ui/input-field`

### Utilities
- **cn()** - `@repo/ui/lib/utils` - Tailwind class merging utility

## ➕ Adding New Components

### Using shadcn CLI

1. Navigate to the packages/ui directory:
```bash
cd packages/ui
```

2. Add a new component:
```bash
pnpx shadcn@latest add <component-name>
```

Example:
```bash
pnpx shadcn@latest add card
pnpx shadcn@latest add dropdown-menu
pnpx shadcn@latest add toast
```

3. Update `package.json` exports:
```json
{
  "exports": {
    "./components/ui/card": "./src/components/ui/card.tsx"
  }
}
```

4. Install dependencies if needed:
```bash
pnpm install
```

5. Import in your app:
```tsx
import { Card } from '@repo/ui/components/ui/card';
```

### Manual Component Creation

For custom components (non-shadcn):

1. Create file in `packages/ui/src/`:
```tsx
// packages/ui/src/my-component.tsx
'use client';

import { cn } from './lib/utils';

export const MyComponent = ({ className, ...props }) => {
  return <div className={cn('my-styles', className)} {...props} />;
};
```

2. Add export to `package.json`:
```json
{
  "exports": {
    "./my-component": "./src/my-component.tsx"
  }
}
```

3. Import in your app:
```tsx
import { MyComponent } from '@repo/ui/my-component';
```

## 🎨 Styling

### Tailwind Configuration

The package includes a Tailwind config that:
- Scans all components in `src/**/*.{ts,tsx}`
- Extends the base Tailwind theme
- Works seamlessly with app-level Tailwind configs

### Using `cn()` Utility

The `cn()` utility merges Tailwind classes intelligently:

```tsx
import { cn } from '@repo/ui/lib/utils';

<Button className={cn('bg-blue-500', 'hover:bg-blue-600', className)} />
```

## 🔧 Configuration

### components.json

This file configures shadcn/ui for the package:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components/ui"
  }
}
```

## 📖 Best Practices

### ✅ DO:
- Use `@repo/ui/components/ui/*` for shadcn components
- Use `cn()` for conditional class names
- Keep components generic and reusable
- Update dependencies when adding new components
- Test components in isolation

### ❌ DON'T:
- Copy components directly into apps (use the shared package)
- Modify shadcn components without documenting changes
- Add app-specific logic to shared components
- Import from relative paths (use package exports)

## 🔄 Migration from App-Level Components

If you have existing components in your apps:

1. **Move to shared package:**
```bash
mv apps/my-app/components/ui/button.tsx packages/ui/src/components/ui/
```

2. **Update imports:**
```tsx
// Before
import { Button } from '@/components/ui/button';

// After
import { Button } from '@repo/ui/components/ui/button';
```

3. **Update internal imports:**
```tsx
// In the component file
// Before
import { cn } from '@/lib/utils';

// After
import { cn } from '../../lib/utils';
```

4. **Remove duplicates:**
```bash
rm -rf apps/my-app/components/ui/button.tsx
```

## 🛠️ Development

### Type Checking
```bash
pnpm run check-types
```

### Linting
```bash
pnpm run lint
```

## 📦 Dependencies

- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Component variants
- **clsx** - Conditional class names
- **tailwind-merge** - Intelligent Tailwind class merging
- **lucide-react** - Icon library

## 🤝 Contributing

When adding new components:

1. Ensure they follow the shadcn/ui conventions
2. Add proper TypeScript types
3. Document the component in this README
4. Test in at least one app
5. Update package.json exports
6. Run type checking and linting

## 📝 Notes

- This package uses React 19 and Next.js 16
- All components are optimized for Server Components by default
- Client components are marked with `'use client'` directive
- The package supports both static and dynamic rendering

## 🔗 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Turborepo Documentation](https://turbo.build/repo/docs)

