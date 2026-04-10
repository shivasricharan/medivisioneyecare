export async function POST(req) {
  try {
    const data = await req.json();

    if (!process.env.GOOGLE_SCRIPT_URL) {
      return Response.json({
        success: false,
        error: "Missing GOOGLE_SCRIPT_URL"
      });
    }

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const text = await response.text();

    return Response.json({
      success: true,
      scriptResponse: text
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}