import jsPDF from "jspdf";

let fontCacheRegular: string | null = null;
let fontCacheBold: string | null = null;

/**
 * Fetches a font file and converts to base64.
 * Caches the result so subsequent calls are instant.
 */
async function loadFontBase64(url: string, cache: "regular" | "bold"): Promise<string> {
  if (cache === "regular" && fontCacheRegular) return fontCacheRegular;
  if (cache === "bold" && fontCacheBold) return fontCacheBold;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Convert to base64
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  const base64 = btoa(binary);

  if (cache === "regular") fontCacheRegular = base64;
  if (cache === "bold") fontCacheBold = base64;
  return base64;
}

/**
 * Registers Meiryo Regular + Bold fonts with a jsPDF document instance.
 * Must be called before any text rendering that includes Japanese characters.
 */
export async function registerJapaneseFont(doc: jsPDF): Promise<void> {
  const [regularBase64, boldBase64] = await Promise.all([
    loadFontBase64("/fonts/meiryo_0.ttf", "regular"),
    loadFontBase64("/fonts/meiryob_0.ttf", "bold"),
  ]);

  // Register Regular
  doc.addFileToVFS("Meiryo-Regular.ttf", regularBase64);
  doc.addFont("Meiryo-Regular.ttf", "Meiryo", "normal");

  // Register Bold
  doc.addFileToVFS("Meiryo-Bold.ttf", boldBase64);
  doc.addFont("Meiryo-Bold.ttf", "Meiryo", "bold");

  // Set Regular as default
  doc.setFont("Meiryo", "normal");
}
