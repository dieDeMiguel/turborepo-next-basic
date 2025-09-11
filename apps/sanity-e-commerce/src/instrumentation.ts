import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({
    serviceName: 'sanity-e-commerce-app',
    instrumentationConfig: {
      fetch: {
        // Track all fetch requests
        enabled: true,
        requestHook: (span, request) => {
          span.setAttributes({
            'http.url': request.url,
            'http.method': request.method,
          });
        },
      },
      // Enable automatic instrumentation for various frameworks
      frameworks: {
        nextjs: true,
        react: true,
      },
    },
  });
}
