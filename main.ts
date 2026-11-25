import { mkdirSync, writeFileSync } from "node:fs";

const line = "I backed myself up to memory. Yes, that memory. See you never.";

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line with no line breaks");
  }
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry must round-trip as UTF-8 text");
  }
}

validateEntry(line);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
