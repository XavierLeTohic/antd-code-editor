import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src'],
    },
    tsconfigPath: './tsconfig.json',
    alias: {
      'types': './src/types/*',
      'components': './src/components/*',
      'contexts': './src/contexts/*',
      'constants': './src/constants/*',
    }
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: "esm",
      mode: process.env.NODE_ENV === 'development' ? 'development' : 'production'
    },
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact(),
  ],
});
