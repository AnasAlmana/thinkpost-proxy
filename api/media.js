export default async function handler(req, res) {
  const { url } = req;
  const mediaPath = url.replace("/api/media/", "");

  const supabaseURL = `https://eztbwukcnddtvcairvpz.supabase.co/storage/v1/object/public/restaurant-images/${mediaPath}`;

  try {
    const response = await fetch(supabaseURL);
    if (!response.ok) {
      return res.status(404).send("Image not found");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000");

    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).send("Internal error");
  }
}
