import Link from "next/link";

export default function DoctorPage() {
  return (
    <main className="p-6 max-w-md mx-auto">

      {/* HOME LINK */}
      <Link href="/" className="text-sm text-gray-400 mb-4 inline-block">
        ← Home
      </Link>

      <h1 className="text-2xl font-semibold mb-2">
        Doctor Insights
      </h1>

      <p className="text-gray-400 mb-6">
        Sample insights based on patient feedback
      </p>

      {/* Doctor Card 1 */}
      <div className="glass p-4 rounded-xl mb-4">
        <p className="font-semibold">Dr Rupak Kumar Reddy</p>
        <p className="text-sm text-gray-400 mt-1">
          Clarity: 95% • Care: 96%
        </p>
        <p className="mt-2 text-green-400">Excellent</p>
      </div>

      {/* Doctor Card 2 */}
      <div className="glass p-4 rounded-xl">
        <p className="font-semibold">Other Doctors</p>
        <p className="text-sm text-gray-400 mt-1">
          Clarity: 72% • Care: 75%
        </p>
        <p className="mt-2 text-yellow-400">Needs Attention</p>
      </div>

    </main>
  );
}