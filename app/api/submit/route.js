export async function POST(req) {
  const data = await req.json();

  await fetch(process.env.GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return Response.json({ success: true });
}
