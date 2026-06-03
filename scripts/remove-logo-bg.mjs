// One-shot utility: take Desktop/logo2.png (white silhouette on solid blue bg)
// and produce public/logo.png with the bg replaced by transparency.
// Approach: alpha = how close each pixel is to pure white (anti-aliased edges
// get partial alpha → no halo). Color is forced to white so the final mark is
// a clean white silhouette suitable for dark themes (and trivially recolorable
// via CSS filters / mask-image if needed later).
import sharp from "sharp";
import path from "node:path";

const IN = "C:/Users/Tayip/Desktop/logo2.png";
const OUT = path.resolve(process.cwd(), "public/logo.png");

const { data, info } = await sharp(IN)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Max possible distance from white in RGB (0,0,0 → 255,255,255) is sqrt(3*255²)
const MAX_DIST = Math.sqrt(3) * 255;

const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const dr = 255 - r, dg = 255 - g, db = 255 - b;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  // Linearly map dist→alpha. Slight bias so anything past ~55% distance is fully transparent.
  let alpha = 255 - (dist / MAX_DIST) * 460;
  if (alpha < 0) alpha = 0;
  if (alpha > 255) alpha = 255;
  out[i] = 255;
  out[i + 1] = 255;
  out[i + 2] = 255;
  out[i + 3] = Math.round(alpha);
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`✔ ${OUT} written (${info.width}x${info.height})`);
