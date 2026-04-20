import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => ({
    ...options,
    // 某些仓库环境下 Storybook 的默认 babel 配置不会启用 TS 语法解析
    presets: [...(options.presets || []), require.resolve('@babel/preset-typescript')],
  }),
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (cfg) => {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.extensions = cfg.resolve.extensions || ['.ts', '.tsx', '.js', '.jsx'];
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      // Storybook 环境下将 umi 的 useHistory 映射到 react-router-dom(v5)
      umi: require.resolve('react-router-dom'),
      '@': path.resolve(__dirname, '../'),
    };

    cfg.module = cfg.module || { rules: [] };
    cfg.module.rules = cfg.module.rules || [];

    cfg.module.rules.push({
      test: /\.less$/i,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: {
              // 保持 className 不被 hash，兼容代码里硬编码的 class（如 loners-submit-form）
              localIdentName: '[local]',
            },
          },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    return cfg;
  },
};

export default config;
