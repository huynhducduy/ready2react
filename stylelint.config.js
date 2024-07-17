import {PASCAL_CASE} from './regexes.js'

const config = {
  plugins: [
    'stylelint-use-logical-spec',
    'stylelint-plugin-defensive-css',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-css-modules-no-global-scoped-selector',
    'stylelint-high-performance-animation',
    // "stylelint-no-px", or "stylelint-rem-over-px" // TODO: setup later, somehow they dont play well with @container
    // "stylelint-declaration-strict-value", // TODO: setup later
    // "stylelint-use-nesting", // TODO: setup later
    // "stylelint-media-use-custom-media", // TODO: setup later
    // "stylelint-scales", // TODO: setup later
    // "stylelint-gamut", // TODO: setup later
  ],
  extends: [
    'stylelint-config-standard-scss', // This included: stylelint-config-recommended-scss (stylelint-config-recommended, stylelint-scss, postcss-scss included), stylelint-config-standard (stylelint-config-recommended included)
    'stylelint-config-css-modules',
    // "postcss-styled-syntax", // For css-in-js
    'stylelint-prettier/recommended',
    'stylelint-config-clean-order', // https://npmtrends.com/stylelint-config-clean-order-vs-stylelint-config-concentric-order-vs-stylelint-config-hudochenkov/order-vs-stylelint-config-idiomatic-order-vs-stylelint-config-property-sort-order-smacss-vs-stylelint-config-rational-order-vs-stylelint-config-recess-order
  ],
  rules: {
    'unit-allowed-list': ['%', 'deg', 'px', 'rem', 'ms', 's', 'dvh', 'fr', 'ex'],
    'custom-property-pattern': '([A-Z][a-z]+)(-[A-Z][a-z]+)*',
    'scss/dollar-variable-pattern': '([A-Z][a-z]+)(-[A-Z][a-z]+)*',
    'liberty/use-logical-spec': 'always',
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'after-same-name',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
          'first-nested',
        ],
        ignore: ['after-comment'],
        ignoreAtRules: ['else', 'if'],
      },
    ],
    'plugin/use-defensive-css': [
      true,
      {
        'accidental-hover': true,
        'background-repeat': true,
        'custom-property-fallbacks': true,
        'flex-wrapping': true,
        'scroll-chaining': true,
        'scrollbar-gutter': true,
        'vendor-prefix-grouping': true,
        'severity': 'warning',
      },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
    'css-modules/no-global-scoped-selector': [
      true,
      {
        fileExtensions: ['.module.css', '.module.scss'],
      },
    ],
    'plugin/no-low-performance-animation-properties': true,
  },
  overrides: [
    {
      files: ['*.module.scss', '**/*.module.scss'],
      rules: {
        'selector-class-pattern': [
          new RegExp(PASCAL_CASE),
          {
            resolveNestedSelectors: true,
          },
        ],
      },
    },
  ],
}

export default config
