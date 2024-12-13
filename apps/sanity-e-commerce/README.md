## Tech Stack

This project uses the following technologies:

- [Next.js](https://nextjs.org)
- [Sanity](https://www.sanity.io/)
- [Clerk](https://clerk.dev/)
- [Strapi](https://strapi.io/)

## Features

- **Dynamic Imports**: Uses Next.js dynamic imports to load components asynchronously, improving performance. For example, the `BasketPage` is loaded dynamically in [page.tsx](app/\(store\)/product/%5Bslug%5D/page.tsx).
- **Image Handling**: Utilizes Sanity's image URL builder to handle images efficiently. See `urlFor` for more details.
- **State Management**: Manages the basket state using Zustand. Check out the `useBasketStore` hook.
- **Custom Components**: Includes custom components like `AddToBasketButton`, `CategorySelectorComponent`, and `BlackFridayBanner`.
- **Loading Indicators**: Displays a loading spinner using the `Loader` component.
- **Sanity Integration**: Fetches and displays data from Sanity, including products and categories. See `getAllProducts` and `getAllCategories`.
- **Middleware**: Uses Clerk middleware for authentication. See [middleware.ts](middleware.ts).
- **Responsive Design**: Implements responsive design using Tailwind CSS. Check out the configuration in [tailwind.config.ts](tailwind.config.ts).
- **Environment Configuration**: Manages environment variables using a custom utility in [env.ts](sanity/env.ts).
- **Custom Hooks**: Includes custom hooks for various functionalities, such as fetching active sales by coupon code in `getActiveSaleByCouponCode`.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the development server with `npm run dev`.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.
- `typegen`: Generates TypeScript types from Sanity schemas.