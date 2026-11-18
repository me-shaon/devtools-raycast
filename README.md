# DevTools Launcher for Raycast

This repository holds the DevTools Launcher Raycast extension and the tools that keep it in sync with the [DevTools](https://github.com/me-shaon/devtools) app.

- `extension/` is the Raycast extension. Only this folder goes to the Raycast Store. Its README is the Store page.
- `scripts/` holds the development scripts. They are not part of the published extension.

## Development

1. Run `npm install` in the repository root and in `extension/`.
2. In `extension/`, run `npm run dev` to load the extension in Raycast.
3. In the repository root, run `npm run sync-tools -- ../devtools` when tools change in the app. It copies the tool list and search keywords from the app's tool registry into `extension/src/tools.json`. It also regenerates the per-tool commands in `extension/package.json` and `extension/src/tool-*.ts`.
4. In the repository root, run `npm test` to test the sync script.

## Publishing

1. Set `author` in `extension/package.json` to your Raycast username.
2. In `extension/`, run `npm run lint` and `npm run build`.
3. In `extension/`, run `npm run publish`. This opens or updates a pull request to the `raycast/extensions` repository for review.
