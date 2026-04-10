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
          className="mx-auto"
        />
      </div>

      <h1 className="text-3xl font-bold">
        Medivision Care Intelligence
      </h1>

      <p className="text-gray-400 mt-4 max-w-md">
        Understand patient experience instantly and improve care across every visit.
      </p>

      <div className="mt-10 flex flex-col gap-4 w-full max-w-sm">

        <Link href="/patient">
          <button className="glass w-full py-4 rounded-xl">
            Patient Feedback
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