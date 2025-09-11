# OpenTelemetry Tracing Setup Guide

## Environment Variables Configuration

Add these environment variables to your `.env.local` file or Vercel dashboard:

```bash
# OpenTelemetry Configuration
OTEL_SERVICE_NAME=sanity-e-commerce-app
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
OTEL_EXPORTER_OTLP_HEADERS=x-honeycomb-team=your-honeycomb-api-key

# For local development (optional)
OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp
OTEL_LOGS_EXPORTER=otlp
```

## Vercel Configuration

### Option 1: Honeycomb (Recommended)
1. Sign up for a free Honeycomb account at https://www.honeycomb.io/
2. Get your API key from the Honeycomb dashboard
3. Add the environment variables to your Vercel project

### Option 2: Other OpenTelemetry-compatible services
- **Lightstep**: Use `https://ingest.lightstep.com:443` as endpoint
- **Jaeger**: Use your Jaeger collector endpoint
- **DataDog**: Use DataDog's OTLP endpoint

## Vercel Dashboard Setup

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add the following variables:
   - `OTEL_SERVICE_NAME`: `sanity-e-commerce-app`
   - `OTEL_EXPORTER_OTLP_ENDPOINT`: Your chosen provider's endpoint
   - `OTEL_EXPORTER_OTLP_HEADERS`: Your authentication headers

## Testing the Setup

1. Deploy to Vercel or run locally with `pnpm dev`
2. Visit your application and interact with different pages
3. Check your tracing provider dashboard for incoming traces

## What's Being Traced

- **Middleware**: Geolocation, A/B testing, route protection
- **API Routes**: Flags discovery, geolocation API
- **Fetch Requests**: Automatic instrumentation
- **Custom Operations**: Using `withSpan()` utility

## Troubleshooting

If traces aren't appearing:
1. Check environment variables are set correctly
2. Verify the OTLP endpoint is reachable
3. Check Vercel function logs for errors
4. Ensure the instrumentation hook is enabled in `next.config.ts`
