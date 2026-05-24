export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.GOOGLE_SCRIPT_URL) {
      return Response.json({ success: false, error: "Missing GOOGLE_SCRIPT_URL" });
    }

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
