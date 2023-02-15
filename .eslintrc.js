module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    'default-param-last': 'off',
  },
}
