import Link from "next/link";

const DOCTORS = [
  {
    name: "Dr. K. Rupak Kumar Reddy",
    dept: "Refractive / LASIK",
    clarity: 4.9,
    care: 4.8,
    process: 4.7,
    responses: 42,
    mood: { Excellent: 36, Good: 5, "It was okay": 1, "Needs work": 0 },
    badge: "Top Rated",
    badgeBg: "#ecfdf5",
    badgeColor: "#10b981",
  },
  {
    name: "Dr. K. Ravi Kumar Reddy",
    dept: "General / Cataract",
    clarity: 4.7,
    care: 4.8,
    process: 4.5,
    responses: 38,
    mood: { Excellent: 28, Good: 8, "It was okay": 2, "Needs work": 0 },
    badge: "Excellent",
    badgeBg: "#eff6ff",
    badgeColor: "#3b82f6",
  },
  {
    name: "Dr. A. Vani Reddy",
    dept: "General / Cataract",
    clarity: 4.6,
    care: 4.7,
    process: 4.4,
    responses: 29,
    mood: { Excellent: 22, Good: 5, "It was okay": 2, "Needs work": 0 },
    badge: "Excellent",
    badgeBg: "#eff6ff",
    badgeColor: "#3b82f6",
  },
  {
    name: "Dr. Saif Uddin Adeel",
    dept: "Retina",
    clarity: 4.5,
    care: 4.6,
    process: 4.3,
    responses: 21,
    mood: { Excellent: 14, Good: 5, "It was okay": 2, "Needs work": 0 },
    badge: "Good",
    badgeBg: "#fefce8",
    badgeColor: "#d97706",
  },
  {
    name: "Dr. Meena Thotakura",
    dept: "Glaucoma",
    clarity: 4.4,
    care: 4.5,
    process: 4.2,
    responses: 15,
    mood: { Excellent: 9, Good: 4, "It was okay": 2, "Needs work": 0 },
    badge: "Good",
    badgeBg: "#fefce8",
    badgeColor: "#d97706",
  },
  {
    name: "Dr. Prem Prakash Reddy",
    dept: "General / Cataract",
    clarity: 4.3,
    care: 4.4,
    process: 4.1,
    responses: 18,
    mood: { Excellent: 10, Good: 6, "It was okay": 2, "Needs work": 0 },
    badge: "Good",
    badgeBg: "#fefce8",
    badgeColor: "#d97706",
  },
];

function avg(key) {
  return (DOCTORS.reduce((s, d) => s + d[key], 0) / DOCTORS.length).toFixed(1);
}

function ScoreBar({ value, max = 5 }) {
  const pct = (value / max) * 100;
  return (
    <div className="score-track">
      <div
        className="score-fill"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function MiniStars({ value }) {
  const full = Math.round(value);
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.8rem", letterSpacing: "-1px" }}>
      {"★".repeat(full)}
      <span style={{ color: "#d1d5db" }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function DoctorPage() {
  const totalResponses = DOCTORS.reduce((s, d) => s + d.responses, 0);

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "22px 20px 40px" }}>

      <Link href="/" style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
        ← Home
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Doctor Insights
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
              Aggregated patient feedback · Live preview
            </p>
          </div>
          <span style={{
            background: "#ecfdf5",
            border: "1px solid #bbf7d0",
            borderRadius: "9999px",
            padding: "5px 12px",
            fontSize: "0.7rem",
            fontWeight: "700",
            color: "#10b981",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            ● Live
          </span>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        {[
          { n: totalResponses, label: "Reviews" },
          { n: `${avg("clarity")}★`, label: "Avg Clarity" },
          { n: `${avg("care")}★`, label: "Avg Care" },
        ].map(({ n, label }) => (
          <div key={label} style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)",
            border: "1px solid #bfdbfe",
            borderRadius: "14px",
            padding: "16px 10px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "1.25rem", fontWeight: "900", color: "#1b4fbe" }}>{n}</div>
            <div style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "2px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Overall satisfaction bar */}
      <div style={{
        background: "#f8faff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "24px",
      }}>
        <p style={{ fontWeight: "700", color: "#374151", fontSize: "0.85rem", marginBottom: "14px" }}>
          Patient Satisfaction Breakdown
        </p>
        {[
          { label: "Excellent 😍", color: "#10b981", pct: 72 },
          { label: "Good 😊",      color: "#3b82f6", pct: 21 },
          { label: "Okay 😐",      color: "#f59e0b", pct: 6  },
          { label: "Needs work 😕", color: "#ef4444", pct: 1  },
        ].map(({ label, color, pct }) => (
          <div key={label} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{label}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: "700", color }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: "7px", background: "#e9ecef", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "9999px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Doctor cards */}
      <p style={{ fontSize: "0.72rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
        By Doctor
      </p>

      {DOCTORS.map((doc, i) => (
        <div key={doc.name} style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          {/* Card header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.92rem", marginBottom: "3px" }}>{doc.name}</div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                {doc.dept} · {doc.responses} reviews
              </div>
              <div style={{ marginTop: "4px" }}>
                <MiniStars value={(doc.clarity + doc.care + doc.process) / 3} />
                <span style={{ fontSize: "0.72rem", color: "#64748b", marginLeft: "5px" }}>
                  {((doc.clarity + doc.care + doc.process) / 3).toFixed(1)}/5
                </span>
              </div>
            </div>
            <span style={{
              background: doc.badgeBg,
              color: doc.badgeColor,
              border: `1px solid ${doc.badgeColor}50`,
              borderRadius: "9999px",
              padding: "3px 10px",
              fontSize: "0.68rem",
              fontWeight: "800",
              flexShrink: 0,
            }}>
              {doc.badge}
            </span>
          </div>

          {/* Score bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Clarity", val: doc.clarity },
              { label: "Care",    val: doc.care },
              { label: "Process", val: doc.process },
            ].map(({ label, val }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "0.74rem", color: "#64748b" }}>{label}</span>
                  <span style={{ fontSize: "0.74rem", fontWeight: "700", color: "#1b4fbe" }}>{val}/5</span>
                </div>
                <ScoreBar value={val} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Vouch CTA */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1b4fbe 50%, #0ea5e9 100%)",
        borderRadius: "20px",
        padding: "28px 24px",
        textAlign: "center",
        marginTop: "8px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
          Powered by
        </p>
        <p style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.02em" }}>
          Vouch
        </p>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: "18px" }}>
          Real-time patient intelligence for care teams.
          <br />
          No sign-in friction. Beautiful insights.
        </p>
        <div style={{
          background: "rgba(255,255,255,0.15)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "12px",
          padding: "12px 20px",
          display: "inline-block",
          color: "#fff",
          fontSize: "0.82rem",
          fontWeight: "700",
          cursor: "pointer",
        }}>
          Start a pilot with Vouch →
        </div>
      </div>

    </div>
  );
}
