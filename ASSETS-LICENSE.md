# Third-party character assets

The plugin source code in this repository is licensed under the [MIT License](LICENSE). That license does **not** automatically cover the character artwork bundled with the plugin. The assets below keep their original authorship and licenses.

## 1. Whale Girl (default character and icon)

- **Character:** 鲸汐 / Whale Girl (the in-app display name for the classic whale girl)
- **Files:** `src/builtins/whale-girl.png`, the plugin icon derived from it (`icon.png`), and the embedded copy inside `client.js`
- **Source:** [comreade-123/DeepSeek-Whale-widget-desktop](https://github.com/comreade-123/DeepSeek-Whale-widget-desktop), file `renderer/assets/DSniang1.png`
- **Upstream project:** based on [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget)
- **License:** MIT
- **Copyright:** Copyright (c) 2026 MeteorNOX; Copyright (c) 2026 EthanMaven
- **Modifications:** transparent margins were cropped; the image was composited onto a blue badge for `icon.png`; the artwork is embedded as a data URL in the built client bundle.

The upstream repository distributes this image under its MIT license. It is an unofficial community image and is not presented as official DeepSeek artwork.

## 2. DeepSeek Girl

- **Character:** DeepSeek Girl
- **File:** `src/builtins/deepseek-girl.webp` (embedded in `client.js`)
- **Author:** [legeling](https://github.com/legeling)
- **Source:** [awesome-codex-pet — deepseek-girl--legeling](https://github.com/legeling/awesome-codex-pet/tree/main/pets/deepseek-girl--legeling)
- **License:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- **Source statement:** "Independent AI-generated community interpretation; non-commercial use only. Commercial use is prohibited." The submission describes the character as a blue-haired whale girl, not official DeepSeek artwork.
- **Modifications:** spritesheet resized from 1536×2288 to 1344×2002 (cell size 168×182). No characters were redrawn. Embedded as a data URL in the built client bundle.

## 3. DeepSeek Whalechan

- **Character:** DeepSeek Whalechan
- **File:** `src/builtins/deepseek-whalechan.webp` (embedded in `client.js`)
- **Author:** [qimi](https://github.com/qishichuan)
- **Source:** [awesome-codex-pet — deepseek-whalechan--qimi](https://github.com/legeling/awesome-codex-pet/tree/main/pets/deepseek-whalechan--qimi)
- **License:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- **Source statement:** "Independent AI-generated community interpretation; non-commercial use only. Commercial use is prohibited." The submission describes the character as an independent blue whale-maid variant, not official DeepSeek artwork.
- **Modifications:** spritesheet resized from 1536×2288 to 1344×2002 (cell size 168×182). No characters were redrawn. Embedded as a data URL in the built client bundle.

## 4. Click voice

- **Files:** `src/builtins/click-press.mp3` and `src/builtins/click-release.mp3` (embedded in `client.js`)
- **Source:** [comreade-123/DeepSeek-Whale-widget-desktop](https://github.com/comreade-123/DeepSeek-Whale-widget-desktop), files `renderer/assets/Ya1.mp3` and `renderer/assets/Ya2.mp3`
- **License:** MIT
- **Copyright:** Copyright (c) 2026 MeteorNOX; Copyright (c) 2026 EthanMaven
- **Modifications:** files renamed and embedded as data URLs in the built client bundle; audio content is unchanged.

## 5. Shark Pepper (unofficial fan art)

- **Character:** 鲨鱼辣椒 / Shark Pepper
- **File:** `src/builtins/shark-pepper.webp` (embedded in `client.js`)
- **Original work:** 《铁甲小宝》 / *B-Robo Kabutack*
- **Nature:** An unofficial community fan-art interpretation made for this project, based on the repository owner's supplied references. It is not official artwork and is not affiliated with or endorsed by the rights holders.
- **Rights:** All rights to the original character and related marks remain with their respective holders. This project does not grant a license to the underlying character.
- **Use:** Included for non-commercial fan display only. Do not present it as official material or use it commercially. The asset will be removed on request from a rights holder.
- **Modifications:** The 1536×2288 PNG sheet was encoded as a 1536×2288 WebP (quality 90) and embedded as a data URL in the client bundle. No frames were redrawn.

## License of this distribution

Because the bundled DeepSeek Girl and Whalechan assets are licensed **CC BY-NC 4.0**, and Shark Pepper is unofficial non-commercial fan art, a build that includes all bundled characters is intended for **non-commercial use**. The MIT license continues to apply to the plugin code and to code contributions; it does not relicense the CC BY-NC or fan-art assets.

If you want to use the plugin commercially:

1. remove the CC BY-NC and fan-art assets from `src/builtins/`, update `src/client.js` and `tools/build.mjs`, and rebuild; or
2. obtain separate commercial permission from the original character authors and rights holders.

## Attribution and takedown

If you are an author or rights holder and believe an asset is attributed incorrectly, please open an issue at [yanzhuang-h/awesome-dsh-pet](https://github.com/yanzhuang-h/awesome-dsh-pet/issues) or contact the repository owner. We will correct the attribution or remove the asset promptly.
