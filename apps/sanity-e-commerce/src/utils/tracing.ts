import { trace, context, SpanOptions, Span } from '@opentelemetry/api';

const tracer = trace.getTracer('sanity-e-commerce', '1.0.0');

/**
 * Creates a span and executes a function within its context
 * @param name - Name of the span
 * @param fn - Function to execute within the span
 * @param options - Optional span options
 * @returns Promise with the result of the function
 */
export async function withSpan<T>(
  name: string,
  fn: (span: Span) => Promise<T> | T,
  options?: SpanOptions
): Promise<T> {
  return tracer.startActiveSpan(name, options || {}, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: 1 }); // OK status
      return result;
    } catch (error) {
      span.setStatus({ 
        code: 2, // ERROR status
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
      span.recordException(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Adds attributes to the current active span
 * @param attributes - Object with key-value pairs to add as attributes
 */
export function addSpanAttributes(attributes: Record<string, string | number | boolean>): void {
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttributes(attributes);
  }
}

/**
 * Records an event in the current active span
 * @param name - Name of the event
 * @param attributes - Optional attributes for the event
 */
export function addSpanEvent(name: string, attributes?: Record<string, string | number | boolean>): void {
  const span = trace.getActiveSpan();
  if (span) {
    span.addEvent(name, attributes);
  }
}

/**
 * Creates a manual span for synchronous operations
 * @param name - Name of the span
 * @param fn - Synchronous function to execute
 * @param options - Optional span options
 * @returns Result of the function
 */
export function withSyncSpan<T>(
  name: string,
  fn: (span: Span) => T,
  options?: SpanOptions
): T {
  return tracer.startActiveSpan(name, options || {}, (span) => {
    try {
      const result = fn(span);
      span.setStatus({ code: 1 }); // OK status
      return result;
    } catch (error) {
      span.setStatus({ 
        code: 2, // ERROR status
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
      span.recordException(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Gets the current trace ID for correlation
 * @returns Current trace ID or undefined if no active span
 */
export function getCurrentTraceId(): string | undefined {
  const span = trace.getActiveSpan();
  if (span) {
    const spanContext = span.spanContext();
    return spanContext.traceId;
  }
  return undefined;
}

/**
 * Gets the current span ID for correlation
 * @returns Current span ID or undefined if no active span
 */
export function getCurrentSpanId(): string | undefined {
  const span = trace.getActiveSpan();
  if (span) {
    const spanContext = span.spanContext();
    return spanContext.spanId;
  }
  return undefined;
}
