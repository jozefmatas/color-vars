const StyleDictionary = require("style-dictionary");

// Register the custom filter for CSS primitive colors
StyleDictionary.registerFilter({
  name: "isCssPrimitiveColor",
  matcher: function (token) {
    return (
      (token.type === "color" || token.path[0] === "color") &&
      typeof token.value === "string" &&
      token.value.startsWith("#")
    );
  },
});

// Load the minimal config and build all platforms
const StyleDictionaryCss = StyleDictionary.extend("./config.css.json");
StyleDictionaryCss.buildAllPlatforms();

console.log("CSS variables built from primitive color tokens!");
