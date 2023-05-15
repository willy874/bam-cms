import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config, { configType }) => {
    const CWD = process.cwd()
    config.module!.rules!.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });
    config.module!.rules!.push({
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    });
    config.resolve!.alias = Object.assign({
      '@': path.resolve(CWD, 'packages'),
    }, config.resolve?.alias)
    config.module!.unknownContextCritical = false
    config.performance = {
      hints: false
    }
    return config;
  },
  docs: {
    autodocs: true
  }
};

export default config;
