import React from "react";
import typographyTokens from "../tokens/typography/typography.json";

// Font variables from _fonts.scss
const FONTS = {
  fontFamily: {
    inter: "Inter Variable, sans-serif",
    mackinac: "P22 Mackinac Pro, sans-serif",
    commit: "CommitMono, sans-serif",
  },
  fontWeight: {
    inter: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    mackinac: {
      book: 400,
    },
    commit: {
      regular: 400,
    },
  },
};

// Helper function to resolve font family and weight from token values
const resolveTypographyStyle = (style) => {
  // Extract font family from the token value
  let fontFamily = style.fontFamily;
  if (fontFamily.includes("inter")) {
    fontFamily = FONTS.fontFamily.inter;
  } else if (fontFamily.includes("mackinac")) {
    fontFamily = FONTS.fontFamily.mackinac;
  } else if (fontFamily.includes("commit")) {
    fontFamily = FONTS.fontFamily.commit;
  }

  // Extract font weight from the token value
  let fontWeight = style.fontWeight;
  if (fontWeight.includes("inter")) {
    if (fontWeight.includes("regular")) {
      fontWeight = FONTS.fontWeight.inter.regular;
    } else if (fontWeight.includes("medium")) {
      fontWeight = FONTS.fontWeight.inter.medium;
    } else if (fontWeight.includes("semibold")) {
      fontWeight = FONTS.fontWeight.inter.semibold;
    }
  } else if (fontWeight.includes("mackinac")) {
    fontWeight = FONTS.fontWeight.mackinac.book;
  } else if (fontWeight.includes("commit")) {
    fontWeight = FONTS.fontWeight.commit.regular;
  }

  return {
    ...style,
    fontFamily,
    fontWeight,
  };
};

const TypographyExample = ({ style, label }) => {
  const resolvedStyle = resolveTypographyStyle(style);

  return (
    <div
      style={{
        marginBottom: "2rem",
        maxWidth: "800px",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "0.5rem",
          fontFamily: "monospace",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: resolvedStyle.fontFamily,
          fontSize: resolvedStyle.fontSize,
          fontWeight: resolvedStyle.fontWeight,
          lineHeight: resolvedStyle.lineHeight,
          letterSpacing: resolvedStyle.letterSpacing,
          marginBottom: "0.5rem",
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "#999",
          fontFamily: "monospace",
          padding: "0.5rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        {`${resolvedStyle.fontFamily} | ${resolvedStyle.fontSize} | ${resolvedStyle.fontWeight} | ${resolvedStyle.lineHeight} | ${resolvedStyle.letterSpacing}`}
      </div>
    </div>
  );
};

const SectionHeader = ({ text }) => (
  <h2
    style={{
      fontSize: "28px",
      fontWeight: "600",
      marginTop: "3rem",
      marginBottom: "2rem",
      paddingBottom: "0.5rem",
      borderBottom: "2px solid #eee",
      color: "#222",
    }}
  >
    {text}
  </h2>
);

const FontTypeSection = ({ title, children }) => (
  <div
    style={{
      marginBottom: "4rem",
      padding: "2rem",
      backgroundColor: "#fafafa",
      borderRadius: "8px",
    }}
  >
    <h3
      style={{
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "2rem",
        color: "#333",
        borderBottom: "2px solid #eee",
        paddingBottom: "0.5rem",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

// --- Desktop Typography ---
export const Desktop = () => (
  <div style={{ padding: "2rem" }}>
    <SectionHeader text="Desktop Typography" />

    {/* Serif Typography */}
    <FontTypeSection title="Serif Typography (Mackinac)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.desktop.heading.serif).map(
        ([key, value]) => (
          <TypographyExample
            key={`serif-${key}`}
            style={value.value}
            label={`Desktop Serif Heading ${key}`}
          />
        )
      )}
    </FontTypeSection>

    {/* Sans Typography */}
    <FontTypeSection title="Sans Typography (Inter)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.desktop.heading.sans).map(
        ([key, value]) => (
          <TypographyExample
            key={`sans-${key}`}
            style={value.value}
            label={`Desktop Sans Heading ${key}`}
          />
        )
      )}

      <SectionHeader text="Body Text" />
      {Object.entries(typographyTokens.scale.desktop.body.sans).map(
        ([key, value]) => (
          <React.Fragment key={`body-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Desktop Body ${key} Regular`}
            />
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Desktop Body ${key} Heavy`}
              />
            )}
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Desktop Body ${key} Medium`}
              />
            )}
          </React.Fragment>
        )
      )}

      <SectionHeader text="Labels" />
      {Object.entries(typographyTokens.scale.desktop.label.sans).map(
        ([key, value]) => (
          <React.Fragment key={`label-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Desktop Label ${key} Regular`}
            />
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Desktop Label ${key} Medium`}
              />
            )}
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Desktop Label ${key} Heavy`}
              />
            )}
          </React.Fragment>
        )
      )}
    </FontTypeSection>

    {/* Mono Typography */}
    <FontTypeSection title="Mono Typography (Commit)">
      <SectionHeader text="Body Text" />
      <TypographyExample
        style={typographyTokens.scale.desktop.body.mono["400"].value}
        label="Desktop Mono Body"
      />
      <SectionHeader text="Labels" />
      <TypographyExample
        style={typographyTokens.scale.desktop.label.mono["400"].value}
        label="Desktop Mono Label"
      />
    </FontTypeSection>
  </div>
);

// --- Tablet Typography ---
export const Tablet = () => (
  <div style={{ padding: "2rem" }}>
    <SectionHeader text="Tablet Typography" />

    {/* Serif Typography */}
    <FontTypeSection title="Serif Typography (Mackinac)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.tablet.heading.serif).map(
        ([key, value]) => (
          <TypographyExample
            key={`serif-${key}`}
            style={value.value}
            label={`Tablet Serif Heading ${key}`}
          />
        )
      )}
    </FontTypeSection>

    {/* Sans Typography */}
    <FontTypeSection title="Sans Typography (Inter)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.tablet.heading.sans).map(
        ([key, value]) => (
          <TypographyExample
            key={`sans-${key}`}
            style={value.value}
            label={`Tablet Sans Heading ${key}`}
          />
        )
      )}

      <SectionHeader text="Body Text" />
      {Object.entries(typographyTokens.scale.tablet.body.sans).map(
        ([key, value]) => (
          <React.Fragment key={`body-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Tablet Body ${key} Regular`}
            />
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Tablet Body ${key} Heavy`}
              />
            )}
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Tablet Body ${key} Medium`}
              />
            )}
          </React.Fragment>
        )
      )}

      <SectionHeader text="Labels" />
      {Object.entries(typographyTokens.scale.tablet.label.sans).map(
        ([key, value]) => (
          <React.Fragment key={`label-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Tablet Label ${key} Regular`}
            />
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Tablet Label ${key} Medium`}
              />
            )}
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Tablet Label ${key} Heavy`}
              />
            )}
          </React.Fragment>
        )
      )}
    </FontTypeSection>

    {/* Mono Typography */}
    <FontTypeSection title="Mono Typography (Commit)">
      <SectionHeader text="Body Text" />
      <TypographyExample
        style={typographyTokens.scale.tablet.body.mono["400"].value}
        label="Tablet Mono Body"
      />
      <SectionHeader text="Labels" />
      <TypographyExample
        style={typographyTokens.scale.tablet.label.mono["400"].value}
        label="Tablet Mono Label"
      />
    </FontTypeSection>
  </div>
);

// --- Mobile Typography ---
export const Mobile = () => (
  <div style={{ padding: "2rem" }}>
    <SectionHeader text="Mobile Typography" />

    {/* Serif Typography */}
    <FontTypeSection title="Serif Typography (Mackinac)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.mobile.heading.serif).map(
        ([key, value]) => (
          <TypographyExample
            key={`serif-${key}`}
            style={value.value}
            label={`Mobile Serif Heading ${key}`}
          />
        )
      )}
    </FontTypeSection>

    {/* Sans Typography */}
    <FontTypeSection title="Sans Typography (Inter)">
      <SectionHeader text="Headings" />
      {Object.entries(typographyTokens.scale.mobile.heading.sans).map(
        ([key, value]) => (
          <TypographyExample
            key={`sans-${key}`}
            style={value.value}
            label={`Mobile Sans Heading ${key}`}
          />
        )
      )}

      <SectionHeader text="Body Text" />
      {Object.entries(typographyTokens.scale.mobile.body.sans).map(
        ([key, value]) => (
          <React.Fragment key={`body-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Mobile Body ${key} Regular`}
            />
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Mobile Body ${key} Heavy`}
              />
            )}
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Mobile Body ${key} Medium`}
              />
            )}
          </React.Fragment>
        )
      )}

      <SectionHeader text="Labels" />
      {Object.entries(typographyTokens.scale.mobile.label.sans).map(
        ([key, value]) => (
          <React.Fragment key={`label-${key}`}>
            <TypographyExample
              style={value.regular.value}
              label={`Mobile Label ${key} Regular`}
            />
            {value.medium && (
              <TypographyExample
                style={value.medium.value}
                label={`Mobile Label ${key} Medium`}
              />
            )}
            {value.heavy && (
              <TypographyExample
                style={value.heavy.value}
                label={`Mobile Label ${key} Heavy`}
              />
            )}
          </React.Fragment>
        )
      )}
    </FontTypeSection>

    {/* Mono Typography */}
    <FontTypeSection title="Mono Typography (Commit)">
      <SectionHeader text="Body Text" />
      <TypographyExample
        style={typographyTokens.scale.mobile.body.mono["400"].value}
        label="Mobile Mono Body"
      />
      <SectionHeader text="Labels" />
      <TypographyExample
        style={typographyTokens.scale.mobile.label.mono["400"].value}
        label="Mobile Mono Label"
      />
    </FontTypeSection>
  </div>
);

export default {
  title: "Design System/Typography",
  parameters: {
    layout: "padded",
  },
};
