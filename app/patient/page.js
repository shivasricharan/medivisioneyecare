"use client";

import { useState } from "react";
import { doctorGroups } from "../../lib/doctors";

export default function PatientPage() {
  const [form, setForm] = useState({});
  const doctors = doctorGroups[form.specialty] || [];

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ ...form, type: "patient" })
    });

    alert("Thank you 🙏");
  };

  return (
    <main className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Quick Care Feedback
      </h1>

      {/* Specialty */}
      <div className="glass p-4 rounded-xl mb-4">
        <p>Specialty</p>
        <select onChange={(e) => update("specialty", e.target.value)}>
          <option>Select</option>
          {Object.keys(doctorGroups).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Doctor */}
      {form.specialty && (
        <div className="glass p-4 rounded-xl mb-4">
          <p>Doctor</p>
          <select onChange={(e) => update("doctor", e.target.value)}>
            <option>Select</option>
            {doctors.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      {/* Questions */}
      {["clarity", "care", "process"].map((q) => (
        <div key={q} className="glass p-4 rounded-xl mb-4">
          <p className="capitalize">{q}</p>
          <select onChange={(e) => update(q, e.target.value)}>
            <option>Select</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Needs Improvement</option>
          </select>
        </div>
      ))}

      <textarea
        placeholder="Any improvement?"
        onChange={(e) => update("note", e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full py-4 mt-4 rounded-xl bg-white text-black"
      >
        Submit
      </button>
    </main>
  );
}
