import Image from 'next/image';

export default function PerformanceC() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="mb-4 text-4xl font-bold text-gray-700">Welcome to Performance C ⚡</h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-600">
        This is a control page with no experiments applied. Delivered directly without middleware handling to
        demonstrate zero latency.
      </p>
      <Image
        src="https://assets.vercel.com/image/upload/v1724702247/front/docs/edge-network/dark-pops.png"
        alt="Performance C Page"
        width={600}
        height={300}
        className="rounded-lg shadow-md"
        priority
      />
      <p className="mt-4 text-sm text-gray-500">
        Compare metrics in Vercel&apos;s Speed Insights to see the difference.
      </p>
    </div>
  );
}
