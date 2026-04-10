import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6">

      {/* LOGO */}
      <div className="mt-16 mb-6">
        <Image
          src="/medivisioneyecare.png"
          alt="Medivision Eye Care"
          width={120}
          height={120}
          className="mx-auto rounded-xl shadow-lg"
        />
      </div>

      {/* NEW HEADLINE */}
      <h1 className="text-3xl font-bold">
        Help us improve your care experience
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-400 mt-3">
        Takes less than 30 seconds
      </p>

      {/* CONTEXT LINE */}
      <p className="text-gray-500 mt-2 max-w-md">
        Your feedback helps our doctors and team serve you better
      </p>

      <div className="mt-10 flex flex-col gap-4 w-full max-w-sm">

        <Link href="/patient">
          <button className="glass w-full py-4 rounded-xl">
            Share Feedback
          </button>
        </Link>

        <Link href="/doctor">
          <button className="glass w-full py-4 rounded-xl">
            Doctor Insights
          </button>
        </Link>

      </div>
    </main>
  );
}