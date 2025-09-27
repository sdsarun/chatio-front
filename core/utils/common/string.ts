/**
 * Insert zero-width spaces (U+200B) into long words to allow safe line breaking.
 *
 * Production-grade behavior:
 *  - Uses Intl.Segmenter to avoid splitting grapheme clusters (emoji, ZWJ) when available.
 *  - Optionally preserves HTML tags (if html = true) by only operating on text nodes.
 *  - Skips insertion for URLs, emails and other skip patterns.
 *  - Idempotent: removes existing ZWSPs before inserting.
 *
 * @param text - input string (plain text or sanitized HTML)
 * @param opts - options
 * @returns processed string with inserted ZWSP characters
 */
export function insertHiddenSpaces(
  text: string,
  opts?: {
    maxLength?: number; // insert ZWSP every maxLength graphemes
    html?: boolean; // whether input may contain HTML tags to preserve
    skipPatterns?: RegExp[]; // list of regexes to skip (URLs/emails by default)
    zwsp?: string; // zero width space character (default '\u200B')
    segmenterLocale?: string; // locale for Intl.Segmenter, default 'en'
  }
): string {
  if (!text) return "";

  const {
    maxLength = 50,
    html = false,
    skipPatterns = [],
    zwsp = "\u200B",
    segmenterLocale = "en"
  } = opts || {};

  // sensible default skip patterns (URLs and emails)
  const defaultSkipPatterns: RegExp[] = [
    // http(s)://... or ftp://...
    /\b(?:https?:\/\/|ftp:\/\/)[^\s<>"']+/i,
    // www.example.com/..., or example.com/...
    /\b(?:www\.)[^\s<>"']+|\b[a-z0-9\-]+(?:\.[a-z0-9\-]+)+[^\s<>"']*/i,
    // emails
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  ];

  const allSkipPatterns = [...defaultSkipPatterns, ...skipPatterns];

  // Segmenter for grapheme clusters if available
  const useSegmenter = typeof Intl !== "undefined" && typeof (Intl as any).Segmenter === "function";
  const segmenter = useSegmenter
    ? new (Intl as any).Segmenter(segmenterLocale, { granularity: "grapheme" })
    : null;

  const splitIntoGraphemes = (s: string) => {
    if (segmenter) {
      const seg = segmenter.segment(s);
      const arr: string[] = [];
      for (const { segment } of seg) arr.push(segment);
      return arr;
    }
    // fallback: split by code points (not perfect for ZWJ sequences but safer than naive char split)
    return Array.from(s);
  };

  // Check if token matches any skip pattern
  const shouldSkip = (token: string) => {
    return allSkipPatterns.some((r) => r.test(token));
  };

  // Process a single text chunk (no HTML tags inside)
  const processTextChunk = (chunk: string) => {
    // Keep whitespace as-is: split by whitespace but preserve separators
    const parts = chunk.split(/(\s+)/);

    return parts
      .map((part) => {
        // whitespace -> keep
        if (/^\s*$/.test(part)) return part;

        // Remove existing ZWSPs to make function idempotent
        const cleaned = part.replace(new RegExp(zwsp, "g"), "");

        // skip if short or matches skip patterns
        if (cleaned.length <= maxLength || shouldSkip(cleaned)) return cleaned;

        // split into graphemes to avoid breaking emoji / combining char sequences
        const graphemes = splitIntoGraphemes(cleaned);

        if (graphemes.length <= maxLength) return cleaned;

        // Insert ZWSP every maxLength graphemes
        // Build result incrementally to avoid re-creating large strings repeatedly
        let out = "";
        for (let i = 0; i < graphemes.length; i++) {
          out += graphemes[i];
          const at = i + 1;
          if (at % maxLength === 0 && at !== graphemes.length) {
            // Avoid inserting if next char is whitespace (shouldn't happen inside "word") or hyphen?
            // But still insert as a safe break point.
            out += zwsp;
          }
        }
        return out;
      })
      .join("");
  };

  // If html mode, preserve tags and attributes by only processing text between tags
  if (html) {
    // split into tags and text nodes (keeps tags in array)
    const tokens = text.split(/(<[^>]*>)/g);
    return tokens
      .map((tok) => {
        if (tok.startsWith("<") && tok.endsWith(">")) {
          return tok; // HTML tag: keep as-is
        } else {
          return processTextChunk(tok);
        }
      })
      .join("");
  }

  // plain text
  return processTextChunk(text);
}