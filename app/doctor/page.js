export default function DoctorPage() {
  return (
    <main className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Doctor Insights (Sample)
      </h1>

      <div className="glass p-4 rounded-xl mb-4">
        <p className="font-semibold">Dr Rupak Kumar Reddy</p>
        <p>Clarity: 95%</p>
        <p>Care: 96%</p>
        <p className="text-green-400">Excellent</p>
      </div>

      <div className="glass p-4 rounded-xl">
        <p className="font-semibold">Other Doctors</p>
        <p>Clarity: 72%</p>
        <p>Care: 75%</p>
        <p className="text-yellow-400">Needs Attention</p>
      </div>

    </main>
  );
}
