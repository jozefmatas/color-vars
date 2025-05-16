const fs = require("fs");
const path = require("path");

// Read Figma export files
const colorsPath = path.join(__dirname, "../figma_json/colors.json");
const gradientsPath = path.join(__dirname, "../figma_json/gradients.json");

const colors = JSON.parse(fs.readFileSync(colorsPath, "utf8"));
const gradients = JSON.parse(fs.readFileSync(gradientsPath, "utf8"));

// Transform color tokens
function transformColors(colors) {
  const result = {
    color: {
      neutral: {},
      brand: {},
      accent: {
        sage: {},
        desert: {},
        thistle: {},
        periwinkle: {},
        mist: {},
      },
      utility: {
        green: {},
        yellow: {},
        red: {},
      },
    },
  };

  // Process primitive colors
  Object.entries(colors.Colors).forEach(([key, value]) => {
    if (key.startsWith("🎨/")) {
      const parts = key.replace("🎨/", "").split("/");

      if (parts[0] === "neutral") {
        result.color.neutral[parts[1]] = { value };
      } else if (parts[0] === "brand") {
        result.color.brand[parts[1]] = { value };
      } else if (parts[0] === "accent") {
        result.color.accent[parts[1]][parts[2]] = { value };
      } else if (parts[0] === "utility") {
        result.color.utility[parts[1]][parts[2]] = { value };
      }
    }
  });

  return result;
}

// Transform semantic tokens
function transformSemanticTokens(colors) {
  const existingSemanticPath = path.join(
    __dirname,
    "../tokens/colors/semantic.json"
  );
  let existingSemanticTokens = {};

  try {
    existingSemanticTokens = JSON.parse(
      fs.readFileSync(existingSemanticPath, "utf8")
    );
  } catch (error) {
    console.log("No existing semantic tokens found, creating new file");
  }

  const result = {
    ...existingSemanticTokens,
    color: {
      ...existingSemanticTokens.color,
      background: {
        ...(existingSemanticTokens.color?.background || {}),
        gradient: {
          green: {
            start: {
              value: "{color.utility.green.200.value}",
              comment: "Start color for green gradient",
            },
            end: {
              value: "{color.neutral.white.value}",
              comment: "End color for green gradient",
            },
          },
          yellow: {
            start: {
              value: "{color.utility.yellow.200.value}",
              comment: "Start color for yellow gradient",
            },
            end: {
              value: "{color.neutral.white.value}",
              comment: "End color for yellow gradient",
            },
          },
          red: {
            start: {
              value: "{color.utility.red.200.value}",
              comment: "Start color for red gradient",
            },
            end: {
              value: "{color.neutral.white.value}",
              comment: "End color for red gradient",
            },
          },
        },
      },
    },
  };

  return result;
}

// Transform gradient tokens
function transformGradients(gradients) {
  const result = {
    gradient: {
      body: {},
    },
  };

  Object.entries(gradients).forEach(([key, value]) => {
    const name = key.split("/").pop().toLowerCase();
    result.gradient.body[name] = {
      value: `linear-gradient(180deg, {color.background.gradient.${name}.start.value} 0%, {color.background.gradient.${name}.end.value} 100%)`,
    };
  });

  return result;
}

// Generate primitives.json
const colorTokens = transformColors(colors);
fs.writeFileSync(
  path.join(__dirname, "../tokens/colors/primitives.json"),
  JSON.stringify(colorTokens, null, 2)
);

// Generate semantic.json
const semanticTokens = transformSemanticTokens(colors);
fs.writeFileSync(
  path.join(__dirname, "../tokens/colors/semantic.json"),
  JSON.stringify(semanticTokens, null, 2)
);

// Generate gradients.json
const gradientTokens = transformGradients(gradients);
fs.writeFileSync(
  path.join(__dirname, "../tokens/gradients/primitives.json"),
  JSON.stringify(gradientTokens, null, 2)
);

console.log("Color and gradient tokens generated successfully!");
