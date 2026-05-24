import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #eff6ff 0%, #f0f9ff 55%, #ffffff 100%)",
        padding: "48px 24px 52px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "380px", margin: "0 auto" }}>

          {/* Logo */}
          <div style={{ marginBottom: "28px" }}>
            <Image
              src="/medivisioneyecare.png"
              alt="MediVision Eye Care"
              width={96}
              height={96}
              priority
              style={{
                borderRadius: "22px",
                boxShadow: "0 16px 48px rgba(27,79,190,0.18), 0 4px 12px rgba(27,79,190,0.12)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "2.1rem",
            fontWeight: "900",
            color: "#0f172a",
            lineHeight: 1.15,
            marginBottom: "14px",
            letterSpacing: "-0.03em",
          }}>
            Your experience
            <br />
            <span style={{
              background: "linear-gradient(135deg, #1b4fbe 0%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              shapes our care
            </span>
          </h1>

          <p style={{
            color: "#64748b",
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: "300px",
            margin: "0 auto 10px",
          }}>
            Share honest feedback in under a minute.
          </p>
          <p style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#ecfdf5",
            border: "1px solid #bbf7d0",
            borderRadius: "9999px",
            padding: "4px 14px",
            fontSize: "0.78rem",
            color: "#166534",
            fontWeight: "600",
            marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%", display: "inline-block" }} />
            No sign-in required
          </p>

          {/* CTAs */}
          <Link href="/patient" style={{ display: "block", marginBottom: "12px", textDecoration: "none" }}>
            <button className="btn-primary" style={{ fontSize: "1.05rem" }}>
              Share My Feedback &rarr;
            </button>
          </Link>
          <Link href="/doctor" style={{ display: "block", textDecoration: "none" }}>
            <button className="btn-ghost">
              View Doctor Insights
            </button>
          </Link>

        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────── */}
      <section style={{ padding: "32px 24px 8px", maxWidth: "420px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { n: "60s", label: "To complete" },
            { n: "No login", label: "Required" },
            { n: "Private", label: "& Anonymous" },
          ].map(({ n, label }) => (
            <div key={label} style={{
              background: "#f8faff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "16px 8px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1rem", fontWeight: "800", color: "#1b4fbe" }}>{n}</div>
              <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "3px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* What patients can share */}
        <div style={{
          background: "#fffbeb",
          border: "1px solid #fde68a",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <p style={{ fontWeight: "700", color: "#92400e", fontSize: "0.85rem", marginBottom: "12px" }}>
            What you can share
          </p>
          {[
            "Rate your doctor's explanation & care quality",
            "Feedback on wait times & hospital processes",
            "Suggestions to improve your experience",
          ].map((item) => (
            <div key={item} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              marginBottom: "8px",
              fontSize: "0.82rem",
              color: "#78350f",
              lineHeight: 1.4,
            }}>
              <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Specialties served */}
        <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", marginBottom: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Specialties
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", justifyContent: "center", marginBottom: "32px" }}>
          {["Cataract", "LASIK", "Retina", "Glaucoma", "Paediatric"].map((s) => (
            <span key={s} style={{
              background: "#f0f6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "9999px",
              padding: "4px 12px",
              fontSize: "0.75rem",
              color: "#1b4fbe",
              fontWeight: "500",
            }}>
              {s}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
