const sharp = require('sharp');
const path = require('path');

const types = [
  ['PIONEER', 'INVENTOR', 'VISIONARY'],
  ['EXECUTOR', 'STRATEGIST', 'GUARDIAN'],
  ['CATALYST', 'ANALYST', 'COMMANDER'],
  ['SUPPORTER', 'MEDIATOR', 'HARMONIZER'],
  ['ANCHOR', 'INSPECTOR', 'STABILIZER'],
];

async function extract() {
  const imgPath = 'C:/Users/tohru/Downloads/CAREER GENOME 15-Type.png';
  const outDir = path.join(__dirname, '..', 'public', 'icons');

  // Image: 1792 x 2400
  // The row labels (O 開放性 etc) extend into the first column
  // Need to crop more aggressively from the left to exclude labels
  // And from bottom to exclude type name text

  // Column boundaries (the actual card/icon areas):
  // Col 0: approx 260 to 700 (the card starts well past the label)
  // Col 1: approx 700 to 1240
  // Col 2: approx 1240 to 1780

  // Row boundaries (icon illustration only, no text):
  // Row 0: approx 330 to 540 (illustration area, before "PIONEER" text)
  // Row 1: approx 750 to 960
  // etc. (each row ~420px apart)

  const colStarts = [275, 720, 1260];
  const colEnds = [690, 1230, 1770];
  const rowH = 420;
  const gridTopStart = 320;

  // Within each cell card, the illustration is in the top portion
  // The bottom has type name + Japanese name + tagline
  // Illustration height is about 200-220px of the ~400px cell
  const illustrationHeight = 190;
  const topPad = 5;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      const name = types[row][col];

      const x = colStarts[col];
      const y = gridTopStart + row * rowH + topPad;
      const w = colEnds[col] - colStarts[col];
      const h = illustrationHeight;

      const safeW = Math.min(w, 1792 - x);
      const safeH = Math.min(h, 2400 - y);

      const outPath = path.join(outDir, `${name.toLowerCase()}.png`);

      await sharp(imgPath)
        .extract({ left: x, top: y, width: safeW, height: safeH })
        .resize(300, 300, { fit: 'cover' })
        .png()
        .toFile(outPath);

      console.log(`${name}: (${x},${y}) ${safeW}x${safeH}`);
    }
  }

  console.log('Done!');
}

extract().catch(console.error);
