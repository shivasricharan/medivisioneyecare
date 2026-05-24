import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "MediVision Eye Care — Share Your Experience",
  description: "Quick, frictionless patient feedback for MediVision Eye Care Centre. No sign-in required."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>

        {/* Brand accent stripe */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #1b4fbe 0%, #0ea5e9 100%)", flexShrink: 0 }} />

        {/* Header */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 20px",
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
          flexShrink: 0,
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <Image
              src="/medivisioneyecare.png"
              alt="MediVision Eye Care"
              width={34}
              height={34}
              style={{ borderRadius: "8px", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: "800", fontSize: "0.88rem", color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                MediVision
              </div>
              <div style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Eye Care Centre
              </div>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} />
            <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: "500" }}>
              Powered by <span style={{ color: "#1b4fbe", fontWeight: "800" }}>Vouch</span>
            </span>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <footer style={{
          textAlign: "center",
          padding: "18px 16px",
          borderTop: "1px solid #f1f5f9",
          fontSize: "0.72rem",
          color: "#94a3b8",
          flexShrink: 0,
        }}>
          Powered by <span style={{ color: "#1b4fbe", fontWeight: "800" }}>Vouch</span>
          {" "}· Patient intelligence for care teams
          <br />
          <span style={{ color: "#cbd5e1" }}>
            MediVision Eye Care Centre · Hyderabad
          </span>
        </footer>

      </body>
    </html>
  );
}
