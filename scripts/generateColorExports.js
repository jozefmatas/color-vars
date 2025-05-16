const fs = require("fs");
const path = require("path");

// Read the primitives.json file
const primitivesPath = path.join(__dirname, "../tokens/colors/primitives.json");
const primitives = JSON.parse(fs.readFileSync(primitivesPath, "utf8"));

// Transform the color tokens into the format needed for stories
function transformColors(colors) {
  const result = {};

  // Handle neutral and brand
  result.neutral = Object.entries(colors.color.neutral).reduce(
    (acc, [key, value]) => {
      acc[`$neutral-${key}`] = value.value;
      return acc;
    },
    {}
  );

  result.brand = Object.entries(colors.color.brand).reduce(
    (acc, [key, value]) => {
      acc[`$brand-${key}`] = value.value;
      return acc;
    },
    {}
  );

  // Handle accent colors
  Object.entries(colors.color.accent).forEach(([category, shades]) => {
    result[category] = Object.entries(shades).reduce((acc, [key, value]) => {
      acc[`$accent-${category}-${key}`] = value.value;
      return acc;
    }, {});
  });

  // Handle utility colors
  Object.entries(colors.color.utility).forEach(([category, shades]) => {
    result[category] = Object.entries(shades).reduce((acc, [key, value]) => {
      acc[`$utility-${category}-${key}`] = value.value;
      return acc;
    }, {});
  });

  return result;
}

const colorTokens = transformColors(primitives);

// Generate the JavaScript export
const output = `// This file is auto-generated. Do not edit it manually.
export const primitiveColors = ${JSON.stringify(colorTokens, null, 2)};
`;

// Write the output file
const outputPath = path.join(__dirname, "../stories/colorTokens.js");
fs.writeFileSync(outputPath, output);

console.log("Color tokens generated successfully!");
