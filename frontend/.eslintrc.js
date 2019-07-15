module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [ 
  'react-app',
  'plugin:react/recommended',
  'plugin:prettier/recommended',
  'prettier/@typescript-eslint', 
  'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/indent': ["error", 2],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'curly': 'error',
    'dot-notation': 'error',
    'no-empty-function': 'error',
    'no-multi-spaces': 'error',
  },
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
};
