import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function distanceToSegment(x, y, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  const amount = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lengthSquared));
  const closestX = x1 + amount * dx;
  const closestY = y1 + amount * dy;
  return Math.hypot(x - closestX, y - closestY);
}

function createIcon(size) {
  const rowSize = size * 4 + 1;
  const raw = Buffer.alloc(rowSize * size);
  const navy = [27, 42, 74, 255];
  const gold = [201, 162, 39, 255];
  const radius = size * 0.31;
  const center = size / 2;
  const stroke = size * 0.075;

  for (let y = 0; y < size; y += 1) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0;
    for (let x = 0; x < size; x += 1) {
      const offset = rowOffset + 1 + x * 4;
      const insideCircle = Math.hypot(x - center, y - center) <= radius;
      const onCheck =
        distanceToSegment(x, y, size * 0.31, size * 0.52, size * 0.44, size * 0.65) <= stroke ||
        distanceToSegment(x, y, size * 0.44, size * 0.65, size * 0.7, size * 0.37) <= stroke;
      const color = insideCircle ? gold : navy;
      const finalColor = insideCircle && onCheck ? navy : color;
      raw[offset] = finalColor[0];
      raw[offset + 1] = finalColor[1];
      raw[offset + 2] = finalColor[2];
      raw[offset + 3] = finalColor[3];
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}

function contentHash(content) {
  return createHash("sha256").update(content).digest("base64");
}

const [indexSource, styles, script, manifestSource, serviceWorkerSource] = await Promise.all([
  readFile(join(root, "index.html"), "utf8"),
  readFile(join(root, "styles.css"), "utf8"),
  readFile(join(root, "app.js"), "utf8"),
  readFile(join(root, "manifest.webmanifest"), "utf8"),
  readFile(join(root, "sw.js"), "utf8")
]);

const icon192 = createIcon(192);
const icon512 = createIcon(512);
const shellVersion = createHash("sha256")
  .update(indexSource)
  .update(styles)
  .update(script)
  .update(manifestSource)
  .digest("hex")
  .slice(0, 16);
const serviceWorker = serviceWorkerSource.replace(
  /const CACHE_NAME = "goal-tracker-shell-[^"]+";/,
  `const CACHE_NAME = "goal-tracker-shell-${shellVersion}";`
);
if (serviceWorker === serviceWorkerSource && !serviceWorkerSource.includes(`goal-tracker-shell-${shellVersion}`)) {
  throw new Error("The service worker cache version marker is missing.");
}
await Promise.all([
  writeFile(join(root, "icon-192.png"), icon192),
  writeFile(join(root, "icon-512.png"), icon512),
  writeFile(join(root, "sw.js"), serviceWorker, "utf8")
]);

const policy = [
  "default-src 'none'",
  `script-src 'sha256-${contentHash(script)}'`,
  `style-src 'sha256-${contentHash(styles)}'`,
  "img-src data: blob:",
  "font-src 'none'",
  "connect-src 'none'",
  "media-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "manifest-src 'none'"
].join("; ");

let singleFile = indexSource
  .replace('data-single-file="false"', 'data-single-file="true"')
  .replace(
    /<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?>/,
    `<meta http-equiv="Content-Security-Policy" content="${policy}">`
  )
  .replace(/\s*<link rel="manifest"[^>]*>/, "")
  .replace(/\s*<link rel="icon"[^>]*>/, "")
  .replace(/\s*<link rel="apple-touch-icon"[^>]*>/, "")
  .replace(
    /\s*<link rel="stylesheet" href="styles\.css">/,
    `\n  <link rel="icon" href="data:image/png;base64,${icon192.toString("base64")}">\n  <style>${styles}</style>`
  )
  .replace(/\s*<script src="app\.js"><\/script>/, `\n  <script>${script}</script>`);

if (singleFile.includes('src="app.js"') || singleFile.includes('href="styles.css"')) {
  throw new Error("The single-file build still contains external app assets.");
}

singleFile = `${singleFile.trim()}\n`;
await writeFile(join(root, "goal-tracker.html"), singleFile, "utf8");

process.stdout.write("Built Goal Tracker PWA icons and goal-tracker.html.\n");
