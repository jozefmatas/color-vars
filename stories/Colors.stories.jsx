import React from "react";
import "../build/css/variables.css";

// --- Primitive Colors ---
const primitiveColors = {
  neutral: {
    white: "#ffffff",
    100: "#f7f6f5",
    200: "#edece8",
    300: "#dcd9d1",
    400: "#cac5ba",
    500: "#989285",
    600: "#6c685e",
    700: "#4d4a42",
    800: "#21201c",
  },
  brand: {
    100: "#f2f7f6",
    200: "#e6efee",
    300: "#cddedc",
    400: "#b5cecb",
    500: "#78a6a1",
    600: "#507b77",
    700: "#395754",
    800: "#172422",
  },
  accent: {
    sage: {
      100: "#f5f6f3",
      200: "#eceee7",
      300: "#d8dcce",
      400: "#c7cdb9",
      500: "#97a17c",
      600: "#6d7655",
      700: "#4c523c",
      800: "#20231a",
    },
    desert: {
      100: "#fbf4ef",
      200: "#f7eadf",
      300: "#eed5bd",
      400: "#e6c09d",
      500: "#c58e59",
      600: "#8e643c",
      700: "#65472a",
      800: "#2b1e12",
    },
    thistle: {
      100: "#f8f3f4",
      200: "#f0e6e8",
      300: "#dfcdd1",
      400: "#cfb4bb",
      500: "#a37b85",
      600: "#73585f",
      700: "#513d42",
      800: "#221a1c",
    },
    periwinkle: {
      100: "#f2f3fa",
      200: "#e1e4f3",
      300: "#c4cbe7",
      400: "#a7b2dc",
      500: "#7a82a4",
      600: "#575c73",
      700: "#3e4151",
      800: "#1a1b23",
    },
    mist: {
      100: "#f0f5f9",
      200: "#e2ecf3",
      300: "#c5dbe8",
      400: "#a8c9dd",
      500: "#7795a5",
      600: "#556a76",
      700: "#3b4a54",
      800: "#191f23",
    },
  },
  utility: {
    green: {
      100: "#f4f7f1",
      200: "#ebf1e5",
      300: "#d6e2ca",
      400: "#c1d4af",
      500: "#90b16f",
      600: "#668547",
      700: "#485e32",
      800: "#1d2714",
    },
    yellow: {
      100: "#f9f6f0",
      200: "#f5efe0",
      300: "#eadec2",
      400: "#e0cda3",
      500: "#c6a457",
      600: "#b2851c",
      700: "#7c5c13",
      800: "#352708",
    },
    red: {
      100: "#faf2ef",
      200: "#f5e4e0",
      300: "#ecc8c0",
      400: "#e2ada0",
      500: "#cb6c54",
      600: "#9d442d",
      700: "#6f3020",
      800: "#2e130d",
    },
  },
};

// --- Semantic Colors ---
const semanticColors = {
  content: {
    description: "Text and content colors",
    neutral: {
      description: "Neutral content colors for general text",
      colors: {
        "$content-neutral-default": {
          value: "#4d4a42", // $neutral-800
          description: "Default text color for general content"
        },
        "$content-neutral-muted": {
          value: "#6c685e", // $neutral-600
          description: "Muted text color for secondary content"
        },
        "$content-neutral-disabled": {
          value: "#cac5ba", // $neutral-400
          description: "Text color for disabled states"
        },
        "$content-neutral-on-surface": {
          value: "#4d4a42", // $neutral-700
          description: "Text color for content on colored surfaces"
        },
        "$content-neutral-disabled-on-surface": {
          value: "#989285", // $neutral-500
          description: "Disabled text color on colored surfaces"
        }
      }
    },
    colorful: {
      description: "Brand and accent content colors",
      colors: {
        "$content-colorful-default-brand": {
          value: "#395754", // $brand-700
          description: "Brand text color for primary content"
        },
        "$content-colorful-default-sage": {
          value: "#4c523c", // $accent-sage-700
          description: "Sage accent text color"
        },
        "$content-colorful-default-desert": {
          value: "#65472a", // $accent-desert-700
          description: "Desert accent text color"
        },
        "$content-colorful-default-thistle": {
          value: "#513d42", // $accent-thistle-700
          description: "Thistle accent text color"
        },
        "$content-colorful-default-periwinkle": {
          value: "#3e4151", // $accent-periwinkle-700
          description: "Periwinkle accent text color"
        },
        "$content-colorful-default-mist": {
          value: "#3b4a54", // $accent-mist-700
          description: "Mist accent text color"
        }
      }
    },
    utility: {
      description: "Status and feedback content colors",
      colors: {
        "$content-utility-success": {
          value: "#485e32", // $utility-green-700
          description: "Text color for success states"
        },
        "$content-utility-warning": {
          value: "#7c5c13", // $utility-yellow-700
          description: "Text color for warning states"
        },
        "$content-utility-danger": {
          value: "#6f3020", // $utility-red-700
          description: "Text color for error states"
        }
      }
    }
  },
  background: {
    description: "Background colors for different components and states",
    neutral: {
      description: "Neutral background colors for general use",
      colors: {
        "$background-neutral-base": {
          value: "#ffffff", // $neutral-white
          description: "Base background color"
        },
        "$background-neutral-raised": {
          value: "#f7f6f5", // $neutral-100
          description: "Used for slightly elevated surfaces"
        },
        "$background-neutral-layer": {
          value: "#edece8", // $neutral-200
          description: "Used for distinct surface layers"
        },
        "$background-neutral-hover": {
          value: "#dcd9d1", // $neutral-300
          description: "Background color for hover states"
        },
        "$background-neutral-inverse": {
          value: "#21201c", // $neutral-800
          description: "Used for inverse/dark surfaces"
        }
      }
    },
    buttons: {
      description: "Background colors for different button variants and states",
      colors: {
        "$background-button-primary-default": {
          value: "#21201c", // $neutral-800
          description: "Default state for primary buttons"
        },
        "$background-button-primary-hover": {
          value: "#4d4a42", // $neutral-700
          description: "Hover state for primary buttons"
        },
        "$background-button-primary-pressed": {
          value: "#4d4a42", // $neutral-700
          description: "Pressed state for primary buttons"
        },
        "$background-button-secondary-default": {
          value: "#edece8", // $neutral-200
          description: "Default state for secondary buttons"
        },
        "$background-button-secondary-hover": {
          value: "#dcd9d1", // $neutral-300
          description: "Hover state for secondary buttons"
        },
        "$background-button-secondary-pressed": {
          value: "#dcd9d1", // $neutral-300
          description: "Pressed state for secondary buttons"
        },
        "$background-button-danger-default": {
          value: "#f5e4e0", // $utility-red-200
          description: "Default state for danger buttons"
        },
        "$background-button-danger-hover": {
          value: "#ecc8c0", // $utility-red-300
          description: "Hover state for danger buttons"
        },
        "$background-button-danger-pressed": {
          value: "#ecc8c0", // $utility-red-300
          description: "Pressed state for danger buttons"
        }
      }
    },
    colorful: {
      description: "Brand and accent background colors",
      colors: {
        "$background-colorful-default-brand": {
          value: "#e6efee", // $brand-200
          description: "Primary brand background color"
        },
        "$background-colorful-default-sage": {
          value: "#eceee7", // $accent-sage-200
          description: "Sage accent background color"
        },
        "$background-colorful-default-desert": {
          value: "#f7eadf", // $accent-desert-200
          description: "Desert accent background color"
        },
        "$background-colorful-default-thistle": {
          value: "#f0e6e8", // $accent-thistle-200
          description: "Thistle accent background color"
        },
        "$background-colorful-default-periwinkle": {
          value: "#e1e4f3", // $accent-periwinkle-200
          description: "Periwinkle accent background color"
        },
        "$background-colorful-default-mist": {
          value: "#e2ecf3", // $accent-mist-200
          description: "Mist accent background color"
        },
        "$background-colorful-inverse-brand": {
          value: "#507b77", // $brand-600
          description: "Inverse brand background color"
        },
        "$background-colorful-inverse-sage": {
          value: "#6d7655", // $accent-sage-600
          description: "Inverse sage background color"
        },
        "$background-colorful-inverse-desert": {
          value: "#8e643c", // $accent-desert-600
          description: "Inverse desert background color"
        },
        "$background-colorful-inverse-thistle": {
          value: "#73585f", // $accent-thistle-600
          description: "Inverse thistle background color"
        },
        "$background-colorful-inverse-periwinkle": {
          value: "#575c73", // $accent-periwinkle-600
          description: "Inverse periwinkle background color"
        },
        "$background-colorful-inverse-mist": {
          value: "#556a76", // $accent-mist-600
          description: "Inverse mist background color"
        }
      }
    },
    utility: {
      description: "Status and feedback background colors",
      colors: {
        "$background-utility-success": {
          value: "#ebf1e5", // $utility-green-200
          description: "Used for success states and indicators"
        },
        "$background-utility-warning": {
          value: "#f5efe0", // $utility-yellow-200
          description: "Used for warning states and indicators"
        },
        "$background-utility-danger": {
          value: "#f5e4e0", // $utility-red-200
          description: "Used for error states and indicators"
        }
      }
    }
  },
  border: {
    description: "Border colors for different components and states",
    base: {
      description: "Default border colors for general use",
      colors: {
        "$border-base": {
          value: "#edece8", // $neutral-200
          description: "Default border color for general elements"
        }
      }
    },
    input: {
      description: "Border colors for form input states",
      colors: {
        "$border-input-default": {
          value: "#989285", // $neutral-500
          description: "Default border color for input fields"
        },
        "$border-input-selected": {
          value: "#395754", // $brand-700
          description: "Border color for selected/focused input fields"
        },
        "$border-input-assistive": {
          value: "#e6efee", // $brand-200
          description: "Border color for assisted/helper states"
        },
        "$border-input-danger": {
          value: "#9d442d", // $utility-red-600
          description: "Border color for error states"
        },
        "$border-input-muted": {
          value: "#dcd9d1", // $neutral-300
          description: "Border color for muted/disabled states"
        }
      }
    }
  }
};

// --- Color Swatch Components ---
const ColorSwatch = ({ name, value, description }) => (
  <div style={{ margin: "10px", display: "inline-block", width: "220px" }}>
    <div
      style={{
        width: "100%",
        height: "80px",
        background: value,
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    />
    <div style={{ fontSize: "14px" }}>
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div style={{ color: "#666", fontFamily: "monospace" }}>{value}</div>
      {description && (
        <div style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>
          {description}
        </div>
      )}
    </div>
  </div>
);

const ColorGroup = ({ title, description, colors }) => (
  <div style={{ marginBottom: "40px" }}>
    <h2
      style={{
        marginBottom: description ? "8px" : "20px",
        color: "#333",
        borderBottom: "1px solid #eee",
        paddingBottom: "8px",
      }}
    >
      {title}
    </h2>
    {description && (
      <p
        style={{
          color: "#666",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        {description}
      </p>
    )}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {Object.entries(colors).map(([name, data]) => (
        <ColorSwatch
          key={name}
          name={name}
          value={data.value || data}
          description={data.description}
        />
      ))}
    </div>
  </div>
);

const GradientSwatch = ({ name, value }) => (
  <div style={{ margin: "10px", display: "inline-block", width: "220px" }}>
    <div
      style={{
        width: "100%",
        height: "80px",
        background: value,
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    />
    <div style={{ fontSize: "14px" }}>
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div style={{ color: "#666", fontFamily: "monospace" }}>{value}</div>
    </div>
  </div>
);

const GradientGroup = ({ title, gradients }) => (
  <div style={{ marginBottom: "40px" }}>
    <h2
      style={{
        marginBottom: "20px",
        color: "#333",
        borderBottom: "1px solid #eee",
        paddingBottom: "8px",
      }}
    >
      {title}
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {Object.entries(gradients).map(([name, value]) => (
        <GradientSwatch key={name} name={name} value={value} />
      ))}
    </div>
  </div>
);

// --- Main Colors Story ---
const gradients = {
  "Gradient/Body/Green": "linear-gradient(180deg, #ebf1e5 0%, #ffffff 100%)", // $utility-green-200, $neutral-white
  "Gradient/Body/Yellow": "linear-gradient(180deg, #f5efe0 0%, #ffffff 100%)", // $utility-yellow-200, $neutral-white
  "Gradient/Body/Red": "linear-gradient(180deg, #f5e4e0 0%, #ffffff 100%)", // $utility-red-200, $neutral-white
};

const meta = {
  title: "Design System/Colors",
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const PrimitiveColors = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "40px", color: "#333" }}>Primitive Colors</h1>
      {/* Neutral */}
      <ColorGroup
        key="neutral"
        title="Neutral"
        colors={primitiveColors.neutral}
      />
      {/* Brand */}
      <ColorGroup
        key="brand"
        title="Brand"
        colors={primitiveColors.brand}
      />
      {/* Accent (nested: sage, desert, thistle, periwinkle, mist) */}
      {Object.entries(primitiveColors.accent).map(([accentName, accentShades]) => (
        <ColorGroup
          key={`accent-${accentName}`}
          title={`Accent ${accentName.charAt(0).toUpperCase() + accentName.slice(1)}`}
          colors={accentShades}
        />
      ))}
      {/* Utility (nested: green, yellow, red) */}
      {Object.entries(primitiveColors.utility).map(([utilityName, utilityShades]) => (
        <ColorGroup
          key={`utility-${utilityName}`}
          title={`Utility ${utilityName.charAt(0).toUpperCase() + utilityName.slice(1)}`}
          colors={utilityShades}
        />
      ))}
    </div>
  ),
};

export const SemanticColors = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "40px", color: "#333" }}>Semantic Colors</h1>
      <h3 style={{ margin: "20px 0 10px 0" }}>Content</h3>
      {Object.entries(semanticColors.content)
        .filter(([_, data]) => typeof data === "object" && data.colors)
        .map(([category, data]) => (
          <ColorGroup
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Content`}
            description={data.description}
            colors={data.colors}
          />
        ))}
      <h3 style={{ margin: "40px 0 10px 0" }}>Background</h3>
      {Object.entries(semanticColors.background)
        .filter(([_, data]) => typeof data === "object" && data.colors)
        .map(([category, data]) => (
          <ColorGroup
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Background`}
            description={data.description}
            colors={data.colors}
          />
        ))}
      <h3 style={{ margin: "40px 0 10px 0" }}>Border</h3>
      {Object.entries(semanticColors.border)
        .filter(([_, data]) => typeof data === "object" && data.colors)
        .map(([category, data]) => (
          <ColorGroup
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Borders`}
            description={data.description}
            colors={data.colors}
          />
        ))}
    </div>
  ),
};

export const Gradients = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "40px", color: "#333" }}>Gradients</h1>
      <GradientGroup title="Body Gradients" gradients={gradients} />
    </div>
  ),
}; 