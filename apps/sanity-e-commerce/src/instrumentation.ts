import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({
    serviceName: 'sanity-e-commerce-app',
  });
}
