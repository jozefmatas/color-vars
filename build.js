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
    const isPrimitive =
      token.original.value && token.original.value.startsWith("#");
    return isColor && isPrimitive;
  },
});

// Custom filter for semantic colors
StyleDictionary.registerFilter({
  name: "isSemanticColor",
  matcher: function (token) {
    const isColor = token.type === "color" || token.path[0] === "color";
    const isSemantic =
      token.original.value && !token.original.value.startsWith("#");
    return isColor && isSemantic;
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

const sd = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/colors/",
      files: [
        {
          destination: "_primitives.scss",
          filter: "isPrimitiveColor",
          format: "scss/variables-primitive",
          options: {
            showFileHeader: false,
            outputReferences: false,
            themeable: false,
          },
        },
        {
          destination: "_colors.scss",
          filter: "isSemanticColor",
          format: "scss/variables-with-comments",
          options: {
            showFileHeader: false,
            outputReferences: true,
            themeable: true,
          },
        },
      ],
    },
  },
});

sd.buildAllPlatforms();
