import importX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import regexp from 'eslint-plugin-regexp';
import neostandard, { plugins as neostdplugins } from 'neostandard';
import globals from 'globals';

export default [
  {
    ignores: ['src/lib', 'src/web-ext-config.cjs']
  },
  jsdoc.configs['flat/recommended'],
  regexp.configs['flat/recommended'],
  ...neostandard({
    semi: true
  }),
  {
    plugins: {
      '@stylistic': neostdplugins['@stylistic'],
      'import-x': importX,
      regexp
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
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
