# Ready2React

Setup
```sh
pnpm install
```

## Development

Create a `.env.development(.local?)` based on `.env.example`

```sh
pnpm dev
```

### Devtools

Come with [react-dev-inspector](https://github.com/zthxxx/react-dev-inspector)

To open, use keyboard shortcuts:

- On macOS: `Ctrl + Shift + Command + C`
- On Windows / Linux: `Ctrl + Shift + Alt + C`

## Staging (Test)

Create a `.env.staging(.local?)` based on `.env.example`

```sh
pnpm build --mode staging
```

## Production

Create a `.env.production(.local?)` based on `.env.example`

```sh
pnpm build
```

## Notes

About SWC config: SWC (`@swc/core`) must share the same version accross the app. Package that use SWC:

```txt
@swc-jotai/debug-label
@swc-jotai/react-refresh
@swc/plugin-react-remove-properties
@vitejs/plugin-react-swc
```

`@swc/core` is currently pinned to `1.6.13` in `package.json`
