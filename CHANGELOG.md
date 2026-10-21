# Changelog

## 1.1.0 — 2026-10-21

### Changed

- Replaced the original Mochi cat with a DeepSeek whale-girl theme.
- The default character is now **Whale Girl**, migrated from the DeepSeek whale balance widget.
- Added two more initial characters from the Codex Pet community:
  - **DeepSeek Girl** by legeling
  - **Whalechan** by qimi
- The character gallery now opens with three built-in characters; custom imports remain unchanged.
- New whale-girl plugin icon.
- Built-in spritesheets are resized and embedded in the client bundle, keeping the plugin self-contained.

### Documentation

- Added built-in character credits, source links, and separate asset licensing in `ASSETS-LICENSE.md`.
- Updated the README and screenshots for the new default character.

## 1.0.0 — 2026-10-21

First public release.

- A Codex Pet-style desktop pet living inside DeepSeek Harness.
- Client plugin mounted in `shell.overlay`; no standalone app.
- Built-in original character `Mochi` with idle, happy, waiting, running, and review states.
- Import Codex Pet v1 / v2 packages (`pet.json` + `spritesheet.webp`).
- Import a single PNG / GIF / WebP as a static or animated pet.
- Local-only character storage (IndexedDB) and settings (localStorage).
- Draggable position, size control, speech bubbles, hover controls, hide / restore.
- Plugin Manager metadata, bilingual locale files, and plugin icon.
