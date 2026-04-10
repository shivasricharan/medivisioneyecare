import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-4xl font-bold mt-20">
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