const fs = require("fs");
const path = require("path");

const TOKENS_PATH = path.join(
  __dirname,
  "../tokens/typography/typography.json"
);
const OUT_PATH = path.join(
  __dirname,
  "../build/scss/typography/_typography.scss"
);

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function resolveReference(val) {
  // Replace {fontFamily.mackinac.value} or {fontWeight.inter.semibold.value} with $fontFamily-mackinac or $fontWeight-inter-semibold
  return typeof val === "string"
    ? val.replace(/\{([^.]+)\.([^.]+)(?:\.([^.]+))?\.value\}/g, (_, a, b, c) =>
        c ? `$${a}-${b}-${c}` : `$${a}-${b}`
      )
    : val;
}

function generateMixinAndClass(name, value) {
  let snippet = `@mixin ${name} {\n`;
  if (value.fontFamily)
    snippet += `  font-family: ${resolveReference(value.fontFamily)};\n`;
  if (value.fontSize)
    snippet += `  font-size: ${resolveReference(value.fontSize)};\n`;
  if (value.fontWeight)
    snippet += `  font-weight: ${resolveReference(value.fontWeight)};\n`;
  if (value.lineHeight)
    snippet += `  line-height: ${resolveReference(value.lineHeight)};\n`;
  if (value.letterSpacing)
    snippet += `  letter-spacing: ${resolveReference(value.letterSpacing)};\n`;
  if (value.textTransform)
    snippet += `  text-transform: ${resolveReference(value.textTransform)};\n`;
  snippet += `}\n\n`;
  snippet += `.${name} { @include ${name}; }\n\n`;
  return snippet;
}

// Recursively walk the tokens and generate mixins for objects with a "value" property
function walk(obj, path = [], output = []) {
  if (obj && typeof obj === "object") {
    if ("value" in obj && obj.type === "typography") {
      const name = path.join("-");
      output.push(generateMixinAndClass(name, obj.value));
    } else {
      for (const key in obj) {
        walk(obj[key], [...path, key], output);
      }
    }
  }
  return output;
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf8"));
  let output = "// AUTO-GENERATED FILE. DO NOT EDIT.\n\n";

  if (tokens.scale) {
    output += walk(tokens.scale).join("");
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, output);
  console.log("Typography SCSS generated at", OUT_PATH);
}

main();
