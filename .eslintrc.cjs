// TODO: Convert to ESLint flat config (tried in eslint.config.js.experimental)
const fs = require('fs')
const path = require('path')

function searchForTsconfig(directory) {
  const absDir = path.resolve(directory)

  const file = path.join(absDir, 'tsconfig.json')
  if (fs.existsSync(file)) {
    return file
  }

  if (absDir === '/') {
    return null
  }

  const parentDir = path.dirname(absDir)
  return searchForTsconfig(parentDir)
}

// ESlint config require tsconfig file, so we need to find it upwards
const tsconfigPath = searchForTsconfig(process.cwd())

// If files is in a nextjs project or not
// const isNextJsProject = fs.existsSync('next.config.js');
// const nextJsOrEmptyExtends = isNextJsProject ? ['plugin:@next/next/core-web-vitals'] : [];

const coreExtends = [
  'eslint:recommended',
  'plugin:import/recommended',
  'plugin:promise/recommended',
  'plugin:no-use-extend-native/recommended',
  'plugin:security/recommended-legacy',
  // 'plugin:jsdoc/recommended-typescript', // TODO: To be added later
  // 'plugin:unicorn/recommended', // TODO: To be added later
  'plugin:eslint-comments/recommended',
]

const theLastExtend = 'plugin:prettier/recommended' // Always the last: https://github.com/prettier/eslint-plugin-prettier#recommended-configuration

const typescriptExtends = [
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:deprecation/recommended',
]

const reactExtends = [
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
]

const reactPlugins = ['react-refresh']

const reactRules = {
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
}

module.exports = {
  root: true,
  extends: [...coreExtends, theLastExtend],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: ['import', 'no-relative-import-paths', 'filenames', 'no-only-tests'],
  rules: {
    'import/no-unresolved': 'error',
    'no-relative-import-paths/no-relative-import-paths': ['warn', { allowSameFolder: true }],
    'filenames/match-exported': 2,
    'filenames/no-index': 2,
    // 'unicorn/better-regex': 'warn',
    // 'unicorn/filename-case': [
    //   'error',
    //   {
    //     cases: {
    //       kebabCase: true,
    //       pascalCase: true,
    //     }
    //   }
    // ],
    'no-only-tests/no-only-tests': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true,
    },
    'react': {
      version: 'detect',
    },
  },
  globals: {},
  env: {
    es6: true,
    es2016: true,
    es2017: true,
    es2018: true,
    es2019: true,
    es2020: true,
    es2021: true,
    es2022: true,
    browser: true,
    commonjs: true,
    node: true,
    worker: true,
    serviceworker: true,
    webextensions: true,
  },
  overrides: [
    // JSON
    {
      files: ['**/*.json'],
      extends: ['plugin:json/recommended', theLastExtend],
    },
    // Typescript React
    {
      files: ['**/*.tsx'],
      extends: [...typescriptExtends, ...reactExtends, theLastExtend],
      plugins: [...reactPlugins],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsconfigPath,
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        ...reactRules,
      },
    },
    // Typescript
    {
      files: ['**/*.ts'],
      extends: [...typescriptExtends, theLastExtend],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsconfigPath,
      },
    },
    // Javascript React
    {
      files: ['**/*.jsx'],
      extends: [...reactExtends, theLastExtend],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        ...reactRules,
      },
    },
    // TODO: Add config for test files
    // {
    //   files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    //   excludedFiles: ['**/cypress/**/*'],
    //   extends: [
    //     'plugin:testing-library/react',
    //     'plugin:testing-library/dom',
    //     'plugin:jest-dom/recommended',
    //     'plugin:jest/recommended',
    //     'plugin:jest-formatting/recommended',
    //   ],
    //   rules: {
    //     'jest/no-conditional-expect': [0],
    //   },
    //   env: {
    //     'jest': true,
    //     'jest/globals': true,
    //   },
    // },
  ],
}
