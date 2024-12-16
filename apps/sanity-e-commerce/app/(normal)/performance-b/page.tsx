import Image from 'next/image';

export default function PerformanceB() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100 p-8">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">Welcome to Performance B 🌟</h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-700">
        This is Variant B of our experiment. Delivered instantly with
        <strong className="font-semibold"> Edge Middleware</strong>, showcasing the power of static rendering and edge
        re-writes.
      </p>
      <Image
        src="https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/functions/edge-middleware-dark.png"
        alt="Performance B"
        width={600}
        height={300}
        className="rounded-lg shadow-md"
        priority
      />
      <p className="mt-4 text-sm text-gray-500">
        Experience a seamless user journey with zero latency using cutting-edge technology.
      </p>
    </div>
  );
}
