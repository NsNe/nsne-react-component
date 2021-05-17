import { defineConfig } from 'dumi';
const pkg = require('./package.json');

export default defineConfig({
  title: 'nsne-react-component',
  // favicon: '',
  // logo: '',
  outputPath: 'docs-dist',
  antd: {},
  publicPath: `/${pkg.name}/`,
  base: `/${pkg.name}/`,
  // more config: https://d.umijs.org/config
});
