import Image from 'next/image';

export default function PerformanceA() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-100 p-8">
      <h1 className="mb-4 text-4xl font-bold text-green-600">Welcome to Performance A 🚀</h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-700">
        This is Variant A of our experiment. Delivered seamlessly with
        <strong className="font-semibold"> Edge Middleware</strong> at blazing speed, ensuring no latency.
      </p>
      <Image
        src="https://assets.vercel.com/image/upload/v1730448888/front/docs/feature-flags/Light_PNG-1.avif?lightbox"
        alt="Performance A"
        width={600}
        height={300}
        className="rounded-lg shadow-md"
        priority
      />
      <p className="mt-4 text-sm text-gray-500">
        Experience the power of Next.js, Edge Middleware, and TailwindCSS in action.
      </p>
    </div>
  );
}
