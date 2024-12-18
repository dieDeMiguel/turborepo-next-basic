# Shopr E-Commerce + Operations App Monorepo

This monorepo contains the **Shopr E-Commerce App** and **Operations App**, powered by **Turborepo**. These apps leverage modern web technologies such as **Next.js**, **Sanity**, **Stripe**, **Clerk**, and more, ensuring a seamless development and production experience.

![Sanity E-Commerce](apps/sanity-e-commerce/app/opengraph-image.jpg)

### Apps and Packages
- **sanity-e-commerce**: The main e-commerce application using **Sanity CMS**, **Stripe** for payments, and **Clerk** for authentication.
- **operations-app**: A supporting app for monitoring operations, fetching data via **Sanity**, and providing backend insights.
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Installation

Clone the Repository

```
git clone https://github.com/your-repo-name/monorepo.git
```

##Install Dependencies

We use pnpm for managing dependencies:

```
pnpm install
```

Setup Environment Variables
Copy the example environment variables:
```
cp apps/sanity-e-commerce/.env.example apps/sanity-e-commerce/.env.local
cp apps/operations-app/.env.example apps/operations-app/.env.local
```
Fill in the required environment variables in the .env.local files for each app.

Accounts Needed:
- **Sanity Account**: For CMS data.[(https://www.sanity.io/login)]
- **Stripe Account**: For payment processing.[(https://dashboard.stripe.com/login?redirect=/test/dashboard)]
- **Clerk Account**: For user authentication.[(https://clerk.com/)]
- **Email Provider-**: For nodemailer. Guide for Gmail Integration: ([https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required)]

You'll need the Stripe CLI [(https://docs.stripe.com/stripe-cli)]

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

##Run the Development Server

For sanity-e-commerce:

```
pnpm dev --filter sanity-e-commerce
```

For operations-app:

```
pnpm dev --filter operations-app
```

Listen to stripe events
Login into stripe using its CLI

```
stripe listen --forward-to localhost:XXXX/store/webhook
```

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```


### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

#### Sanity E-Commerce
- **Product Management**: Manage product data via **Sanity CMS**.
- **Feature Flags**: Integrated with **Vercel Toolbar** for real-time toggling of flags during experiments.
- **Stripe Integration**: Secure and flexible payment gateway.
- **Clerk Integration**: Authentication system for users.
- **Nodemailer Support**: Email functionality for notifications.
- **Dynamic Feature Flags**: Server-side experimentation with no layout jank.

#### Operations App
- **Sanity Insights**: View and manage operational data via **Sanity**.
- **Shared Environment**: Leverages shared configurations and packages for consistency.


License
This project is licensed under the MIT License.


