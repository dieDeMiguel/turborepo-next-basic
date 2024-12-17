export default function PerformanceC() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="mb-4 text-4xl font-bold text-gray-700">Welcome to Performance C ⚡</h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-600">
        This is a control page with no experiments applied. Delivered directly without middleware handling to
        demonstrate zero latency.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Compare metrics in Vercel&apos;s Speed Insights to see the difference.
      </p>
    </div>
  );
}
