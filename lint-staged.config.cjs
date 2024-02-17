module.exports = {
  '*.{js,jsx,mjs,cjs,ts,tsx,vue,json}': ['pnpm lint:script --fix'],
  '*.{ts,tsx,vue}': [() => 'pnpm typecheck'],
  '*.{scss,sass,css,pcss}': ['pnpm lint:style'], // TODO: add stylelint
}
