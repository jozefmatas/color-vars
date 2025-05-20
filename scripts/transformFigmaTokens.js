const fs = require("fs");
const path = require("path");

// Read Figma variables file
const variablesPath = path.join(__dirname, "../tokens/figma-variables.json");
const variables = JSON.parse(fs.readFileSync(variablesPath, "utf8"));

// Transform color tokens
function transformColors(variables) {
  const colors = variables.colors.mode1;
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

  // Process neutral colors
  Object.entries(colors).forEach(([key, value]) => {
    if (key.startsWith("neutral")) {
      const scale = key.replace("neutral", "").toLowerCase();
      result.color.neutral[scale] = { value };
    }
  });

  // Process brand colors
  Object.entries(colors).forEach(([key, value]) => {
    if (key.startsWith("brand")) {
      const scale = key.replace("brand", "").toLowerCase();
      result.color.brand[scale] = { value };
    }
  });

  // Process accent colors
  const accentTypes = ["sage", "desert", "thistle", "periwinkle", "mist"];
  accentTypes.forEach((type) => {
    Object.entries(colors).forEach(([key, value]) => {
      if (
        key.startsWith(`accent${type.charAt(0).toUpperCase() + type.slice(1)}`)
      ) {
        const scale = key
          .replace(`accent${type.charAt(0).toUpperCase() + type.slice(1)}`, "")
          .toLowerCase();
        result.color.accent[type][scale] = { value };
      }
    });
  });

  // Process utility colors
  const utilityTypes = ["green", "yellow", "red"];
  utilityTypes.forEach((type) => {
    Object.entries(colors).forEach(([key, value]) => {
      if (
        key.startsWith(`utility${type.charAt(0).toUpperCase() + type.slice(1)}`)
      ) {
        const scale = key
          .replace(`utility${type.charAt(0).toUpperCase() + type.slice(1)}`, "")
          .toLowerCase();
        result.color.utility[type][scale] = { value };
      }
    });
  });

  return result;
}

// Transform semantic tokens
function transformSemanticTokens(variables) {
  const colors = variables.colors.mode1;
  const result = {
    color: {
      content: {
        neutral: {
          default: { value: "{color.neutral.800.value}" },
          muted: { value: "{color.neutral.600.value}" },
          disabled: { value: "{color.neutral.400.value}" },
          onSurface: { value: "{color.neutral.700.value}" },
          disabledOnSurface: { value: "{color.neutral.500.value}" },
        },
        colorful: {
          default: {
            brand: { value: "{color.brand.700.value}" },
            sage: { value: "{color.accent.sage.700.value}" },
            desert: { value: "{color.accent.desert.700.value}" },
            thistle: { value: "{color.accent.thistle.700.value}" },
            periwinkle: { value: "{color.accent.periwinkle.700.value}" },
            mist: { value: "{color.accent.mist.700.value}" },
          },
        },
        utility: {
          danger: { value: "{color.utility.red.700.value}" },
          warning: { value: "{color.utility.yellow.700.value}" },
          success: { value: "{color.utility.green.700.value}" },
        },
      },
      background: {
        neutral: {
          base: { value: "{color.neutral.white.value}" },
          raised: { value: "{color.neutral.100.value}" },
          layer: { value: "{color.neutral.200.value}" },
          hover: { value: "{color.neutral.300.value}" },
          inverse: { value: "{color.neutral.800.value}" },
        },
        colorful: {
          default: {
            brand: { value: "{color.brand.200.value}" },
            sage: { value: "{color.accent.sage.200.value}" },
            desert: { value: "{color.accent.desert.200.value}" },
            thistle: { value: "{color.accent.thistle.200.value}" },
            periwinkle: { value: "{color.accent.periwinkle.200.value}" },
            mist: { value: "{color.accent.mist.200.value}" },
          },
          inverse: {
            brand: { value: "{color.brand.600.value}" },
            sage: { value: "{color.accent.sage.600.value}" },
            desert: { value: "{color.accent.desert.600.value}" },
            thistle: { value: "{color.accent.thistle.600.value}" },
            periwinkle: { value: "{color.accent.periwinkle.600.value}" },
            mist: { value: "{color.accent.mist.600.value}" },
          },
        },
        utility: {
          success: { value: "{color.utility.green.200.value}" },
          warning: { value: "{color.utility.yellow.200.value}" },
          danger: { value: "{color.utility.red.200.value}" },
        },
        button: {
          primary: {
            default: { value: "{color.neutral.800.value}" },
            hover: { value: "{color.neutral.700.value}" },
            pressed: { value: "{color.neutral.700.value}" },
          },
          secondary: {
            default: { value: "{color.neutral.200.value}" },
            hover: { value: "{color.neutral.300.value}" },
            pressed: { value: "{color.neutral.300.value}" },
          },
          danger: {
            default: { value: "{color.utility.red.200.value}" },
            hover: { value: "{color.utility.red.300.value}" },
            pressed: { value: "{color.utility.red.300.value}" },
          },
        },
        gradient: {
          green: {
            start: { value: "{color.utility.green.200.value}" },
            end: { value: "{color.neutral.white.value}" },
          },
          yellow: {
            start: { value: "{color.utility.yellow.200.value}" },
            end: { value: "{color.neutral.white.value}" },
          },
          red: {
            start: { value: "{color.utility.red.200.value}" },
            end: { value: "{color.neutral.white.value}" },
          },
        },
      },
      border: {
        base: { value: "{color.neutral.200.value}" },
        input: {
          default: { value: "{color.neutral.500.value}" },
          selected: { value: "{color.brand.700.value}" },
          assistive: { value: "{color.brand.200.value}" },
          danger: { value: "{color.utility.red.600.value}" },
          muted: { value: "{color.neutral.300.value}" },
        },
      },
    },
  };

  return result;
}

// Transform gradient tokens
function transformGradients(variables) {
  const result = {
    gradient: {
      body: {
        green: {
          value:
            "linear-gradient(180deg, {color.background.gradient.green.start.value} 0%, {color.background.gradient.green.end.value} 100%)",
        },
        yellow: {
          value:
            "linear-gradient(180deg, {color.background.gradient.yellow.start.value} 0%, {color.background.gradient.yellow.end.value} 100%)",
        },
        red: {
          value:
            "linear-gradient(180deg, {color.background.gradient.red.start.value} 0%, {color.background.gradient.red.end.value} 100%)",
        },
      },
    },
  };

  return result;
}

// Generate primitives.json
const colorTokens = transformColors(variables);
fs.writeFileSync(
  path.join(__dirname, "../tokens/colors/primitives.json"),
  JSON.stringify(colorTokens, null, 2)
);

// Generate semantic.json
const semanticTokens = transformSemanticTokens(variables);
fs.writeFileSync(
  path.join(__dirname, "../tokens/colors/semantic.json"),
  JSON.stringify(semanticTokens, null, 2)
);

// Generate gradients.json
const gradientTokens = transformGradients(variables);
fs.writeFileSync(
  path.join(__dirname, "../tokens/gradients/primitives.json"),
  JSON.stringify(gradientTokens, null, 2)
);

console.log("Color and gradient tokens generated successfully!");
