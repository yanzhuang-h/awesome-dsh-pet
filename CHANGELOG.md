# Changelog

## 1.3.0 — 2026-10-21

### Added

- Added **鲨鱼辣椒 / Shark Pepper** as the fourth built-in character, with all standard v2 animation rows and the original pixel-art sheet.
- The character is clearly labelled as unofficial fan art inspired by 《铁甲小宝》 / *B-Robo Kabutack*; original rights remain with the rights holders.
- Added a dedicated fan-art notice and takedown note in `ASSETS-LICENSE.md`.

### Changed

- The journal gallery now shows four initial characters.
- Updated the README built-in table, license notes, credits, and settings screenshot.

## 1.2.1 — 2026-10-21

### Added

- Restored the original two-part whale click voice (`Ya1` / `Ya2`) from the reference widget.
- Added a **轻声回应 / Little voice** toggle in the journal (on by default).
- The voice plays on pointer clicks and keyboard activation, and can be muted without affecting the speech bubble.
- Added sound licensing and troubleshooting notes.

## 1.2.0 — 2026-10-21

### Added

- A redesigned **Whale Isle Journal** (鲸屿手帐) with a large character preview, a two-column layout, and a calmer visual hierarchy.
- Per-character nicknames and a user name used in replies.
- Three response tones: Gentle, Bright, and Quiet.
- Four sea colors: Tide Blue, Dusk Violet, Sea Glass, and Shell Pink. The accent also affects the pet glow, controls, and selection states.
- Corner presets for the pet's spot (lower left / lower right / upper right) plus drag support.
- A one-click personalization reset.

### Changed

- Rebranded the in-app experience as **鲸屿 / Whale Isle** and the default whale girl as **鲸汐**.
- Added Chinese display names for the two Codex companions: **深澜** (DeepSeek Girl) and **鲸酱** (Whalechan); the original names remain as source labels.
- Reworded the settings UI around the pet's perspective: Companions, Her temperament, Today's sea, Presence, Her spot.
- Replaced the old paw restore chip with a wave icon and updated the plugin Manager metadata.
- Fresh README screenshots for the new journal layout.

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
