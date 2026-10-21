# Contributing to Awesome DSH Pet

Thanks for wanting to make the pet a little more alive.

## Issues

Before opening an issue, please check:

- Harness version (`0.2.1-rc.2` is the currently tested version)
- whether `awesome-dsh-pet` is enabled in the Harness Plugins page
- whether the issue still happens in a fresh Harness window

For bugs, include the Harness version, the steps to reproduce, and the relevant error text or a screenshot when possible. For character requests, please include the source / license of the artwork.

## Pull requests

1. Fork the repo and create a focused branch.
2. Edit `src/client.js` or the files under `src/builtins/` rather than editing the generated `client.js` by hand.
3. Run:
   ```powershell
   npm run build
   npm run check
   ```
4. Commit both the source change and the rebuilt `client.js`.
5. Describe the user-visible effect and include a screenshot / short recording for UI changes.

Please keep the plugin dependency-free at runtime. UI copy should stay in the locale dictionaries, and new UI should use `--dsw-alias-*` theme tokens rather than hard-coded panel colors.

## Character assets

- Do not add third-party artwork unless its license permits redistribution and you can provide source + attribution.
- Do not commit community character packages to the plugin; they belong to their authors and keep their own licenses.
- Every built-in asset must be listed in `ASSETS-LICENSE.md` with author, source URL, license, and any modifications.
- Built-in characters with non-commercial licenses must remain clearly separated from the MIT code license.
- If you add an original built-in character, include its source artwork and license information.

## Compatibility

This project targets the DeepSeek Harness Client Slot / plugin manifest preview APIs. If an upgrade changes `shell.overlay`, the slot registration API, or theme tokens, please call that out explicitly in the PR.
