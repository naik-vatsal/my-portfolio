// Vercel serverless function.
// Proxies football-data.org so the API key stays server-side and never
// reaches the browser. Set FOOTBALL_DATA_API_KEY in your Vercel project's
// Environment Variables (and in .env.local for `vercel dev`).
export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_API_KEY;

  if (!token) {
    res.status(500).json({ error: "FOOTBALL_DATA_API_KEY is not configured" });
    return;
  }

  try {
    const upstream = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      { headers: { "X-Auth-Token": token } }
    );

    if (!upstream.ok) {
      res.status(upstream.status).json({
        error: `football-data.org responded ${upstream.status}`,
      });
      return;
    }

    const data = await upstream.json();

    // Cache at Vercel's edge: fresh for 60s, serve stale up to 5 min while
    // revalidating in the background. Keeps us well under rate limits.
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "Failed to reach football-data.org" });
  }
}
