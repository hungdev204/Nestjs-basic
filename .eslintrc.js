module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base', // Quy tắc từ Airbnb
    'airbnb-typescript/base', // Quy tắc Airbnb cho TypeScript
    'plugin:@typescript-eslint/recommended', // Quy tắc TypeScript
    'plugin:prettier/recommended', // Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Tắt các quy tắc không cần thiết
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Thêm các quy tắc tùy chỉnh
    'import/prefer-default-export': 'off', // Cho phép export named
    'class-methods-use-this': 'off', // Tắt yêu cầu sử dụng `this` trong class methods
    'no-console': 'warn', // Cảnh báo khi sử dụng `console`
    'no-unused-vars': 'warn', // Cảnh báo biến không sử dụng
    '@typescript-eslint/no-unused-vars': 'warn', // Cảnh báo biến không sử dụng trong TypeScript
    'import/extensions': 'off', // Tắt yêu cầu đuôi file khi import
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // Cho phép import devDependencies
  },
};