import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, var(--bg-subtle) 0%, var(--bg-2) 55%, var(--bg) 100%)",
        padding: "48px 24px 52px",
        textAlign: "center",
        transition: "background 0.25s ease",
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
                boxShadow: "0 16px 48px rgba(27,79,190,0.2), 0 4px 12px rgba(27,79,190,0.12)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "2.1rem",
            fontWeight: "900",
            color: "var(--text)",
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

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto 10px" }}>
            Share honest feedback in under a minute.
          </p>

          {/* No sign-in badge */}
          <div style={{ marginBottom: "32px", display: "flex", justifyContent: "center" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#ecfdf5", border: "1px solid #bbf7d0",
              borderRadius: "9999px", padding: "4px 14px",
              fontSize: "0.78rem", color: "#166534", fontWeight: "600",
            }}>
              <span style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%", display: "inline-block" }} />
              No sign-in required
            </span>
          </div>

          {/* Primary CTA */}
          <Link href="/patient" style={{ display: "block", marginBottom: "12px", textDecoration: "none" }}>
            <button className="btn-primary" style={{ fontSize: "1.05rem" }}>
              Share My Feedback →
            </button>
          </Link>

          {/* Doctor insights */}
          <Link href="/doctor" style={{ display: "block", marginBottom: "10px", textDecoration: "none" }}>
            <button className="btn-ghost">View Doctor Insights</button>
          </Link>

        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────── */}
      <section style={{ padding: "28px 24px 8px", maxWidth: "420px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "22px" }}>
          {[
            { n: "60s",     label: "To complete" },
            { n: "No login", label: "Required" },
            { n: "Private", label: "& Anonymous" },
          ].map(({ n, label }) => (
            <div key={label} className="kpi-card">
              <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#1b4fbe" }}>{n}</div>
              <div style={{ fontSize: "0.66rem", color: "var(--text-light)", marginTop: "3px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* What you can share */}
        <div style={{
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "22px",
        }}>
          <p style={{ fontWeight: "700", color: "var(--text)", fontSize: "0.85rem", marginBottom: "12px" }}>
            What you can share
          </p>
          {[
            "Rate your doctor's explanation & care quality",
            "Feedback on wait times & hospital processes",
            "Suggestions to improve your experience",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
              <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Specialties */}
        <p style={{ fontSize: "0.72rem", color: "var(--text-light)", textAlign: "center", marginBottom: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.07em" }}>
          Specialties
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", justifyContent: "center", marginBottom: "30px" }}>
          {["Cataract", "LASIK", "Retina", "Glaucoma", "Paediatric"].map((s) => (
            <span key={s} style={{
              background: "var(--bg-subtle)", border: "1px solid var(--border)",
              borderRadius: "9999px", padding: "4px 12px",
              fontSize: "0.75rem", color: "#1b4fbe", fontWeight: "500",
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* ── WhatsApp Pilot CTA ─────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1b4fbe 60%, #0ea5e9 100%)",
          borderRadius: "20px",
          padding: "26px 22px",
          textAlign: "center",
          marginBottom: "12px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
            For hospitals &amp; clinics
          </p>
          <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.01em" }}>
            Want this for your hospital?
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", lineHeight: 1.55, marginBottom: "18px" }}>
            Frictionless patient feedback, beautiful insights — no IT setup needed.
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
              padding: "13px 24px",
              fontWeight: "800",
              fontSize: "0.92rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.18a.75.75 0 00.925.924l5.276-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.92-1.337l-.353-.21-3.654 1.006 1.033-3.558-.23-.365A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Start a Pilot on WhatsApp
          </a>
        </div>

      </section>

    </div>
  );
}
