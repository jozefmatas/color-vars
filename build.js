const StyleDictionary = require("style-dictionary");

// Register a custom filter for colors
StyleDictionary.registerFilter({
  name: "isColor",
  matcher: function (token) {
    return token.type === "color" || token.path[0] === "color";
  },
});

// Custom filter for primitive colors
StyleDictionary.registerFilter({
  name: "isPrimitiveColor",
  matcher: function (token) {
    const isColor = token.type === "color" || token.path[0] === "color";
    const value = token.original.value?.value || token.original.value;
    const isPrimitive = typeof value === "string" && value.startsWith("#");
    return isColor && isPrimitive;
  },
});

// Custom filter for semantic colors
StyleDictionary.registerFilter({
  name: "isSemanticColor",
  matcher: function (token) {
    const isColor = token.type === "color" || token.path[0] === "color";
    const value = token.original.value?.value || token.original.value;
    const isSemantic = typeof value === "string" && !value.startsWith("#");
    return isColor && isSemantic;
  },
});

// Register a custom filter for gradients
StyleDictionary.registerFilter({
  name: "isGradient",
  matcher: function (token) {
    return token.type === "gradient" || token.path[0] === "gradient";
  },
});

// Register a custom filter for typography
StyleDictionary.registerFilter({
  name: "isTypography",
  matcher: function (token) {
    return token.type === "typography" || token.path[0] === "scale";
  },
});

// Helper function to remove 'color-' prefix and format path
function formatVariableName(path) {
  // Join the path parts with '-' but skip the first part if it's 'color'
  return path.filter((part) => part !== "color").join("-");
}

// Custom format for SCSS variables with comments
StyleDictionary.registerFormat({
  name: "scss/variables-with-comments",
  formatter: function ({ dictionary }) {
    const groupedTokens = {};

    // Group tokens by their top-level category
    dictionary.allTokens.forEach((token) => {
      const path = token.path;
      const category = path[1]; // e.g., 'content', 'background', 'border'

      if (!groupedTokens[category]) {
        groupedTokens[category] = [];
      }
      groupedTokens[category].push(token);
    });

    // Start with the import statement
    let output = '@import "./primitives";\n\n';

    // Generate SCSS with grouped comments
    output += Object.entries(groupedTokens)
      .map(([category, tokens]) => {
        const categoryComment = `// ------------------------------\n// ${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Tokens\n// ------------------------------`;

        const variables = tokens
          .map((token) => {
            const name = `$${formatVariableName(token.path)}`;
            // Extract the referenced token path and remove 'color' prefix
            const referencedPath = token.original.value
              .replace("{color.", "")
              .replace(".value}", "")
              .split(".");
            const value = `$${formatVariableName(referencedPath)}`;
            const comment = token.comment ? `// ${token.comment}` : "";

            return comment
              ? `${comment}\n${name}: ${value};`
              : `${name}: ${value};`;
          })
          .join("\n\n");

        return `${categoryComment}\n${variables}`;
      })
      .join("\n\n");

    return output;
  },
});

// Custom format for primitive variables
StyleDictionary.registerFormat({
  name: "scss/variables-primitive",
  formatter: function ({ dictionary }) {
    const groupedTokens = {};

    // Group tokens by their category (second path element)
    dictionary.allTokens.forEach((token) => {
      const path = token.path;
      let category;

      // Special handling for nested categories like accent-sage and utility-green
      if (path[1] === "accent" || path[1] === "utility") {
        category = `${path[1]}-${path[2]}`; // e.g., 'accent-sage' or 'utility-green'
      } else {
        category = path[1]; // e.g., 'neutral', 'brand'
      }

      if (!groupedTokens[category]) {
        groupedTokens[category] = [];
      }
      groupedTokens[category].push(token);
    });

    // Sort tokens within each group by their shade number
    Object.values(groupedTokens).forEach((tokens) => {
      tokens.sort((a, b) => {
        const aNum = parseInt(a.path[a.path.length - 1]) || 0;
        const bNum = parseInt(b.path[b.path.length - 1]) || 0;
        return aNum - bNum;
      });
    });

    // Define the desired order of categories
    const categoryOrder = [
      "neutral",
      "brand",
      "accent-sage",
      "accent-desert",
      "accent-thistle",
      "accent-periwinkle",
      "accent-mist",
      "utility-green",
      "utility-yellow",
      "utility-red",
    ];

    // Generate SCSS with grouped comments
    return categoryOrder
      .filter((category) => groupedTokens[category])
      .map((category) => {
        const tokens = groupedTokens[category];
        const categoryName = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const categoryComment = `// ------------------------------\n// ${categoryName} Colors\n// ------------------------------`;

        const variables = tokens
          .map((token) => {
            const name = `$${formatVariableName(token.path)}`;
            return `${name}: ${token.value};`;
          })
          .join("\n");

        return `${categoryComment}\n${variables}`;
      })
      .join("\n\n");
  },
});

// Custom format for gradient variables
StyleDictionary.registerFormat({
  name: "scss/variables-gradient",
  formatter: function ({ dictionary }) {
    const gradients = dictionary.allTokens;

    // Start with the import statement
    let output = '@import "./primitives";\n\n';

    // Add a section comment
    output += "// ------------------------------\n";
    output += "// Gradient Tokens\n";
    output += "// ------------------------------\n";

    // Helper function to find primitive variable for a hex color
    function findPrimitiveVariable(hex) {
      // Create a map of hex values to variable names
      const colorMap = {
        "#ebf1e5": "$utility-green-200",
        "#f5efe0": "$utility-yellow-200",
        "#f5e4e0": "$utility-red-200",
        "#ffffff": "$neutral-white",
      };

      return colorMap[hex.toLowerCase()] || hex;
    }

    // Generate SCSS with variable references
    output += gradients
      .map((token) => {
        const name = `$${formatVariableName(token.path)}`;
        // Replace hex values with SCSS variable references
        const value = token.value.replace(
          /#[a-fA-F0-9]{6}/gi,
          findPrimitiveVariable
        );
        return `${name}: ${value};`;
      })
      .join("\n\n");

    return output;
  },
});

// Custom format for typography mixins
StyleDictionary.registerFormat({
  name: "scss/typography-mixins",
  formatter: function ({ dictionary }) {
    const tokens = dictionary.allTokens;
    // Add the fonts import at the top
    let output = '// AUTO-GENERATED FILE. DO NOT EDIT.\n@import "./fonts";\n\n';

    // Map font families to their variables
    const fontFamilyMap = {
      "Inter Variable, sans-serif": "$fontFamily-inter",
      "P22 Mackinac Pro, sans-serif": "$fontFamily-mackinac",
      "CommitMono, sans-serif": "$fontFamily-commit",
    };

    // Map font weights to their variables
    const fontWeightMap = {
      400: {
        "Inter Variable, sans-serif": "$fontWeight-inter-regular",
        "P22 Mackinac Pro, sans-serif": "$fontWeight-mackinac-book",
        "CommitMono, sans-serif": "$fontWeight-commit-regular",
      },
      500: {
        "Inter Variable, sans-serif": "$fontWeight-inter-medium",
      },
      600: {
        "Inter Variable, sans-serif": "$fontWeight-inter-semibold",
      },
    };

    // Helper function to resolve references
    function resolveReference(val, currentToken) {
      if (typeof val !== "string") return val;

      // Handle font family
      if (fontFamilyMap[val]) {
        return fontFamilyMap[val];
      }

      // Handle font weight (needs context of font family)
      if (currentToken.value.fontFamily && fontWeightMap[val]) {
        const family = currentToken.value.fontFamily;
        if (fontWeightMap[val][family]) {
          return fontWeightMap[val][family];
        }
      }

      // For other values (fontSize, lineHeight, etc.), just return as is
      return val;
    }

    // Generate mixin and class for each typography token
    tokens.forEach((token) => {
      // Remove 'scale-' from the name
      const name = token.path.join("-").replace("scale-", "");
      const value = token.value;

      // Generate mixin
      let mixin = `@mixin ${name} {\n`;
      if (value.fontFamily)
        mixin += `  font-family: ${resolveReference(value.fontFamily, token)};\n`;
      if (value.fontSize)
        mixin += `  font-size: ${resolveReference(value.fontSize, token)};\n`;
      if (value.fontWeight)
        mixin += `  font-weight: ${resolveReference(value.fontWeight, token)};\n`;
      if (value.lineHeight)
        mixin += `  line-height: ${resolveReference(value.lineHeight, token)};\n`;
      if (value.letterSpacing)
        mixin += `  letter-spacing: ${resolveReference(value.letterSpacing, token)};\n`;
      if (value.textTransform)
        mixin += `  text-transform: ${resolveReference(value.textTransform, token)};\n`;
      mixin += `}\n\n`;

      // Generate class
      mixin += `.${name} { @include ${name}; }\n\n`;

      output += mixin;
    });

    return output;
  },
});

// Update the Style Dictionary configuration
const StyleDictionaryExtended = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transforms: ["attribute/cti", "name/cti/kebab"],
      buildPath: "build/scss/",
      files: [
        {
          destination: "typography/_typography.scss",
          format: "scss/typography-mixins",
          filter: "isTypography",
        },
        {
          destination: "colors/_semantic.scss",
          format: "scss/variables-with-comments",
          filter: "isSemanticColor",
        },
        {
          destination: "colors/_primitives.scss",
          format: "scss/variables-primitive",
          filter: "isPrimitiveColor",
        },
        {
          destination: "gradients/_gradients.scss",
          format: "scss/variables-gradient",
          filter: "isGradient",
        },
      ],
    },
  },
});

// Run the build
StyleDictionaryExtended.buildAllPlatforms();
