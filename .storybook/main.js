import path from "path";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    // SCSS handling
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        },
        "sass-loader",
      ],
    });

    // Update JSX handling
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    });

    return config;
  },
};

export default config;
