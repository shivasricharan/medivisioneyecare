import Link from "next/link";

/* ── Sample data (populates automatically from Google Sheets in live mode) ── */
const DOCTORS = [
  { name: "Dr. K. Rupak Kumar Reddy", dept: "Refractive / LASIK",   clarity: 4.9, care: 4.8, process: 4.7, reviews: 42, excellent: 36, good: 5, okay: 1, needs: 0 },
  { name: "Dr. K. Ravi Kumar Reddy",  dept: "General / Cataract",   clarity: 4.7, care: 4.8, process: 4.5, reviews: 38, excellent: 28, good: 8, okay: 2, needs: 0 },
  { name: "Dr. A. Vani Reddy",        dept: "General / Cataract",   clarity: 4.6, care: 4.7, process: 4.4, reviews: 29, excellent: 22, good: 5, okay: 2, needs: 0 },
  { name: "Dr. Saif Uddin Adeel",     dept: "Retina",               clarity: 4.5, care: 4.6, process: 4.3, reviews: 21, excellent: 14, good: 5, okay: 2, needs: 0 },
  { name: "Dr. Meena Thotakura",      dept: "Glaucoma",             clarity: 4.4, care: 4.5, process: 4.2, reviews: 15, excellent: 9,  good: 4, okay: 2, needs: 0 },
  { name: "Dr. Prem Prakash Reddy",   dept: "General / Cataract",   clarity: 4.3, care: 4.4, process: 4.1, reviews: 18, excellent: 10, good: 6, okay: 2, needs: 0 },
];

const DEPARTMENTS = [
  { name: "General / Cataract",  reviews: 65, color: "#1b4fbe" },
  { name: "Refractive / LASIK",  reviews: 42, color: "#0ea5e9" },
  { name: "Retina",              reviews: 21, color: "#8b5cf6" },
  { name: "Glaucoma",           reviews: 15, color: "#10b981" },
  { name: "Paediatric",         reviews: 10, color: "#f59e0b" },
];

const WEEKLY = [
  { day: "Mon", count: 19 },
  { day: "Tue", count: 24 },
  { day: "Wed", count: 31 },
  { day: "Thu", count: 21 },
  { day: "Fri", count: 28 },
  { day: "Sat", count: 34 },
  { day: "Sun", count: 16 },
];

const THEMES = [
  { label: "Clear explanation",  count: 87, positive: true  },
  { label: "Friendly staff",     count: 72, positive: true  },
  { label: "Expert diagnosis",   count: 65, positive: true  },
  { label: "Clean facility",     count: 54, positive: true  },
  { label: "Short wait",         count: 41, positive: true  },
  { label: "Wait time",          count: 23, positive: false },
  { label: "Parking",            count: 12, positive: false },
];

const QUOTES = [
  { text: "Dr. Rupak explained my LASIK procedure so clearly. I felt completely confident going into surgery. Exceptional care!", dept: "Refractive / LASIK", days: "2 days ago" },
  { text: "Very thorough examination. The doctor took time to answer every question without rushing. Highly recommended.", dept: "General / Cataract", days: "3 days ago" },
  { text: "Clean, professional environment. Minor wait but absolutely worth it for the quality of care received.", dept: "Glaucoma", days: "5 days ago" },
];

const WA_LINK =
  "https://wa.me/919849016794?text=" +
  encodeURIComponent(
    "Hi Shiva! 👋 I saw the MediVision Eye Care feedback demo powered by Vouch and I'm interested in starting a pilot for my hospital.\n\n" +
    "🏥 Hospital Name: \n" +
    "📍 City: \n" +
    "👤 Your Name: \n" +
    "📞 Contact Number: \n\n" +
    "Looking forward to connecting!"
  );

/* ── Helpers ────────────────────────────────────────────── */
function avg(key) {
  return (DOCTORS.reduce((s, d) => s + d[key], 0) / DOCTORS.length).toFixed(1);
}
const totalReviews   = DOCTORS.reduce((s, d) => s + d.reviews, 0);
const totalExcellent = DOCTORS.reduce((s, d) => s + d.excellent, 0);
const satisfactionPct = Math.round((totalExcellent / totalReviews) * 100);
const maxWeekly = Math.max(...WEEKLY.map((w) => w.count));
const maxDept   = Math.max(...DEPARTMENTS.map((d) => d.reviews));

function MiniStars({ value }) {
  const full = Math.round(value);
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.82rem", letterSpacing: "-1px" }}>
      {"★".repeat(full)}<span style={{ color: "var(--border-strong)", opacity: 0.5 }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

function Pill({ label, color, bg }) {
  return (
    <span style={{ background: bg, color, border: `1px solid ${color}40`, borderRadius: "9999px", padding: "3px 10px", fontSize: "0.68rem", fontWeight: "800", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function doctorBadge(avg) {
  if (avg >= 4.7) return { label: "Top Rated", color: "#10b981", bg: "#ecfdf5" };
  if (avg >= 4.5) return { label: "Excellent",  color: "#3b82f6", bg: "#eff6ff" };
  return               { label: "Good",         color: "#d97706", bg: "#fefce8" };
}

const MEDALS = ["🥇", "🥈", "🥉"];

/* ── Page ───────────────────────────────────────────────── */
export default function DoctorPage() {
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "22px 20px 48px" }}>

      {/* Back */}
      <Link href="/" style={{ color: "var(--text-light)", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
        ← Home
      </Link>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.65rem", fontWeight: "900", color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "4px" }}>
            Doctor Insights
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
            MediVision Eye Care · Aggregated patient feedback
          </p>
        </div>
        <span style={{ background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: "9999px", padding: "5px 12px", fontSize: "0.7rem", fontWeight: "800", color: "#10b981", whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%", display: "inline-block" }} />
          Live
        </span>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        {[
          { icon: "📋", value: totalReviews,       label: "Total Reviews",    sub: "↑ 12% this week",  subColor: "#10b981" },
          { icon: "⭐", value: `${avg("care")}★`,  label: "Avg Care Rating",  sub: "Across all doctors", subColor: "var(--text-light)" },
          { icon: "😍", value: `${satisfactionPct}%`, label: "Excellent Visits", sub: `${totalExcellent} of ${totalReviews} patients`, subColor: "var(--text-light)" },
          { icon: "🔬", value: `${avg("clarity")}★`, label: "Avg Clarity",    sub: "Doctor explanations", subColor: "var(--text-light)" },
        ].map(({ icon, value, label, sub, subColor }) => (
          <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "18px 16px", boxShadow: "var(--shadow-sm)", transition: "background 0.25s, border-color 0.25s" }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#1b4fbe", lineHeight: 1, marginBottom: "4px" }}>{value}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text)", marginBottom: "2px" }}>{label}</div>
            <div style={{ fontSize: "0.68rem", color: subColor, fontWeight: "600" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Satisfaction Breakdown ─────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "22px", marginBottom: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <p style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.9rem" }}>Patient Satisfaction</p>
          <span style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{totalReviews} responses</span>
        </div>
        {[
          { label: "😍 Excellent",   count: 118, pct: 72, color: "#10b981" },
          { label: "😊 Good",        count: 34,  pct: 21, color: "#3b82f6" },
          { label: "😐 Okay",        count: 10,  pct: 6,  color: "#f59e0b" },
          { label: "😕 Needs work",  count: 1,   pct: 1,  color: "#ef4444" },
        ].map(({ label, count, pct, color }) => (
          <div key={label} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>{label}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: "800", color }}>
                {pct}% <span style={{ color: "var(--text-light)", fontWeight: "400" }}>({count})</span>
              </span>
            </div>
            <div className="h-bar-track">
              <div className="anim-bar" style={{ height: "9px", width: `${pct}%`, background: color, borderRadius: "9999px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── 7-Day Trend ────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "22px", marginBottom: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.9rem" }}>7-Day Review Trend</p>
          <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: "700" }}>↑ 18% vs last week</span>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "80px" }}>
          {WEEKLY.map(({ day, count }) => {
            const heightPct = (count / maxWeekly) * 100;
            return (
              <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div
                    className="anim-col"
                    style={{
                      width: "100%",
                      height: `${heightPct}%`,
                      background: count === maxWeekly
                        ? "linear-gradient(180deg, #1b4fbe, #0ea5e9)"
                        : "var(--border)",
                      borderRadius: "5px 5px 3px 3px",
                      minHeight: "6px",
                      position: "relative",
                    }}
                  >
                    {count === maxWeekly && (
                      <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontSize: "0.65rem", fontWeight: "800", color: "#1b4fbe", whiteSpace: "nowrap" }}>
                        {count}
                      </div>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: "0.62rem", color: "var(--text-light)", fontWeight: "600" }}>{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Feedback Themes ─────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "22px", marginBottom: "20px", boxShadow: "var(--shadow-sm)" }}>
        <p style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.9rem", marginBottom: "14px" }}>
          What patients are saying
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {THEMES.map(({ label, count, positive }) => (
            <span key={label} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: positive ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
              border: `1px solid ${positive ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
              borderRadius: "9999px",
              padding: "5px 12px",
              fontSize: "0.76rem",
              color: positive ? "#059669" : "#dc2626",
              fontWeight: "600",
            }}>
              {positive ? "✓" : "↑"} {label}
              <span style={{ opacity: 0.65, fontSize: "0.68rem" }}>({count})</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Department Breakdown ─────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "22px", marginBottom: "20px", boxShadow: "var(--shadow-sm)" }}>
        <p style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.9rem", marginBottom: "16px" }}>
          Reviews by Department
        </p>
        {DEPARTMENTS.map(({ name, reviews, color }) => (
          <div key={name} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "500" }}>{name}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color }}>
                {reviews} <span style={{ color: "var(--text-light)", fontWeight: "400" }}>reviews</span>
              </span>
            </div>
            <div className="h-bar-track">
              <div className="anim-bar" style={{ height: "9px", width: `${(reviews / maxDept) * 100}%`, background: color, borderRadius: "9999px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Doctor Leaderboard ──────────────────────────────── */}
      <p style={{ fontSize: "0.72rem", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
        Doctor Leaderboard
      </p>

      {DOCTORS.map((doc, i) => {
        const overallAvg = ((doc.clarity + doc.care + doc.process) / 3).toFixed(1);
        const badge = doctorBadge(parseFloat(overallAvg));
        const satisfiedPct = Math.round(((doc.excellent + doc.good) / doc.reviews) * 100);

        return (
          <div key={doc.name} style={{
            background: "var(--surface)",
            border: i === 0 ? "2px solid #10b98150" : "1px solid var(--border)",
            borderRadius: "16px",
            padding: "18px 16px",
            marginBottom: "10px",
            boxShadow: i === 0 ? "0 4px 20px rgba(16,185,129,0.12)" : "var(--shadow-sm)",
            transition: "background 0.25s, border-color 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0, lineHeight: 1.2 }}>
                  {MEDALS[i] || `${i + 1}`}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.88rem", marginBottom: "3px", lineHeight: 1.3 }}>{doc.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{doc.dept} · {doc.reviews} reviews</div>
                  <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <MiniStars value={parseFloat(overallAvg)} />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "700" }}>{overallAvg}</span>
                    <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: "700" }}>· {satisfiedPct}% satisfied</span>
                  </div>
                </div>
              </div>
              <Pill label={badge.label} color={badge.color} bg={badge.bg} />
            </div>

            {/* Score bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Clarity", val: doc.clarity },
                { label: "Care",    val: doc.care },
                { label: "Process", val: doc.process },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-light)", width: "48px", flexShrink: 0 }}>{label}</span>
                  <div className="h-bar-track">
                    <div style={{ height: "7px", width: `${(val / 5) * 100}%`, background: "linear-gradient(90deg, #1b4fbe, #0ea5e9)", borderRadius: "9999px" }} />
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#1b4fbe", width: "28px", flexShrink: 0, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* ── Patient Voices ──────────────────────────────────── */}
      <p style={{ fontSize: "0.72rem", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "24px 0 12px" }}>
        Recent Patient Voices
      </p>

      {QUOTES.map(({ text, dept, days }) => (
        <div key={text} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px", marginBottom: "10px", boxShadow: "var(--shadow-sm)" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6, marginBottom: "10px", fontStyle: "italic" }}>
            &ldquo;{text}&rdquo;
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#1b4fbe", fontWeight: "700", background: "var(--bg-subtle)", padding: "3px 10px", borderRadius: "9999px" }}>
              {dept}
            </span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-light)" }}>{days}</span>
          </div>
        </div>
      ))}

      {/* ── Vouch Pilot CTA ─────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1b4fbe 55%, #0ea5e9 100%)",
        borderRadius: "22px",
        padding: "30px 24px",
        textAlign: "center",
        marginTop: "28px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
          Powered by Vouch
        </p>
        <p style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "900", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Ready to go live?
        </p>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "22px" }}>
          This demo collects real feedback, zero IT setup.
          <br />
          Start a pilot for your hospital in 24 hours.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#25d366",
            color: "#fff",
            borderRadius: "9999px",
            padding: "14px 28px",
            fontWeight: "800",
            fontSize: "0.95rem",
            textDecoration: "none",
            boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
            transition: "transform 0.15s ease",
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.18a.75.75 0 00.925.924l5.276-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.92-1.337l-.353-.21-3.654 1.006 1.033-3.558-.23-.365A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          WhatsApp — Start a Pilot
        </a>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", marginTop: "12px" }}>
          +91 98490 16794 · Shiva · Vouch
        </p>
      </div>

    </div>
  );
}
