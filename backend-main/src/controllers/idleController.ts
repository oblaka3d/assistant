import { RequestHandler } from 'express';

const DEFAULT_PEXELS_QUERY = 'technology landscape';
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad)"/>
  <text x="50%" y="50%" fill="#cbd5f5" font-size="64" font-family="Inter,Helvetica,Arial,sans-serif" text-anchor="middle">
    Idle Mode
  </text>
</svg>`;
const FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(FALLBACK_SVG)}`;

export const getIdleImage: RequestHandler = async (req, res, _next) => {
  try {
    const query = String(req.query.query || DEFAULT_PEXELS_QUERY);
    const fallback = FALLBACK_IMAGE;
    const apiKey = process.env.PEXELS_API_KEY;

    if (!apiKey) {
      return res.json({ url: fallback });
    }

    const page = Math.floor(Math.random() * 5) + 1;
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&orientation=landscape&per_page=15&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      return res.json({ url: fallback });
    }

    const payload = (await response.json().catch(() => null)) as {
      photos?: Array<{ src?: { landscape?: string; original?: string; large?: string } }>;
    } | null;
    const photos = Array.isArray(payload?.photos) ? payload.photos : [];
    if (photos.length === 0) {
      return res.json({ url: fallback });
    }

    const photo = photos[Math.floor(Math.random() * photos.length)];
    const photoUrl = photo?.src?.landscape || photo?.src?.original || photo?.src?.large || fallback;
    return res.json({ url: photoUrl });
  } catch (error) {
    console.error('Failed to fetch idle image:', error);
    return res.json({
      url: FALLBACK_IMAGE,
    });
  }
};
