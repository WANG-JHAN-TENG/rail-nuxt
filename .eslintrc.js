module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-tabs': 0,
    'space-in-parens': ['error', 'always'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-unresolved': [2, { ignore: ['js'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'ignorePackages',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
