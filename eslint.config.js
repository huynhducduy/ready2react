import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {fixupConfigRules} from '@eslint/compat'
import {FlatCompat} from '@eslint/eslintrc'
import eslint from '@eslint/js'
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginReact from '@eslint-react/eslint-plugin'
// eslint-disable-next-line import-x/default, import-x/no-named-as-default, import-x/no-named-as-default-member -- import-x error
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginGitignore from 'eslint-config-flat-gitignore'
import pluginCssModules from 'eslint-plugin-css-modules'
import pluginDepend from 'eslint-plugin-depend'
// import pluginDeprecation from 'eslint-plugin-deprecation'
import {plugin as pluginExceptionHandling} from 'eslint-plugin-exception-handling'
import pluginI18next from 'eslint-plugin-i18next'
import pluginImportX from 'eslint-plugin-import-x'
import pluginJestDom from 'eslint-plugin-jest-dom'
import pluginJsonc from 'eslint-plugin-jsonc'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginNoBarrelFiles from 'eslint-plugin-no-barrel-files'
import pluginNoOnlyTests from 'eslint-plugin-no-only-tests'
import pluginNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import pluginNoSecrets from 'eslint-plugin-no-secrets' // TODO: Leave this functionality for another step
// eslint-disable-next-line import-x/default, import-x/no-named-as-default, import-x/no-named-as-default-member -- import-x error
import pluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginPromise from 'eslint-plugin-promise'
// eslint-disable-next-line import-x/default, import-x/no-named-as-default, import-x/no-named-as-default-member -- import-x error
import pluginReactCompiler from 'eslint-plugin-react-compiler'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import * as pluginRegexp from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginSonarjs from 'eslint-plugin-sonarjs'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'
// eslint-disable-next-line import-x/no-unresolved -- import-x error
import tsEslint from 'typescript-eslint'

import {CAMEL_CASE} from './regexes.js'

// If files is in a nextJs project or not
// const isNextJsProject = fs.existsSync('next.config.js');
// const nextJsOrEmptyExtends = isNextJsProject ? ['plugin:@next/next/core-web-vitals'] : [];

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// TODO: add all react-use and other hooks libraries to staticHooks
const reactUseStaticHooks = {
  useUpdate: true,
}

// TODO: add all react-use and other hooks libraries to additionalHooks
const reactUseAdditionalHooks = ['useIsomorphicLayoutEffect']

//------------------------------------------------------------------------------

function createApplyTo(include, exclude = []) {
  return function (name, config) {
    if (Array.isArray(config)) {
      if (config.length > 1) {
        return config.map((cfg, index) => ({
          ...cfg,
          name: name + '-' + index,
          files: include,
          ignores: exclude,
        }))
      }

      config = config.at(0)
    }

    return [
      {
        ...config,
        name,
        files: include,
        ignores: exclude,
      },
    ]
  }
}

const applyToAll = createApplyTo(['**/*.?(c|m)[jt]s?(x)', '**/*.json?(c|5)'])
const applyToScript = createApplyTo(['**/*.?(c|m)[jt]s?(x)'])
const applyToJson = createApplyTo(
  ['**/*.json'],
  ['**/tsconfig.json', '.vscode/*.json', '.zed/*.json'],
)
const applyToJsonc = createApplyTo(['**/*.jsonc', '.vscode/*.json', '.zed/*.json'])
const applyToJson5 = createApplyTo(['**/*.json5', '**/tsconfig.json'])
const applyToJsonC5 = createApplyTo(['**/*.json?(c|5)'])
const applyToTypescript = createApplyTo(['**/*.?(c|m)ts?(x)'])
const applyToReact = createApplyTo(['**/*.?(c|m)[jt]sx', '**/use*.?(c|m)[jt]s?(x)'])
const applyToJavascriptReact = createApplyTo(['**/*.?(c|m)tsx', '**/use*.?(c|m)js?(x)'])
const applyToTypescriptReact = createApplyTo(['**/*.?(c|m)tsx', '**/use*.?(c|m)ts?(x)'])
const applyToVitest = createApplyTo(
  ['**/__tests__/**/*.?(c|m)[jt]s?(x)', '**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  ['**/cypress/**/*'],
)
const applyToVitestNotReact = createApplyTo(
  ['**/__tests__/**/!(use)*.?(c|m)[jt]s!(x)', '**/!(use)*.{test,spec}.?(c|m)[jt]s!(x)'],
  ['**/cypress/**/*'],
)
const applyToVitestReact = createApplyTo(
  [
    '**/__tests__/**/*.?(c|m)[jt]sx',
    '**/__tests__/**/use*.?(c|m)[jt]s?(x)',
    '**/*.{test,spec}.?(c|m)[jt]sx',
    '**/use*.{test,spec}.?(c|m)[jt]s?(x)',
  ],
  ['**/cypress/**/*'],
)

//------------------------------------------------------------------------------

const coreConfigs = [
  ...applyToAll('core/eslint-recommended', eslint.configs.recommended),
  ...applyToAll('core/security', pluginSecurity.configs.recommended),
  ...applyToAll('core/promise', pluginPromise.configs['flat/recommended']),
  ...applyToAll('core/import-x', ...compat.config(pluginImportX.configs.recommended)),
  ...applyToAll('core/no-use-extend-native', pluginNoUseExtendNative.configs.recommended),
  ...applyToAll('core/eslint-comments', {
    ...pluginEslintComments.configs.recommended,
    // workaround for https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/215
    plugins: {
      '@eslint-community/eslint-comments': pluginEslintComments,
    },
  }),
  ...applyToAll('core/regexp', pluginRegexp.configs['flat/recommended']),
  ...applyToAll(
    'core/ssr-friendly',
    fixupConfigRules(compat.extends('plugin:ssr-friendly/recommended')),
  ),
  ...applyToAll('core/depend', pluginDepend.configs['flat/recommended']),
  ...applyToAll('core/sonarjs', pluginSonarjs.configs.recommended), // drop this if using SonarQube or SonarCloud in favor of the IDE extension
  ...applyToAll('core/no-relative-import-paths', {
    plugins: {
      'no-relative-import-paths': pluginNoRelativeImportPaths,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {allowSameFolder: true, rootDir: 'src', prefix: '@'},
      ],
    },
  }),
  ...applyToAll('core/simple-import-sort', {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'sort-imports': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
  ...applyToAll('core/css-modules', {
    plugins: {
      'css-modules': pluginCssModules,
    },
    // rules: pluginCssModules.configs.recommended.rules, // TODO: enable later
  }),
  ...applyToAll('core/no-barrel-files', {
    plugins: {
      'no-barrel-files': pluginNoBarrelFiles, // switch to eslint-plugin-barrel-files?
    },
    rules: {
      'no-barrel-files/no-barrel-files': 'error',
    },
  }),
  ...applyToAll('core/no-secrets', {
    plugins: {
      'no-secrets': pluginNoSecrets,
    },
    rules: {
      'no-secrets/no-secrets': [
        'error',
        {
          tolerance: 4.5,
          ignoreContent: [new RegExp(CAMEL_CASE)],
        },
      ],
    },
  }),
  ...applyToAll('core/exception-handling', {
    plugins: {
      'exception-handling': pluginExceptionHandling,
    },
    rules: {
      // 'exception-handling/no-unhandled': 'error',
    },
  }),
  // 'plugin:jsdoc/recommended-typescript', // TODO: To be added later
  // 'plugin:unicorn/recommended', // TODO: To be added later
  // 'plugin:isaacscript/recommended' // TODO: To be added later
]

const jsonConfigs = [
  ...applyToJson('json/json', pluginJsonc.configs['flat/recommended-with-json']),
  ...applyToJsonc('json/jsonc', pluginJsonc.configs['flat/recommended-with-jsonc']),
  ...applyToJson5('json/json5', pluginJsonc.configs['flat/recommended-with-json5']),
  ...applyToJsonC5('json', pluginJsonc.configs['flat/prettier']),
]

const scriptConfigs = [
  ...applyToScript('i18next', {
    plugins: {
      i18next: pluginI18next,
    },
    rules: {
      'i18next/no-literal-string': 1,
    },
  }),
]

const typescriptConfigs = [
  ...applyToTypescript('typescript/import-x', {
    ...pluginImportX.configs.typescript,
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts', '.mtsx', '.ctsx'],
      },
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
  }),
  // Disabled due to poor performance
  // ...applyToTypescript('typescript/deprecation', {
  //   plugins: {
  //     deprecation: fixupPluginRules(pluginDeprecation),
  //   },
  //   rules: {
  //     'deprecation/deprecation': 'error',
  //   },
  // }),
  ...applyToTypescript('typescript/strict', tsEslint.configs.strictTypeChecked),
  ...applyToTypescript('typescript/stylistic', tsEslint.configs.stylisticTypeChecked),
  ...applyToTypescript('typescript', {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Our own rules set
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {fixMixedExportsWithInlineTypeSpecifier: false},
      ],
      '@typescript-eslint/promise-function-async': ['error'],
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [
            0,
            0.1,
            -0.1,
            1,
            -1,
            2,
            -2,
            '0n',
            '-0n',
            '1n',
            '-1n',
            '2n',
            '-2n',
            Infinity,
            NaN,
          ],
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreArrayIndexes: true,
          ignoreTypeIndexes: true,
          enforceConst: true,
          detectObjects: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-readonly': ['error'],
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          checkParameterProperties: true,
          treatMethodsAsReadonly: true,
          ignoreInferredTypes: true,
          allow: [
            {from: 'package', package: 'react', name: 'Ref'},
            {from: 'package', package: 'react', name: 'RefCallback'},
            {from: 'package', package: 'react', name: 'RefObject'},
            {from: 'package', package: 'react', name: 'ReadonlyPropsWithChildren'},
            {from: 'package', package: '@tanstack/react-router', name: 'Router'},
            {from: 'lib', name: 'MessageEvent'},
          ],
        },
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            // add a custom message, and tell the plugin how to fix it
            PropsWithChildren: {
              message: 'Use `ReadonlyPropsWithChildren` instead.',
              fixWith: 'ReadonlyPropsWithChildren',
            },
          },
        },
      ],
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['PropsWithChildren'],
              message: 'Use `ReadonlyPropsWithChildren` instead.',
              allowTypeImports: false,
            },
          ],
        },
      ],
      // Extends or disable rules of the presets
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: true,
          varsIgnorePattern: '^(?!__)_.*|^_$',
          argsIgnorePattern: '^(?!__)_.*|^_$',
          caughtErrorsIgnorePattern: '^(?!__)_.*|^_$',
          destructuredArrayIgnorePattern: '^(?!__)_.*|^_$',
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn', // TODO: enable
      '@typescript-eslint/restrict-template-expressions': 'warn', // TODO: enable
      '@typescript-eslint/restrict-plus-operands': 'warn', // TODO: enable
    },
  }),
]

const reactConfigs = [
  ...applyToReact(
    'react/hooks',
    fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
  ),
  ...applyToReact('react/a11y', {
    ...pluginJsxA11y.flatConfigs.strict,
    settings: {
      'jsx-a11y': {
        polymorphicPropName: 'as',
        components: {
          VisuallyHidden: 'span',
        },
      },
    },
  }),
  ...applyToReact('react/query', pluginQuery.configs['flat/recommended']),
  ...applyToReact('react/dom', pluginReact.configs.dom), // TODO: Exclude react in server?
  ...applyToJavascriptReact('react/x-javascript', {
    ...pluginReact.configs['recommended'],
  }),
  ...applyToTypescriptReact('react/x-typescript', {
    ...pluginReact.configs['recommended-type-checked'],
  }),
  ...applyToReact('react/x-hooks', {
    // ...pluginReact.configs['hooks-extra'], // TODO: enable this when available in v2.0.0 instead of manually set rules
    rules: {
      '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'error',
    },
  }),
  ...applyToReact('react/x-settings', {
    settings: {
      'react-x': {
        polymorphicPropName: 'as',
        additionalHooks: {
          useLayoutEffect: ['useIsomorphicLayoutEffect'],
        },
        version: 'detect',
      },
    },
  }),
  ...applyToReact('react/refresh', {
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          checkJS: true,
        },
      ],
    },
  }),
  ...applyToReact('react/compiler', {
    plugins: {
      'react-compiler': pluginReactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  }),
  ...applyToReact('react', {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': [
        'error',
        {
          staticHooks: {
            useState: [false, true, true], // means [unstable, stable, stable]
            useAtom: [false, true],
            useMutative: [false, true],
            useMutativeReducer: [false, true],
            useLatest: true,
            useLazyRef: true,
            useIdleTimeScheduler: true,
            ...reactUseStaticHooks,
          },
          additionalHooks: `(${['useMemoClientValue', ...reactUseAdditionalHooks].join('|')})`,
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['button'],
        },
      ],
      '@eslint-react/prefer-shorthand-boolean': 'warn',
      '@eslint-react/prefer-shorthand-fragment': 'warn',
    },
  }),
  ...applyToTypescriptReact('react/typescript', {
    rules: {
      // https://github.com/orgs/react-hook-form/discussions/8020
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  }),
]

// const reactNativeConfigs = [
//   ...applyToReactNative('react-native/dom', pluginReactNative.configs.all),
//   ...applyToReactNative('react-native/off-dom', pluginReact.configs['off-dom'])
// ]

const testConfigs = [
  ...applyToVitestNotReact('testing/dom', compat.extends('plugin:testing-library/dom')),
  ...applyToVitestReact(
    'testing/react',
    fixupConfigRules(compat.extends('plugin:testing-library/react')),
  ),
  ...applyToVitest('testing/less-strict', {
    rules: {
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  }),
  ...applyToVitest('testing/vitest', {
    plugins: {
      vitest: pluginVitest,
    },
    rules: pluginVitest.configs.all.rules,
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
        // pluginVitest.environments.env.globals lack some of the globals, see https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/constants.ts
        chai: true,
        expectTypeOf: true,
        assertType: true,
        onTestFinished: true,
        onTestFailed: true,
      },
    },
  }),
  ...applyToVitest('testing/vitest/jest-dom', pluginJestDom.configs['flat/recommended']),
  ...applyToVitest('testing', {
    plugins: {
      'no-only-tests': pluginNoOnlyTests,
    },
    rules: {
      'no-only-tests/no-only-tests': 'error', // TODO: check this rule
    },
  }),
  ...applyToVitest('testing/vitest/formatting', compat.extends('plugin:jest-formatting/strict')),
]

const config = tsEslint.config(
  pluginGitignore({
    root: true,
    files: ['.gitignore'],
    strict: false,
  }),
  {
    ignores: ['public/*', '**/*.gen.ts', 'vitest.config.ts.timestamp*'],
  },
  ...coreConfigs,
  ...jsonConfigs,
  ...scriptConfigs,
  ...typescriptConfigs,
  ...reactConfigs,
  ...testConfigs,
  ...applyToAll('core', {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.worker,
        ...globals.serviceworker,
        ...globals.webextensions,
      },
    },
    rules: {
      'import-x/no-unresolved': 'error',
      'import-x/order': 'off',
      'import-x/namespace': 'off',
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
      '@eslint-community/eslint-comments/require-description': [
        'error',
        {ignore: ['eslint-enable']},
      ],
      'sonarjs/no-duplicate-string': 'warn',
      'promise/always-return': ['warn', {ignoreLastCallback: true}],
      'promise/no-callback-in-promise': [
        'warn',
        {
          exceptions: ['process.nextTick', 'setImmediate', 'setTimeout'],
        },
      ],
    },
  }),
  ...applyToAll('prettier', pluginPrettierRecommended), // Always the last
)

export default config
