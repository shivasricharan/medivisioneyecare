"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

/* ── Sample / demo data (shown when sheet is empty) ─────── */
const SAMPLE_DOCTORS = [
  { name: "Dr. K. Rupak Kumar Reddy", dept: "Refractive / LASIK",  clarity: 4.9, care: 4.8, process: 4.7, reviews: 42 },
  { name: "Dr. K. Ravi Kumar Reddy",  dept: "General / Cataract",  clarity: 4.7, care: 4.8, process: 4.5, reviews: 38 },
  { name: "Dr. A. Vani Reddy",        dept: "General / Cataract",  clarity: 4.6, care: 4.7, process: 4.4, reviews: 29 },
  { name: "Dr. Saif Uddin Adeel",     dept: "Retina",              clarity: 4.5, care: 4.6, process: 4.3, reviews: 21 },
  { name: "Dr. Meena Thotakura",      dept: "Glaucoma",            clarity: 4.4, care: 4.5, process: 4.2, reviews: 15 },
  { name: "Dr. Prem Prakash Reddy",   dept: "General / Cataract",  clarity: 4.3, care: 4.4, process: 4.1, reviews: 18 },
];
const SAMPLE_SATISFACTION = [
  { label: "😍 Excellent",  count: 118, pct: 72, color: "#10b981" },
  { label: "😊 Good",       count: 34,  pct: 21, color: "#3b82f6" },
  { label: "😐 Okay",       count: 10,  pct: 6,  color: "#f59e0b" },
  { label: "😕 Needs work", count: 1,   pct: 1,  color: "#ef4444" },
];
const SAMPLE_DEPTS = [
  { name: "General / Cataract", reviews: 65, color: "#1b4fbe" },
  { name: "Refractive / LASIK", reviews: 42, color: "#0ea5e9" },
  { name: "Retina",             reviews: 21, color: "#8b5cf6" },
  { name: "Glaucoma",           reviews: 15, color: "#10b981" },
  { name: "Paediatric",         reviews: 10, color: "#f59e0b" },
];
const WEEKLY = [
  { day: "Mon", n: 19 }, { day: "Tue", n: 24 }, { day: "Wed", n: 31 },
  { day: "Thu", n: 21 }, { day: "Fri", n: 28 }, { day: "Sat", n: 34 }, { day: "Sun", n: 16 },
];
const THEMES = [
  { label: "Clear explanation", count: 87,  pos: true  },
  { label: "Friendly staff",    count: 72,  pos: true  },
  { label: "Expert diagnosis",  count: 65,  pos: true  },
  { label: "Clean facility",    count: 54,  pos: true  },
  { label: "Short wait",        count: 41,  pos: true  },
  { label: "Wait time",         count: 23,  pos: false },
  { label: "Parking",           count: 12,  pos: false },
];
const QUOTES = [
  { text: "Dr. Rupak explained my LASIK procedure so clearly. I felt completely confident going into surgery. Exceptional care!", dept: "Refractive / LASIK", ago: "2 days ago" },
  { text: "Very thorough examination. The doctor took time to answer every question without rushing. Highly recommended.", dept: "General / Cataract", ago: "3 days ago" },
  { text: "Clean, professional environment. Minor wait but absolutely worth it for the quality of care received.", dept: "Glaucoma", ago: "5 days ago" },
];

const DEPT_COLORS = {
  "General / Cataract":  "#1b4fbe",
  "Refractive / LASIK":  "#0ea5e9",
  "Retina":              "#8b5cf6",
  "Glaucoma":            "#10b981",
  "Paediatric":          "#f59e0b",
  "Not sure":            "#94a3b8",
};
const MEDALS = ["🥇", "🥈", "🥉"];

const WA_LINK =
  "https://wa.me/919849016794?text=" +
  encodeURIComponent(
    "Hi Shiva! 👋 I saw the MediVision Eye Care feedback demo powered by Vouch and I'm interested in starting a pilot for my hospital.\n\n" +
    "🏥 Hospital Name: \n📍 City: \n👤 Your Name: \n📞 Contact Number: \n\nLooking forward to connecting!"
  );

/* ── Transform raw live API data into dashboard shape ────── */
function buildFromLive(raw) {
  const { totalReviews, moodCounts = {}, doctorStats = {}, specialtyCounts = {} } = raw;

  const excellent = moodCounts["Excellent"] || 0;
  const good      = moodCounts["Good"]      || 0;
  const okay      = moodCounts["It was okay"] || 0;
  const needs     = moodCounts["Needs work"]  || 0;
  const satisfiedPct = totalReviews > 0 ? Math.round(((excellent + good) / totalReviews) * 100) : 0;

  // Weighted avg across all doctors
  let sumC = 0, sumCa = 0, sumP = 0, n = 0;
  Object.values(doctorStats).forEach((d) => {
    sumC  += parseFloat(d.clarity) * d.reviews;
    sumCa += parseFloat(d.care)    * d.reviews;
    sumP  += parseFloat(d.process) * d.reviews;
    n     += d.reviews;
  });
  const avgClarity = n > 0 ? (sumC  / n).toFixed(1) : "—";
  const avgCare    = n > 0 ? (sumCa / n).toFixed(1) : "—";

  const satisfaction = [
    { label: "😍 Excellent",  count: excellent, color: "#10b981" },
    { label: "😊 Good",       count: good,      color: "#3b82f6" },
    { label: "😐 Okay",       count: okay,      color: "#f59e0b" },
    { label: "😕 Needs work", count: needs,     color: "#ef4444" },
  ].map((r) => ({ ...r, pct: totalReviews > 0 ? Math.round((r.count / totalReviews) * 100) : 0 }));

  const doctors = Object.entries(doctorStats)
    .map(([name, s]) => ({
      name,
      dept:    s.specialty || "—",
      clarity: parseFloat(s.clarity) || 0,
      care:    parseFloat(s.care)    || 0,
      process: parseFloat(s.process) || 0,
      reviews: s.reviews,
    }))
    .sort((a, b) => (b.clarity + b.care + b.process) - (a.clarity + a.care + a.process));

  const maxDept = Math.max(...Object.values(specialtyCounts), 1);
  const depts = Object.entries(specialtyCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, cnt]) => ({ name, reviews: cnt, pct: Math.round((cnt / maxDept) * 100), color: DEPT_COLORS[name] || "#1b4fbe" }));

  return { totalReviews, avgClarity, avgCare, satisfiedPct, satisfaction, doctors, depts };
}

/* ── Sub-components ─────────────────────────────────────── */
function MiniStars({ value }) {
  const full = Math.round(value);
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.82rem", letterSpacing: "-1px" }}>
      {"★".repeat(full)}
      <span style={{ color: "var(--border-strong)", opacity: 0.4 }}>{"★".repeat(5 - full)}</span>
    </span>
  );
}

function Pill({ label, color, bg }) {
  return (
    <span style={{ background: bg, color, border: `1px solid ${color}40`, borderRadius: "9999px", padding: "3px 10px", fontSize: "0.67rem", fontWeight: "800", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function badgeFor(avg) {
  if (avg >= 4.7) return { label: "Top Rated", color: "#10b981", bg: "#ecfdf5" };
  if (avg >= 4.5) return { label: "Excellent",  color: "#3b82f6", bg: "#eff6ff" };
  return               { label: "Good",         color: "#d97706", bg: "#fefce8" };
}

function HBarTrack({ pct, color }) {
  return (
    <div style={{ flex: 1, height: "9px", background: "var(--border)", borderRadius: "9999px", overflow: "hidden" }}>
      <div className="anim-bar" style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "9999px" }} />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function DoctorPage() {
  const [raw, setRaw]           = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/insights")
      .then((r) => r.json())
      .then((d) => { if (d.success && !d.isEmpty && d.totalReviews > 0) setRaw(d); })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const isLive = Boolean(raw);

  const live = useMemo(() => (isLive ? buildFromLive(raw) : null), [raw, isLive]);

  /* pick live or sample */
  const totalReviews   = isLive ? live.totalReviews   : 163;
  const avgCare        = isLive ? live.avgCare         : "4.6";
  const avgClarity     = isLive ? live.avgClarity      : "4.6";
  const satisfiedPct   = isLive ? live.satisfiedPct    : 72;
  const satisfaction   = isLive ? live.satisfaction    : SAMPLE_SATISFACTION;
  const doctors        = isLive ? live.doctors         : SAMPLE_DOCTORS;
  const depts          = isLive ? live.depts           : SAMPLE_DEPTS;
  const maxDept        = Math.max(...depts.map((d) => d.reviews), 1);
  const maxWeekly      = Math.max(...WEEKLY.map((w) => w.n));

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "22px 20px 52px" }}>

      <Link href="/" style={{ color: "var(--text-light)", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
        ← Home
      </Link>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.65rem", fontWeight: "900", color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "4px" }}>
            Doctor Insights
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
            MediVision Eye Care · {isLive ? "Live patient feedback" : "Sample data"}
          </p>
        </div>

        {/* Live / Demo badge */}
        {fetching ? (
          <span style={{ fontSize: "0.7rem", color: "var(--text-light)", padding: "5px 10px" }}>Loading…</span>
        ) : isLive ? (
          <span style={{ background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: "9999px", padding: "5px 12px", fontSize: "0.7rem", fontWeight: "800", color: "#10b981", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
            <span style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            Live
          </span>
        ) : (
          <span style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "9999px", padding: "5px 12px", fontSize: "0.7rem", fontWeight: "700", color: "var(--text-muted)", flexShrink: 0 }}>
            Sample Data
          </span>
        )}
      </div>

      {/* Empty state hint */}
      {!fetching && !isLive && (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <span style={{ flexShrink: 0 }}>💡</span>
          <span>Showing sample data. As patients submit feedback, live insights will appear here automatically.</span>
        </div>
      )}

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {[
          { icon: "📋", value: isLive ? totalReviews : "163",  label: "Total Reviews",     sub: isLive ? "From real patients" : "↑ 12% this week",  subC: isLive ? "#10b981" : "#10b981" },
          { icon: "⭐", value: `${avgCare}★`,                  label: "Avg Care Rating",   sub: "Across all doctors",             subC: "var(--text-light)" },
          { icon: "😍", value: `${satisfiedPct}%`,             label: "Excellent Visits",  sub: isLive ? `${totalReviews} responses` : "118 of 163", subC: "var(--text-light)" },
          { icon: "🔬", value: `${avgClarity}★`,               label: "Avg Clarity",       sub: "Doctor explanations",            subC: "var(--text-light)" },
        ].map(({ icon, value, label, sub, subC }) => (
          <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "18px 14px", boxShadow: "var(--shadow-sm)", transition: "background 0.25s, border-color 0.25s" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "6px" }}>{icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#1b4fbe", lineHeight: 1, marginBottom: "4px" }}>{value}</div>
            <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "var(--text)", marginBottom: "2px" }}>{label}</div>
            <div style={{ fontSize: "0.66rem", color: subC, fontWeight: "600" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Satisfaction Breakdown ─────────────────────────── */}
      <Section title="Patient Satisfaction" right={`${totalReviews} responses`}>
        {satisfaction.map(({ label, count, pct, color }) => (
          <div key={label} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>{label}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: "800", color }}>
                {pct}% <span style={{ color: "var(--text-light)", fontWeight: "400" }}>({count})</span>
              </span>
            </div>
            <HBarTrack pct={pct} color={color} />
          </div>
        ))}
      </Section>

      {/* ── 7-Day Trend (always sample — needs timestamp tracking) ── */}
      <Section title="7-Day Review Trend" right={<span style={{ color: "#10b981", fontWeight: "700", fontSize: "0.72rem" }}>↑ 18% vs last week</span>}>
        <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "84px" }}>
          {WEEKLY.map(({ day, n }) => {
            const hPct = (n / maxWeekly) * 100;
            const peak = n === maxWeekly;
            return (
              <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", height: "100%" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div className="anim-col" style={{ width: "100%", height: `${hPct}%`, minHeight: "6px", background: peak ? "linear-gradient(180deg, #1b4fbe, #0ea5e9)" : "var(--border)", borderRadius: "5px 5px 3px 3px", position: "relative" }}>
                    {peak && (
                      <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontSize: "0.62rem", fontWeight: "800", color: "#1b4fbe", whiteSpace: "nowrap" }}>{n}</div>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: "0.6rem", color: "var(--text-light)", fontWeight: "600" }}>{day}</span>
              </div>
            );
          })}
        </div>
        {!isLive && (
          <p style={{ fontSize: "0.68rem", color: "var(--text-light)", marginTop: "10px", textAlign: "center" }}>Trend data populates as feedback is submitted</p>
        )}
      </Section>

      {/* ── Feedback Themes (always sample) ─────────────────── */}
      <Section title="What patients are saying">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {THEMES.map(({ label, count, pos }) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: pos ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${pos ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "9999px", padding: "5px 12px", fontSize: "0.75rem", color: pos ? "#059669" : "#dc2626", fontWeight: "600" }}>
              {pos ? "✓" : "↑"} {label}
              <span style={{ opacity: 0.6, fontSize: "0.67rem" }}>({count})</span>
            </span>
          ))}
        </div>
      </Section>

      {/* ── Department Breakdown ─────────────────────────────── */}
      <Section title="Reviews by Department">
        {depts.map(({ name, reviews, pct, color }) => (
          <div key={name} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "500" }}>{name}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color }}>
                {reviews} <span style={{ color: "var(--text-light)", fontWeight: "400" }}>reviews</span>
              </span>
            </div>
            <HBarTrack pct={pct !== undefined ? pct : Math.round((reviews / maxDept) * 100)} color={color} />
          </div>
        ))}
      </Section>

      {/* ── Doctor Leaderboard ──────────────────────────────── */}
      <p style={{ fontSize: "0.7rem", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "12px" }}>
        Doctor Leaderboard {isLive && <span style={{ color: "#10b981" }}>· Live</span>}
      </p>

      {doctors.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "24px", textAlign: "center", color: "var(--text-light)", fontSize: "0.85rem", marginBottom: "24px" }}>
          No doctor data yet — leaderboard populates as patients submit feedback
        </div>
      ) : doctors.map((doc, i) => {
        const overallAvg = ((doc.clarity + doc.care + doc.process) / 3);
        const badge = badgeFor(overallAvg);
        return (
          <div key={doc.name} style={{ background: "var(--surface)", border: i === 0 ? "2px solid #10b98150" : "1px solid var(--border)", borderRadius: "16px", padding: "18px 16px", marginBottom: "10px", boxShadow: i === 0 ? "0 4px 20px rgba(16,185,129,0.10)" : "var(--shadow-sm)", transition: "background 0.25s, border-color 0.25s" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: "1.25rem", flexShrink: 0, lineHeight: 1.2 }}>{MEDALS[i] || `${i + 1}.`}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.88rem", marginBottom: "3px", lineHeight: 1.3 }}>{doc.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{doc.dept} · {doc.reviews} {doc.reviews === 1 ? "review" : "reviews"}</div>
                  <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <MiniStars value={overallAvg} />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "700" }}>{overallAvg.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <Pill label={badge.label} color={badge.color} bg={badge.bg} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[{ label: "Clarity", val: doc.clarity }, { label: "Care", val: doc.care }, { label: "Process", val: doc.process }].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-light)", width: "46px", flexShrink: 0 }}>{label}</span>
                  <div style={{ flex: 1, height: "7px", background: "var(--border)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(val / 5) * 100}%`, background: "linear-gradient(90deg, #1b4fbe, #0ea5e9)", borderRadius: "9999px" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: "800", color: "#1b4fbe", width: "26px", flexShrink: 0, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* ── Patient Voices ──────────────────────────────────── */}
      <p style={{ fontSize: "0.7rem", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.09em", margin: "24px 0 12px" }}>
        Recent Patient Voices
      </p>
      {QUOTES.map(({ text, dept, ago }) => (
        <div key={text} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px", marginBottom: "10px", boxShadow: "var(--shadow-sm)", transition: "background 0.25s, border-color 0.25s" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.65, marginBottom: "10px", fontStyle: "italic" }}>
            &ldquo;{text}&rdquo;
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#1b4fbe", fontWeight: "700", background: "var(--bg-subtle)", padding: "3px 10px", borderRadius: "9999px" }}>{dept}</span>
            <span style={{ fontSize: "0.67rem", color: "var(--text-light)" }}>{ago}</span>
          </div>
        </div>
      ))}

      {/* ── Vouch WhatsApp CTA ──────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1b4fbe 55%, #0ea5e9 100%)", borderRadius: "22px", padding: "30px 22px", textAlign: "center", marginTop: "28px" }}>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Powered by Vouch</p>
        <p style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "900", marginBottom: "8px", letterSpacing: "-0.02em" }}>Ready to go live?</p>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "22px" }}>
          This demo collects real feedback — zero IT setup.<br />Start a pilot for your hospital in 24 hours.
        </p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25d366", color: "#fff", borderRadius: "9999px", padding: "14px 26px", fontWeight: "800", fontSize: "0.92rem", textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,0.45)" }}>
          <WhatsAppIcon />
          WhatsApp — Start a Pilot
        </a>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.66rem", marginTop: "12px" }}>+91 98490 16794 · Shiva · Vouch</p>
      </div>

    </div>
  );
}

/* ── Layout helpers ─────────────────────────────────────── */
function Section({ title, right, children }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px", marginBottom: "16px", boxShadow: "var(--shadow-sm)", transition: "background 0.25s, border-color 0.25s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <p style={{ fontWeight: "800", color: "var(--text)", fontSize: "0.88rem" }}>{title}</p>
        {right && <span style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{right}</span>}
      </div>
      {children}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.18a.75.75 0 00.925.924l5.276-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.92-1.337l-.353-.21-3.654 1.006 1.033-3.558-.23-.365A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  );
}
