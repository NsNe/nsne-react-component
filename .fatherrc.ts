export default {
  esm: 'babel',
  cjs: 'babel',
  // 如果开启，就不能生成 ts 类型了
  // disableTypeCheck: true,
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
};
