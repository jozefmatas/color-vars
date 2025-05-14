import "../build/scss/colors/_primitives.scss";
import "../build/scss/colors/_colors.scss";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#FFFFFF",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
    layout: "centered",
  },
};

export default preview;
