"use client";

import { useState } from "react";
import Link from "next/link";
import { doctorGroups } from "../../lib/doctors";

const STEPS = 5;

const SPECIALTY_META = {
  "General / Cataract":  { icon: "👁️",  short: "Cataract" },
  "Refractive / LASIK":  { icon: "🔬",  short: "LASIK" },
  "Retina":              { icon: "🫀",  short: "Retina" },
  "Glaucoma":            { icon: "🩺",  short: "Glaucoma" },
  "Paediatric":          { icon: "👶",  short: "Paediatric" },
  "Not sure":            { icon: "❓",  short: "Not sure" },
};

const MOODS = [
  { emoji: "😍", label: "Excellent",   score: 5, bg: "#ecfdf5", border: "#10b981", badge: "#10b981" },
  { emoji: "😊", label: "Good",        score: 4, bg: "#eff6ff", border: "#3b82f6", badge: "#3b82f6" },
  { emoji: "😐", label: "It was okay", score: 3, bg: "#fefce8", border: "#f59e0b", badge: "#f59e0b" },
  { emoji: "😕", label: "Needs work",  score: 2, bg: "#fff7ed", border: "#f97316", badge: "#f97316" },
];

/* ── Sub-components ─────────────────────────────────────── */

function Progress({ step }) {
  return (
    <div style={{ marginBottom: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: "500" }}>Step {step} of {STEPS}</span>
        <span style={{ fontSize: "0.72rem", color: "#1b4fbe", fontWeight: "700" }}>{Math.round((step / STEPS) * 100)}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${(step / STEPS) * 100}%` }} />
      </div>
    </div>
  );
}

function StarRow({ label, sublabel, value, onChange }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.88rem" }}>{label}</div>
        {sublabel && <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "1px" }}>{sublabel}</div>}
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            className={`star ${s <= active ? "lit" : ""}`}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(s)}
            aria-label={`${s} star${s > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function PatientPage() {
  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [animKey, setAnimKey]     = useState(0);

  const doctors = doctorGroups[form.specialty] || [];

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const goTo = (n) => {
    setAnimKey((k) => k + 1);
    setStep(n);
  };
  const next = () => goTo(step + 1);
  const back = () => goTo(step - 1);

  const canSubmit = form.overall_mood && form.specialty && form.doctor &&
                    form.clarity && form.care && form.process;

  const submit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "patient" }),
      });
    } catch (_) {}
    setSubmitted(true);
    setSubmitting(false);
  };

  /* ── Thank-you screen ──────────────────────────────────── */
  if (submitted) {
    return (
      <div className="anim-pop-in" style={{ maxWidth: "400px", margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
        <div style={{
          width: "88px",
          height: "88px",
          background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "2.8rem",
          boxShadow: "0 8px 30px rgba(16,185,129,0.22)",
        }}>
          🙏
        </div>

        <h1 style={{ fontSize: "1.9rem", fontWeight: "900", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Thank you!
        </h1>
        <p style={{ color: "#64748b", lineHeight: 1.65, marginBottom: "32px", fontSize: "0.95rem" }}>
          Your feedback has been received. It helps the team serve every patient better.
        </p>

        <div style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)",
          border: "1px solid #bfdbfe",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "28px",
        }}>
          <p style={{ fontSize: "0.85rem", color: "#1e40af", fontWeight: "600", marginBottom: "4px" }}>
            💙 MediVision Eye Care
          </p>
          <p style={{ fontSize: "0.8rem", color: "#3b82f6", fontStyle: "italic" }}>
            Making the World See
          </p>
        </div>

        <Link href="/" style={{ textDecoration: "none" }}>
          <button className="btn-ghost">← Back to Home</button>
        </Link>
      </div>
    );
  }

  /* ── Form layout wrapper ────────────────────────────────── */
  return (
    <div style={{ maxWidth: "420px", margin: "0 auto", padding: "22px 22px 40px" }}>

      {/* Top nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        {step > 1
          ? <button onClick={back} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "0.85rem", cursor: "pointer", padding: "4px 0", display: "flex", alignItems: "center", gap: "4px" }}>
              ← Back
            </button>
          : <Link href="/" style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none" }}>← Home</Link>
        }
        <span style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: "500" }}>Quick Feedback</span>
      </div>

      <Progress step={step} />

      {/* ── Step 1: Overall mood ──────────────────────────── */}
      {step === 1 && (
        <div key={`s1-${animKey}`} className="anim-fade-up" style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            How was your visit today?
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "28px" }}>
            Your honest answer helps us improve
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {MOODS.map(({ emoji, label, score, bg, border }) => (
              <button
                key={label}
                onClick={() => { update("overall_mood", label); update("overall_score", score); next(); }}
                style={{
                  background: form.overall_mood === label ? bg : "#f8faff",
                  border: `2px solid ${form.overall_mood === label ? border : "#e2e8f0"}`,
                  borderRadius: "16px",
                  padding: "22px 12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.18s ease",
                }}
              >
                <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>{emoji}</div>
                <div style={{ fontWeight: "700", color: "#374151", fontSize: "0.85rem" }}>{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Specialty ─────────────────────────────── */}
      {step === 2 && (
        <div key={`s2-${animKey}`} className="anim-slide-in" style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Which department?
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "24px" }}>
            Select your specialty
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
            {Object.keys(doctorGroups).map((s) => {
              const meta = SPECIALTY_META[s] || { icon: "🏥", short: s };
              return (
                <button
                  key={s}
                  onClick={() => { update("specialty", s); update("doctor", null); }}
                  className={`tile ${form.specialty === s ? "selected" : ""}`}
                  style={{ padding: "18px 12px", textAlign: "center", border: "2px solid" }}
                >
                  <div style={{ fontSize: "1.9rem", marginBottom: "7px" }}>{meta.icon}</div>
                  <div style={{ fontWeight: "600", color: "#374151", fontSize: "0.78rem", lineHeight: 1.3 }}>{s}</div>
                </button>
              );
            })}
          </div>

          {form.specialty && (
            <button className="btn-primary" onClick={next}>
              Continue →
            </button>
          )}
        </div>
      )}

      {/* ── Step 3: Doctor ───────────────────────────────── */}
      {step === 3 && (
        <div key={`s3-${animKey}`} className="anim-slide-in" style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "900", color: "#0f172a", marginBottom: "6px", letterSpacing: "-0.02em" }}>
            Who was your doctor?
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "24px" }}>
            {form.specialty} department
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {doctors.map((doc) => (
              <button
                key={doc}
                onClick={() => update("doctor", doc)}
                style={{
                  background: form.doctor === doc
                    ? "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)"
                    : "#f8faff",
                  border: `2px solid ${form.doctor === doc ? "#1b4fbe" : "#e2e8f0"}`,
                  borderRadius: "14px",
                  padding: "16px 18px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  transition: "all 0.18s ease",
                }}
              >
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: form.doctor === doc
                    ? "linear-gradient(135deg, #1b4fbe, #0ea5e9)"
                    : "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                  transition: "background 0.18s ease",
                }}>
                  {form.doctor === doc ? "✓" : "👨‍⚕️"}
                </div>
                <span style={{ fontWeight: "600", color: "#1e293b", fontSize: "0.9rem", lineHeight: 1.3 }}>{doc}</span>
              </button>
            ))}
          </div>

          {form.doctor && (
            <button className="btn-primary" onClick={next}>
              Continue →
            </button>
          )}
        </div>
      )}

      {/* ── Step 4: Star ratings ─────────────────────────── */}
      {step === 4 && (
        <div key={`s4-${animKey}`} className="anim-slide-in" style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "900", color: "#0f172a", marginBottom: "6px", letterSpacing: "-0.02em" }}>
            Rate your experience
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "24px" }}>
            With {form.doctor}
          </p>

          <div className="card" style={{ padding: "24px", marginBottom: "24px" }}>
            <StarRow
              label="Doctor's explanation & clarity"
              sublabel="Did you understand your diagnosis?"
              value={form.clarity || 0}
              onChange={(v) => update("clarity", v)}
            />
            <StarRow
              label="Quality of care & attention"
              sublabel="Did you feel heard and cared for?"
              value={form.care || 0}
              onChange={(v) => update("care", v)}
            />
            <StarRow
              label="Process & wait time"
              sublabel="Registration, reports, overall flow"
              value={form.process || 0}
              onChange={(v) => update("process", v)}
            />
          </div>

          {form.clarity && form.care && form.process && (
            <button className="btn-primary" onClick={next}>
              Almost done →
            </button>
          )}
        </div>
      )}

      {/* ── Step 5: Note + submit ─────────────────────────── */}
      {step === 5 && (
        <div key={`s5-${animKey}`} className="anim-slide-in" style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Anything to add?
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "20px" }}>
            Optional — every word helps
          </p>

          <textarea
            rows={4}
            placeholder="Share a specific suggestion, highlight something great, or tell us what could be better..."
            onChange={(e) => update("note", e.target.value)}
            value={form.note || ""}
            style={{ marginBottom: "16px" }}
          />

          {/* Summary */}
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "24px",
          }}>
            <p style={{ fontSize: "0.78rem", fontWeight: "700", color: "#166534", marginBottom: "10px" }}>
              Your feedback summary
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <SummaryRow icon="😊" label="Visit" value={form.overall_mood} />
              <SummaryRow icon="🏥" label="Dept" value={form.specialty} />
              <SummaryRow icon="👨‍⚕️" label="Doctor" value={form.doctor} />
              <SummaryRow icon="⭐" label="Ratings" value={`Clarity ${form.clarity}/5 · Care ${form.care}/5 · Process ${form.process}/5`} />
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={submit}
            disabled={submitting || !canSubmit}
          >
            {submitting ? "Submitting…" : "Submit Feedback ✓"}
          </button>
        </div>
      )}

    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: "8px", fontSize: "0.8rem", color: "#15803d", alignItems: "flex-start" }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span style={{ color: "#166534", fontWeight: "600", flexShrink: 0 }}>{label}:</span>
      <span style={{ color: "#15803d" }}>{value}</span>
    </div>
  );
}
