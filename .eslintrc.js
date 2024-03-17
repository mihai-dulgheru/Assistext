module.exports = {
  root: true,
  extends: ['eslint:recommended', '@react-native', 'plugin:react-native/all'],
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'react-native/no-color-literals': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-unused-styles': 2,
    'react-native/sort-styles': 2,
    'react-native/split-platform-components': 2,
  },
};
