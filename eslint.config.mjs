import jsdoc from 'eslint-plugin-jsdoc';
import regexp from 'eslint-plugin-regexp';
import globals from 'globals';
import neostandard, { plugins as neostdplugins } from 'neostandard';

export default [
  ...neostandard({
    semi: true
  }),
  jsdoc.configs['flat/recommended'],
  regexp.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      '@stylistic': neostdplugins['@stylistic'],
      regexp
    },
    rules: {
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never'
      }],
      'import-x/order': ['error', {
        alphabetize: {
          order: 'ignore',
          caseInsensitive: false
        }
      }],
      'no-await-in-loop': 'error',
      'no-use-before-define': ['error', {
        allowNamedExports: false,
        classes: true,
        functions: true,
        variables: true
      }]
    }
  }
];
