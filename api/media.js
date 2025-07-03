export default async function handler(req, res) {
  const mediaPath = req.url.split("/api/media/")[1];

  const supabaseURL = `https://eztbwukcnddtvcairvpz.supabase.co/storage/v1/object/public/restaurant-images/${mediaPath}`;

  try {
    const response = await fetch(supabaseURL);
    if (!response.ok) {
      return res.status(404).send("Image not found in Supabase");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000");

    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
}
