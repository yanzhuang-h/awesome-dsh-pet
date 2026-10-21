window.__ModuleLoader__.load({
  id: 'awesome-dsh-pet',
  factory(require) {
    const React = require('react')
    const { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } = React
    const h = React.createElement

    const NS = 'dsh-pet'
    const BUILTIN_ID = 'mochi'
    const SETTINGS_KEY = 'dsh-pet.settings.v1'
    const GREETED_KEY = 'dsh-pet.greeted.v1'
    const DB_NAME = 'dsh-pet.pets.v1'
    const DB_STORE = 'pets'
    const MOCHI_IDLE = '__MOCHI_IDLE_DATA__'
    const MOCHI_HAPPY = '__MOCHI_HAPPY_DATA__'
    const PET_WIDTH = 180
    const PET_HEIGHT = 195
    const BOTTOM_GAP = 104

    const SPRITE = {
      idle: { row: 0, durations: [280, 110, 110, 140, 140, 320] },
      running: { row: 7, durations: [120, 120, 120, 120, 120, 220] },
      waiting: { row: 6, durations: [150, 150, 150, 150, 150, 260] },
      review: { row: 8, durations: [150, 150, 150, 150, 150, 280] },
      waving: { row: 3, durations: [140, 140, 140, 280] },
      jumping: { row: 4, durations: [140, 140, 140, 140, 280] }
    }

    const ZH = {
      'pet.builtin.name': '麻薯',
      'pet.builtin.desc': '一只把星星别在耳朵上的麻薯猫，最擅长陪你发呆。',
      'pet.builtin.author': 'DSH Pet',
      'bubble.morning': '早上好呀，今天也慢慢来。',
      'bubble.forenoon': '上午好，记得喝口水再继续。',
      'bubble.noon': '中午啦，要好好吃饭哦。',
      'bubble.afternoon': '下午好，伸个懒腰吧。',
      'bubble.evening': '晚上好呀，今天辛苦你了。',
      'bubble.night': '夜深了，忙完就早点休息吧。',
      'bubble.welcome': '按住我可以拖动，点一下会有回应。',
      'bubble.click1': '戳我做什么呀～',
      'bubble.click2': '我在这里陪你，慢慢来。',
      'bubble.click3': '再忙也要休息一下。',
      'bubble.click4': '你专注的样子，很好看。',
      'bubble.click5': '偷偷告诉你：你已经很棒了。',
      'bubble.running': '开始忙啦，我在旁边守着你。',
      'bubble.waiting': '需要你看一下这边哦。',
      'bubble.done': '这一轮做完啦，辛苦你了。',
      'bubble.drag': '轻一点放我下来～',
      'aria.pet': '戳一下桌宠',
      'aria.settings': '打开桌宠设置',
      'aria.hide': '藏起桌宠',
      'aria.close': '关闭设置',
      'aria.delete': '删除这个角色',
      'aria.importFolder': '导入 Codex 角色包',
      'aria.importImage': '导入一张图片',
      'settings.title': '桌宠小屋',
      'settings.subtitle': '它会一直待在 Harness 的这一角。',
      'settings.characters': '角色',
      'settings.charactersHint': '点一张卡片，就能换掉桌面上的它。',
      'settings.customEmpty': '还没有导入角色。',
      'settings.importFolder': '导入角色包',
      'settings.importImage': '导入一张图片',
      'settings.importing': '正在读取…',
      'settings.importHint': 'Codex 角色包需要 pet.json 和 spritesheet.webp；单张图片支持 PNG / GIF / WebP。',
      'settings.imported': '已加入：',
      'settings.importError': '导入失败：',
      'settings.size': '大小',
      'settings.sizeHint': '调整它在你桌面上的比例。',
      'settings.behavior': '陪伴方式',
      'settings.bubbles': '思考气泡',
      'settings.bubblesHint': '偶尔说句话，也会回应你的点击。',
      'settings.reactive': '跟随任务状态',
      'settings.reactiveHint': 'Harness 工作时会跑动，完成后会检查一遍。',
      'settings.position': '位置',
      'settings.resetPosition': '回到右下角',
      'settings.hide': '藏起桌宠',
      'settings.restore': '唤醒桌宠',
      'settings.formatNote': '角色包遵循 Codex Pet 的 8×9 或 8×11 图集规格。素材只保存在本机。',
      'tag.builtin': '内置 · 云朵猫',
      'tag.codex': 'Codex 图集',
      'tag.image': '图片',
      'tag.localAuthor': '本机导入',
      'settings.sheetDesc': '从本机导入的 Codex 角色图集。',
      'settings.imageDesc': '从本机导入的小角色。',
      'settings.unnamed': '我的角色',
      'err.folder': '文件夹里没有找到 pet.json。',
      'err.sheetMissing': '找不到 spritesheet.webp。',
      'err.sheetSize': '图集尺寸需要是 1536×1872（v1）或 1536×2288（v2）。',
      'err.image': '无法读取这张图片。',
      'err.tooLarge': '文件不能超过 12 MB。',
      'err.storage': '无法保存到本机角色库。',
      'err.read': '读取角色包失败。'
    }

    const EN = {
      'pet.builtin.name': 'Mochi',
      'pet.builtin.desc': 'A little rice-cake cat with a star on its ear, happiest when keeping you company.',
      'pet.builtin.author': 'DSH Pet',
      'bubble.morning': 'Morning. Let us take today gently.',
      'bubble.forenoon': 'Good morning. Remember to sip some water.',
      'bubble.noon': 'It is noon. Please have a proper lunch.',
      'bubble.afternoon': 'Good afternoon. Time for a little stretch.',
      'bubble.evening': 'Good evening. You did well today.',
      'bubble.night': 'It is late. Finish up and get some rest.',
      'bubble.welcome': 'Hold me to move me around. Tap me and I will answer.',
      'bubble.click1': 'You poked me!',
      'bubble.click2': 'I am right here. Take your time.',
      'bubble.click3': 'Even busy people deserve a break.',
      'bubble.click4': 'You look nice when you are focused.',
      'bubble.click5': 'A secret: you are already doing great.',
      'bubble.running': 'Off to work. I will keep watch from here.',
      'bubble.waiting': 'This part needs your attention.',
      'bubble.done': 'That round is done. Nice work.',
      'bubble.drag': 'Easy does it!',
      'aria.pet': 'Poke the desktop pet',
      'aria.settings': 'Open pet settings',
      'aria.hide': 'Hide the desktop pet',
      'aria.close': 'Close settings',
      'aria.delete': 'Delete this character',
      'aria.importFolder': 'Import a Codex pet package',
      'aria.importImage': 'Import a single image',
      'settings.title': 'Pet Corner',
      'settings.subtitle': 'A small companion for this corner of Harness.',
      'settings.characters': 'Characters',
      'settings.charactersHint': 'Pick a card to change the pet on your desktop.',
      'settings.customEmpty': 'No imported characters yet.',
      'settings.importFolder': 'Import pet package',
      'settings.importImage': 'Import an image',
      'settings.importing': 'Reading…',
      'settings.importHint': 'Codex packages need pet.json and spritesheet.webp. Single images can be PNG, GIF, or WebP.',
      'settings.imported': 'Added: ',
      'settings.importError': 'Import failed: ',
      'settings.size': 'Size',
      'settings.sizeHint': 'Adjust how much room it takes up.',
      'settings.behavior': 'Companionship',
      'settings.bubbles': 'Speech bubbles',
      'settings.bubblesHint': 'A few words now and then, plus a reply when you tap.',
      'settings.reactive': 'Follow task status',
      'settings.reactiveHint': 'Runs while Harness works, then reviews when a round ends.',
      'settings.position': 'Position',
      'settings.resetPosition': 'Back to the corner',
      'settings.hide': 'Hide pet',
      'settings.restore': 'Wake pet',
      'settings.formatNote': 'Packages follow the Codex Pet 8×9 or 8×11 atlas format. Everything stays on this machine.',
      'tag.builtin': 'Built in · Cloud cat',
      'tag.codex': 'Codex atlas',
      'tag.image': 'Image',
      'tag.localAuthor': 'Local import',
      'settings.sheetDesc': 'A Codex character atlas imported on this machine.',
      'settings.imageDesc': 'A little character imported on this machine.',
      'settings.unnamed': 'My Pet',
      'err.folder': 'No pet.json was found in that folder.',
      'err.sheetMissing': 'Could not find spritesheet.webp.',
      'err.sheetSize': 'The atlas must be 1536×1872 (v1) or 1536×2288 (v2).',
      'err.image': 'That image could not be read.',
      'err.tooLarge': 'Please keep the file under 12 MB.',
      'err.storage': 'The local character library is unavailable.',
      'err.read': 'The pet package could not be read.'
    }

    const CSS = `
      .dsp-root, .dsp-root *, .dsp-root *::before, .dsp-root *::after { box-sizing: border-box; }
      .dsp-root {
        position: absolute;
        inset: 0;
        pointer-events: none;
        color: var(--dsw-alias-label-primary, #232323);
        font-family: inherit;
        font-size: 13px;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      .dsp-root button { font: inherit; color: inherit; }
      .dsp-icon { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex: none; }
      .dsp-pet { position: absolute; z-index: 2; pointer-events: none; animation: dsp-arrive .45s cubic-bezier(.2,.8,.25,1) both; }
      .dsp-stage {
        position: relative;
        width: 100%;
        height: 100%;
        pointer-events: auto;
        cursor: grab;
        touch-action: none;
        user-select: none;
        outline: none;
        border-radius: 46% 46% 40% 40%;
      }
      .dsp-stage:active { cursor: grabbing; }
      .dsp-stage:focus-visible { outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #5b7cfa)); outline-offset: 4px; }
      .dsp-ground {
        position: absolute;
        z-index: 0;
        left: 50%;
        bottom: 1.5%;
        width: 62%;
        height: 10%;
        border-radius: 50%;
        background: radial-gradient(ellipse at center, rgba(36, 25, 16, .2), rgba(36, 25, 16, 0) 70%);
        filter: blur(1px);
        transform: translateX(-50%);
        pointer-events: none;
      }
      .dsp-art-wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        animation: dsp-breathe 4.6s ease-in-out infinite;
        transform-origin: 50% 90%;
        pointer-events: none;
      }
      .dsp-art {
        position: relative;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
        filter: drop-shadow(0 8px 9px rgba(31, 21, 13, .18));
      }
      .dsp-sheet { width: 100%; height: 100%; display: block; pointer-events: none; }
      .dsp-is-running .dsp-art-wrap { animation: dsp-run-bob .58s ease-in-out infinite; }
      .dsp-is-waiting .dsp-art-wrap { animation: dsp-wait 2.6s ease-in-out infinite; }
      .dsp-is-review .dsp-art-wrap { animation: dsp-review 1.1s ease-in-out infinite; }
      .dsp-is-boop .dsp-art-wrap { animation: dsp-boop .72s cubic-bezier(.2,.85,.3,1.25) both; }
      .dsp-is-dragging .dsp-art-wrap { animation: none; transform: rotate(4deg) translateY(-4px); }
      .dsp-sparkle {
        position: absolute;
        z-index: 3;
        top: 5%;
        right: 2%;
        color: #e9b94f;
        font-size: 18px;
        line-height: 1;
        opacity: 0;
        pointer-events: none;
        text-shadow: 0 2px 8px rgba(153, 99, 16, .2);
      }
      .dsp-is-review .dsp-sparkle, .dsp-is-boop .dsp-sparkle { animation: dsp-sparkle-pop .95s ease-out both; }
      .dsp-toolbar {
        position: absolute;
        z-index: 7;
        top: 1px;
        right: -3px;
        display: flex;
        gap: 5px;
        opacity: 0;
        transform: translateY(4px) scale(.96);
        pointer-events: none;
        transition: opacity .16s ease, transform .16s ease;
      }
      .dsp-pet:hover .dsp-toolbar, .dsp-toolbar:focus-within { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
      .dsp-tool {
        display: grid;
        place-items: center;
        width: 27px;
        height: 27px;
        padding: 0;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.16));
        border-radius: 50%;
        background: var(--dsw-alias-bg-layer-2, #2b2b2b);
        color: var(--dsw-alias-label-secondary, #d8d8d8);
        box-shadow: 0 5px 16px rgba(0,0,0,.22);
        cursor: pointer;
        transition: background .15s ease, color .15s ease, transform .15s ease;
      }
      .dsp-tool:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.17)); color: var(--dsw-alias-label-primary, #fff); transform: translateY(-1px); }
      .dsp-tool:active { transform: translateY(0) scale(.94); }
      .dsp-tool .dsp-icon { width: 14px; height: 14px; }
      .dsp-bubble {
        position: absolute;
        z-index: 8;
        left: 50%;
        bottom: calc(100% + 10px);
        width: max-content;
        max-width: 168px;
        padding: 9px 13px 10px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(0,0,0,.12));
        border-radius: 14px 14px 14px 5px;
        background: var(--dsw-alias-bg-layer-1, #fffdf8);
        color: var(--dsw-alias-label-primary, #283229);
        box-shadow: 0 10px 30px -12px rgba(0,0,0,.4);
        font-size: 12.5px;
        line-height: 1.55;
        text-align: center;
        opacity: 0;
        transform: translateX(calc(-50% + var(--dsp-bubble-shift, 0px))) translateY(5px) scale(.97);
        transform-origin: 50% 100%;
        pointer-events: none;
        cursor: pointer;
        transition: opacity .18s ease, transform .22s cubic-bezier(.2,.8,.3,1.1);
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .dsp-bubble.is-visible {
        opacity: 1;
        transform: translateX(calc(-50% + var(--dsp-bubble-shift, 0px))) translateY(0) scale(1);
        pointer-events: auto;
      }
      .dsp-bubble::after {
        content: "";
        position: absolute;
        bottom: -6px;
        left: calc(50% - var(--dsp-bubble-shift, 0px));
        width: 10px;
        height: 10px;
        border-right: 1px solid var(--dsw-alias-border-l2, rgba(0,0,0,.12));
        border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(0,0,0,.12));
        border-radius: 0 0 3px 0;
        background: inherit;
        transform: translateX(-50%) rotate(45deg);
      }
      .dsp-bubble-text { display: block; }
      .dsp-restore {
        position: fixed;
        z-index: 40;
        right: 22px;
        bottom: 22px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 9px 13px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.15));
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2, #292929);
        color: var(--dsw-alias-label-primary, #fff);
        box-shadow: 0 9px 26px rgba(0,0,0,.3);
        cursor: pointer;
        pointer-events: auto;
        font-size: 11.5px;
        transition: transform .15s ease, background .15s ease;
      }
      .dsp-restore:hover { transform: translateY(-1px); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.17)); }
      .dsp-restore .dsp-icon { width: 15px; height: 15px; }
      .dsp-modal-layer {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: grid;
        place-items: center;
        padding: 20px;
        background: var(--dsw-alias-bg-mask-2, rgba(0,0,0,.42));
        backdrop-filter: blur(5px);
        pointer-events: auto;
      }
      .dsp-dialog {
        width: min(558px, calc(100vw - 36px));
        max-height: min(760px, calc(100vh - 40px));
        overflow: auto;
        padding: 20px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.15));
        border-radius: 18px;
        background: var(--dsw-alias-bg-layer-1, #202020);
        color: var(--dsw-alias-label-primary, #f5f5f5);
        box-shadow: 0 28px 80px -20px rgba(0,0,0,.6);
        scrollbar-width: thin;
      }
      .dsp-dialog:focus { outline: none; }
      .dsp-root button:focus-visible, .dsp-root [role="button"]:focus-visible, .dsp-root input:focus-visible {
        outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #6d8cff));
        outline-offset: 2px;
      }
      .dsp-dialog-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 17px; }
      .dsp-dialog-head h2 { margin: 0; font-size: 19px; font-weight: 700; letter-spacing: -.3px; }
      .dsp-dialog-head p { margin: 4px 0 0; color: var(--dsw-alias-label-secondary, #b7b7b7); font-size: 11.5px; }
      .dsp-dialog-close {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        cursor: pointer;
      }
      .dsp-dialog-close:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.17)); color: var(--dsw-alias-label-primary, #fff); }
      .dsp-dialog-close .dsp-icon { width: 16px; height: 16px; }
      .dsp-section { margin-top: 18px; }
      .dsp-section-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 9px; }
      .dsp-section-title { margin: 0; font-size: 12px; font-weight: 700; }
      .dsp-section-hint { margin: 0; color: var(--dsw-alias-label-tertiary, #909090); font-size: 10px; }
      .dsp-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .dsp-gallery.is-single .dsp-card { grid-column: 1 / -1; }
      .dsp-card {
        position: relative;
        display: flex;
        align-items: stretch;
        min-width: 0;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.12));
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-2, #2b2b2b);
        overflow: hidden;
        transition: border-color .15s ease, background .15s ease, transform .15s ease;
      }
      .dsp-card:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.22)); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14)); transform: translateY(-1px); }
      .dsp-card.is-selected { border-color: var(--dsw-alias-state-business-primary, #6d8cff); background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #6d8cff) 11%, var(--dsw-alias-bg-layer-2, #2b2b2b)); }
      .dsp-card-main {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
        width: 100%;
        padding: 8px 27px 8px 8px;
        border: 0;
        background: transparent;
        text-align: left;
        cursor: pointer;
      }
      .dsp-thumb {
        display: grid;
        place-items: center;
        flex: none;
        width: 42px;
        height: 47px;
        overflow: hidden;
        border-radius: 9px;
        background: linear-gradient(145deg, #e5ecdf, #f2e5d1);
      }
      .dsp-thumb img, .dsp-thumb canvas { display: block; width: 100%; height: 100%; object-fit: contain; pointer-events: none; }
      .dsp-card-copy { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
      .dsp-card-copy strong { overflow: hidden; color: var(--dsw-alias-label-primary, #f5f5f5); font-size: 11.5px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
      .dsp-card-copy span { overflow: hidden; color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
      .dsp-card-check { position: absolute; top: 7px; right: 7px; color: var(--dsw-alias-state-business-primary, #7c98ff); font-size: 13px; font-weight: 700; }
      .dsp-card-delete {
        position: absolute;
        right: 4px;
        bottom: 4px;
        display: grid;
        place-items: center;
        width: 21px;
        height: 21px;
        padding: 0;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--dsw-alias-label-tertiary, #888);
        cursor: pointer;
        opacity: 0;
        transition: opacity .15s ease, background .15s ease, color .15s ease;
      }
      .dsp-card:hover .dsp-card-delete, .dsp-card-delete:focus-visible { opacity: 1; }
      .dsp-card-delete:hover { background: var(--dsw-alias-interactive-bg-hover-danger, rgba(220,80,70,.16)); color: var(--dsw-alias-state-error-primary, #f08d86); }
      .dsp-card-delete .dsp-icon { width: 12px; height: 12px; }
      .dsp-import-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
      .dsp-import-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        min-height: 35px;
        padding: 8px 10px;
        border: 1px dashed var(--dsw-alias-border-l2, rgba(255,255,255,.18));
        border-radius: 9px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #c9c9c9);
        font-size: 10.5px;
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease, color .15s ease;
      }
      .dsp-import-btn:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.3)); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1)); color: var(--dsw-alias-label-primary, #fff); }
      .dsp-import-btn:disabled { opacity: .55; cursor: wait; }
      .dsp-import-btn .dsp-icon { width: 14px; height: 14px; }
      .dsp-import-hint { margin: 7px 1px 0; color: var(--dsw-alias-label-tertiary, #888); font-size: 9.5px; line-height: 1.55; }
      .dsp-import-status { margin: 8px 0 0; padding: 7px 9px; border-radius: 7px; background: var(--dsw-alias-state-success-tertiary, rgba(50,160,100,.12)); color: var(--dsw-alias-state-success-primary, #73cf9d); font-size: 10px; }
      .dsp-import-status.is-error { background: var(--dsw-alias-state-error-secondary, rgba(220,80,70,.12)); color: var(--dsw-alias-state-error-primary, #f49089); }
      .dsp-range-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
      .dsp-range-head strong { font-size: 11.5px; }
      .dsp-range-head span { color: var(--dsw-alias-label-secondary, #b7b7b7); font-size: 10px; }
      .dsp-range { width: 100%; margin: 0; accent-color: var(--dsw-alias-state-business-primary, #6d8cff); cursor: pointer; }
      .dsp-row {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 0;
        border: 0;
        border-top: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
        background: transparent;
        text-align: left;
        cursor: pointer;
      }
      .dsp-row:first-of-type { border-top: 0; }
      .dsp-row-copy { min-width: 0; flex: 1; }
      .dsp-row-copy strong { display: block; font-size: 11.5px; font-weight: 600; }
      .dsp-row-copy span { display: block; margin-top: 2px; color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 9.5px; }
      .dsp-switch { position: relative; width: 34px; height: 20px; flex: none; border-radius: 999px; background: var(--dsw-alias-bg-layer-3, #454545); transition: background .16s ease; }
      .dsp-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: var(--dsw-alias-switch-thumb, #fff); box-shadow: 0 1px 3px rgba(0,0,0,.25); transition: transform .16s ease; }
      .dsp-row[aria-checked="true"] .dsp-switch { background: var(--dsw-alias-state-business-primary, #6d8cff); }
      .dsp-row[aria-checked="true"] .dsp-switch::after { transform: translateX(14px); }
      .dsp-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 8px; }
      .dsp-action {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 10px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.16));
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #c9c9c9);
        font-size: 10px;
        cursor: pointer;
      }
      .dsp-action:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.13)); color: var(--dsw-alias-label-primary, #fff); }
      .dsp-action .dsp-icon { width: 13px; height: 13px; }
      .dsp-action.is-danger { color: var(--dsw-alias-state-error-primary, #f08d86); }
      .dsp-action.is-danger:hover { background: var(--dsw-alias-interactive-bg-hover-danger, rgba(220,80,70,.13)); }
      .dsp-format-note { margin: 17px 0 0; padding-top: 12px; border-top: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07)); color: var(--dsw-alias-label-tertiary, #838383); font-size: 9px; line-height: 1.55; }
      @keyframes dsp-arrive { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes dsp-breathe { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3px) scale(1.005); } }
      @keyframes dsp-run-bob { 0%,100% { transform: translateY(0) rotate(-1.3deg); } 50% { transform: translateY(-5px) rotate(1.8deg); } }
      @keyframes dsp-wait { 0%,100% { transform: rotate(0) translateY(0); } 50% { transform: rotate(-2.3deg) translateY(-2px); } }
      @keyframes dsp-review { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(1.2deg); } }
      @keyframes dsp-boop { 0% { transform: scale(1); } 20% { transform: translateY(4px) scale(1.06,.94); } 54% { transform: translateY(-9px) scale(.97,1.04); } 78% { transform: translateY(1px) scale(1.01,.99); } 100% { transform: translateY(0) scale(1); } }
      @keyframes dsp-sparkle-pop { 0% { opacity: 0; transform: scale(.4) rotate(0); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-13px) scale(1.15) rotate(35deg); } }
      @media (prefers-reduced-motion: reduce) {
        .dsp-pet, .dsp-art-wrap, .dsp-sparkle { animation: none !important; }
        .dsp-toolbar, .dsp-card, .dsp-import-btn { transition: none !important; }
      }
      @media (max-width: 560px) {
        .dsp-gallery { grid-template-columns: minmax(0, 1fr); }
        .dsp-modal-layer { padding: 10px; }
        .dsp-dialog { padding: 16px; max-height: calc(100vh - 20px); }
      }
    `

    const DEFAULT_SETTINGS = {
      selectedId: BUILTIN_ID,
      scale: 1,
      bubbles: true,
      reactive: true,
      hidden: false,
      x: null,
      y: null
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value))
    }

    function randomId() {
      const random =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID().slice(0, 8)
          : Math.random().toString(36).slice(2, 10)
      return `custom-${Date.now().toString(36)}-${random}`
    }

    function cleanText(value, maxLength) {
      return String(value ?? '')
        .replace(/[\u0000-\u001f\u007f]/g, ' ')
        .trim()
        .slice(0, maxLength)
    }

    function loadSettings() {
      try {
        const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null')
        if (!raw || typeof raw !== 'object') return { ...DEFAULT_SETTINGS }
        return {
          selectedId: typeof raw.selectedId === 'string' ? raw.selectedId : BUILTIN_ID,
          scale: Number.isFinite(Number(raw.scale)) ? clamp(Number(raw.scale), 0.65, 1.35) : 1,
          bubbles: raw.bubbles !== false,
          reactive: raw.reactive !== false,
          hidden: raw.hidden === true,
          x: Number.isFinite(Number(raw.x)) ? Number(raw.x) : null,
          y: Number.isFinite(Number(raw.y)) ? Number(raw.y) : null
        }
      } catch {
        return { ...DEFAULT_SETTINGS }
      }
    }

    function persistSettings(settings) {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
      } catch {}
    }

    function openPetDb() {
      return new Promise((resolve, reject) => {
        if (typeof indexedDB === 'undefined') {
          reject(new Error('IndexedDB unavailable'))
          return
        }
        const request = indexedDB.open(DB_NAME, 1)
        request.onupgradeneeded = () => {
          const db = request.result
          if (!db.objectStoreNames.contains(DB_STORE)) {
            db.createObjectStore(DB_STORE, { keyPath: 'id' })
          }
        }
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error || new Error('IndexedDB unavailable'))
      })
    }

    async function dbListPets() {
      const db = await openPetDb()
      try {
        return await new Promise((resolve, reject) => {
          const tx = db.transaction(DB_STORE, 'readonly')
          const request = tx.objectStore(DB_STORE).getAll()
          request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : [])
          request.onerror = () => reject(request.error)
        })
      } finally {
        db.close()
      }
    }

    async function dbPutPet(record) {
      const db = await openPetDb()
      try {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(DB_STORE, 'readwrite')
          tx.objectStore(DB_STORE).put(record)
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
          tx.onabort = () => reject(tx.error || new Error('IndexedDB write aborted'))
        })
      } finally {
        db.close()
      }
    }

    async function dbDeletePet(id) {
      const db = await openPetDb()
      try {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(DB_STORE, 'readwrite')
          tx.objectStore(DB_STORE).delete(id)
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })
      } finally {
        db.close()
      }
    }

    function imageDimensions(blob) {
      return new Promise((resolve, reject) => {
        if (typeof createImageBitmap === 'function') {
          createImageBitmap(blob)
            .then((bitmap) => {
              resolve({ width: bitmap.width, height: bitmap.height })
              bitmap.close()
            })
            .catch(reject)
          return
        }
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.onload = () => {
          resolve({ width: img.naturalWidth, height: img.naturalHeight })
          URL.revokeObjectURL(url)
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('image decode failed'))
        }
        img.src = url
      })
    }

    function fileNameWithoutExtension(name) {
      return String(name || '').replace(/\.[^.]+$/, '')
    }

    const GENERIC_PET_NAMES = new Set(['idle', 'spritesheet', 'image', 'character', 'pet', 'avatar', 'main'])

    function friendlyPetName(value, t) {
      const name = cleanText(value, 64)
      if (!name || GENERIC_PET_NAMES.has(name.toLowerCase())) return t('settings.unnamed')
      return name
    }

    function relativeParent(file) {
      const full = String(file.webkitRelativePath || file.name || '')
      const index = full.lastIndexOf('/')
      return index < 0 ? '' : full.slice(0, index)
    }

    function fileInParent(files, name, parent) {
      return files.find((file) => file.name === name && relativeParent(file) === parent)
    }

    function tagFor(pet, t) {
      if (pet.kind === 'builtin') return t('tag.builtin')
      if (pet.kind === 'sheet') return `${t('tag.codex')} v${pet.spriteVersion || 1}`
      return t('tag.image')
    }

    function pickRandom(list, previous) {
      if (!Array.isArray(list) || list.length === 0) return ''
      if (list.length === 1) return list[0]
      let choice = list[Math.floor(Math.random() * list.length)]
      if (choice === previous) choice = list[(list.indexOf(choice) + 1) % list.length]
      return choice
    }

    function greetingKey(hour) {
      if (hour < 5) return 'night'
      if (hour < 9) return 'morning'
      if (hour < 12) return 'forenoon'
      if (hour < 14) return 'noon'
      if (hour < 18) return 'afternoon'
      if (hour < 22) return 'evening'
      return 'night'
    }

    function selectAnyRunning(statuses) {
      if (!statuses) return false
      const values =
        typeof statuses.values === 'function'
          ? Array.from(statuses.values())
          : typeof statuses === 'object'
            ? Object.values(statuses)
            : []
      return values.some((status) => Boolean(status && status.running))
    }

    function selectAnyWaiting(statuses) {
      if (!statuses) return false
      const values =
        typeof statuses.values === 'function'
          ? Array.from(statuses.values())
          : typeof statuses === 'object'
            ? Object.values(statuses)
            : []
      return values.some((status) => Boolean(status && status.pendingInteraction))
    }

    function useNoStatus() {
      return false
    }

    function DspIcon({ name }) {
      const paths = {
        gear: [
          h('circle', { key: 'c', cx: 12, cy: 12, r: 3 }),
          h('path', {
            key: 'p',
            d: 'M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6h.09A1.7 1.7 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9v.09a1.7 1.7 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z'
          })
        ],
        eyeOff: [
          h('path', { key: 'a', d: 'M3 3l18 18' }),
          h('path', {
            key: 'b',
            d: 'M10.6 5.3A9.7 9.7 0 0 1 12 5.2c5.2 0 9 6.1 9 6.8a12.3 12.3 0 0 1-2.6 3.3M6.6 6.6A13.3 13.3 0 0 0 3 12c0 .7 3.8 6.8 9 6.8 1.3 0 2.5-.4 3.6-1'
          }),
          h('path', { key: 'c', d: 'M9.9 9.9a3 3 0 0 0 4.2 4.2' })
        ],
        close: [h('path', { key: 'a', d: 'M7 7l10 10M17 7 7 17' })],
        trash: [
          h('path', { key: 'a', d: 'M5 7h14M9.5 7V4.8h5V7M7.2 7l.8 12h8l.8-12M10.2 10.5v5.2M13.8 10.5v5.2' })
        ],
        folder: [
          h('path', {
            key: 'a',
            d: 'M3.5 8.5V6.8c0-1 .8-1.8 1.8-1.8h4l2 2h7.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H5.3c-1 0-1.8-.8-1.8-1.8V8.5Z'
          }),
          h('path', { key: 'b', d: 'M12 10v6M9 13h6' })
        ],
        image: [
          h('rect', { key: 'a', x: 3.5, y: 4.5, width: 17, height: 15, rx: 3 }),
          h('circle', { key: 'b', cx: 9, cy: 10, r: 1.6 }),
          h('path', { key: 'c', d: 'M4.5 17l4.7-4.4 3.7 3.2 2.4-2.2 4.2 3.8' })
        ],
        arrow: [h('path', { key: 'a', d: 'M5 12h13M13 7l5 5-5 5' })],
        paw: [
          h('ellipse', { key: 'a', cx: 8, cy: 9, rx: 2.2, ry: 2.8 }),
          h('ellipse', { key: 'b', cx: 16, cy: 9, rx: 2.2, ry: 2.8 }),
          h('ellipse', { key: 'c', cx: 5.2, cy: 13.2, rx: 1.9, ry: 2.4 }),
          h('ellipse', { key: 'd', cx: 18.8, cy: 13.2, rx: 1.9, ry: 2.4 }),
          h('path', { key: 'e', d: 'M12 13.3c3.2 0 5.8 2 5.8 4.3 0 1.7-1.4 2.4-3.3 2.4-1 0-1.8-.4-2.5-.4s-1.5.4-2.5.4c-1.9 0-3.3-.7-3.3-2.4 0-2.3 2.6-4.3 5.8-4.3Z' })
        ]
      }
      return h('svg', { className: 'dsp-icon', viewBox: '0 0 24 24', 'aria-hidden': true }, paths[name] || paths.paw)
    }

    function PetThumb({ pet, t }) {
      const canvasRef = useRef(null)
      useEffect(() => {
        if (pet.kind !== 'sheet' || !canvasRef.current) return
        let cancelled = false
        const img = new Image()
        img.onload = () => {
          if (cancelled || !canvasRef.current) return
          const ctx = canvasRef.current.getContext('2d')
          if (!ctx) return
          ctx.clearRect(0, 0, 192, 208)
          ctx.drawImage(img, 0, 0, 192, 208, 0, 0, 192, 208)
        }
        img.src = pet.url
        return () => {
          cancelled = true
          img.onload = null
        }
      }, [pet.url, pet.kind])

      if (pet.kind === 'builtin') {
        return h('img', { src: MOCHI_IDLE, alt: '', draggable: false })
      }
      if (pet.kind === 'sheet') {
        return h('canvas', { ref: canvasRef, width: 192, height: 208, 'aria-label': pet.name })
      }
      return h('img', { src: pet.url, alt: '', draggable: false })
    }

    function SpriteCanvas({ pet, state }) {
      const canvasRef = useRef(null)
      useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        let cancelled = false
        let raf = 0
        let img = null
        let frame = 0
        let elapsed = 0
        let last = 0
        const spec = SPRITE[state] || SPRITE.idle

        const draw = () => {
          if (!img) return
          const ctx = canvas.getContext('2d')
          if (!ctx) return
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, frame * 192, spec.row * 208, 192, 208, 0, 0, canvas.width, canvas.height)
        }

        const step = (now) => {
          if (cancelled) return
          if (!last) last = now
          elapsed += now - last
          last = now
          let guard = 0
          while (elapsed >= spec.durations[frame % spec.durations.length] && guard < 12) {
            elapsed -= spec.durations[frame % spec.durations.length]
            frame = (frame + 1) % spec.durations.length
            draw()
            guard += 1
          }
          raf = requestAnimationFrame(step)
        }

        img = new Image()
        img.onload = () => {
          if (cancelled) return
          draw()
          last = 0
          raf = requestAnimationFrame(step)
        }
        img.onerror = () => {}
        img.src = pet.url

        return () => {
          cancelled = true
          cancelAnimationFrame(raf)
          img.onload = null
          img.onerror = null
        }
      }, [pet.url, state])

      return h('canvas', {
        ref: canvasRef,
        className: 'dsp-sheet',
        width: 192,
        height: 208,
        'aria-hidden': true
      })
    }

    function PetArtwork({ pet, state, happy, dragging }) {
      const stateClass =
        state === 'running'
          ? ' dsp-is-running'
          : state === 'waiting'
            ? ' dsp-is-waiting'
            : state === 'review'
              ? ' dsp-is-review'
              : ''

      let art
      if (pet.kind === 'builtin') {
        art = h('img', {
          className: 'dsp-art',
          src: happy ? MOCHI_HAPPY : MOCHI_IDLE,
          alt: '',
          draggable: false
        })
      } else if (pet.kind === 'sheet') {
        art = h(SpriteCanvas, { pet, state })
      } else {
        art = h('img', {
          className: 'dsp-art',
          src: pet.url,
          alt: '',
          draggable: false
        })
      }

      return h(
        'div',
        {
          className: `dsp-art-wrap${stateClass}${dragging ? ' dsp-is-dragging' : ''}`
        },
        art
      )
    }

    function ToggleRow({ checked, title, hint, onToggle }) {
      return h(
        'button',
        {
          type: 'button',
          className: 'dsp-row',
          role: 'switch',
          'aria-checked': checked,
          onClick: onToggle
        },
        h(
          'span',
          { className: 'dsp-row-copy' },
          h('strong', null, title),
          h('span', null, hint)
        ),
        h('span', { className: 'dsp-switch', 'aria-hidden': true })
      )
    }

    function PetCard({ pet, selected, onSelect, onDelete, t }) {
      return h(
        'div',
        { className: `dsp-card${selected ? ' is-selected' : ''}` },
        h(
          'button',
          {
            type: 'button',
            className: 'dsp-card-main',
            onClick: onSelect,
            'aria-pressed': selected
          },
          h('span', { className: 'dsp-thumb' }, h(PetThumb, { pet, t })),
          h(
            'span',
            { className: 'dsp-card-copy' },
            h('strong', null, pet.name),
            h('span', null, tagFor(pet, t))
          )
        ),
        selected ? h('span', { className: 'dsp-card-check', 'aria-hidden': true }, '✓') : null,
        pet.kind !== 'builtin'
          ? h(
              'button',
              {
                type: 'button',
                className: 'dsp-card-delete',
                title: t('aria.delete'),
                'aria-label': `${t('aria.delete')}: ${pet.name}`,
                onClick: onDelete
              },
              h(DspIcon, { name: 'trash' })
            )
          : null
      )
    }

    function PetOverlay({ t, useSessionStatus }) {
      const useStatus = typeof useSessionStatus === 'function' ? useSessionStatus : useNoStatus
      const running = useStatus(selectAnyRunning)
      const waiting = useStatus(selectAnyWaiting)

      const [settings, setSettings] = useState(loadSettings)
      const [customPets, setCustomPets] = useState([])
      const [petsReady, setPetsReady] = useState(false)
      const [settingsOpen, setSettingsOpen] = useState(false)
      const [bubble, setBubble] = useState('')
      const [bubbleShift, setBubbleShift] = useState(0)
      const [boop, setBoop] = useState(false)
      const [transient, setTransient] = useState(null)
      const [reviewing, setReviewing] = useState(false)
      const [dragging, setDragging] = useState(false)
      const [importBusy, setImportBusy] = useState(false)
      const [importMessage, setImportMessage] = useState('')
      const [importError, setImportError] = useState('')
      const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight })

      const bubbleTimer = useRef(0)
      const boopTimer = useRef(0)
      const transientTimer = useRef(0)
      const reviewTimer = useRef(0)
      const dragRef = useRef(null)
      const folderInputRef = useRef(null)
      const imageInputRef = useRef(null)
      const urlsRef = useRef(new Map())
      const greetedRef = useRef(false)
      const lastClickLine = useRef('')
      const settingsButtonRef = useRef(null)
      const dialogRef = useRef(null)
      const bubbleRef = useRef(null)
      const previousRunning = useRef(Boolean(running))
      const previousWaiting = useRef(Boolean(waiting))

      const builtinPet = useMemo(
        () => ({
          id: BUILTIN_ID,
          kind: 'builtin',
          name: t('pet.builtin.name'),
          description: t('pet.builtin.desc'),
          author: t('pet.builtin.author'),
          createdAt: 0
        }),
        [t]
      )

      const allPets = useMemo(() => [builtinPet, ...customPets], [builtinPet, customPets])
      const selectedPet = useMemo(
        () => allPets.find((pet) => pet.id === settings.selectedId) || builtinPet,
        [allPets, settings.selectedId, builtinPet]
      )

      const dimensions = useMemo(
        () => ({
          width: Math.round(PET_WIDTH * settings.scale),
          height: Math.round(PET_HEIGHT * settings.scale)
        }),
        [settings.scale]
      )

      const petX =
        settings.x == null
          ? Math.max(8, viewport.width - dimensions.width - 10)
          : clamp(settings.x, 8, Math.max(8, viewport.width - dimensions.width - 8))
      const petY =
        settings.y == null
          ? Math.max(8, viewport.height - dimensions.height - BOTTOM_GAP)
          : clamp(settings.y, 8, Math.max(8, viewport.height - dimensions.height - 8))

      const say = useCallback(
        (text, duration = 5200) => {
          if (!settings.bubbles || !text) return
          setBubble(String(text))
          if (bubbleTimer.current) window.clearTimeout(bubbleTimer.current)
          bubbleTimer.current = window.setTimeout(() => setBubble(''), duration)
        },
        [settings.bubbles]
      )

      const hideBubble = useCallback(() => {
        setBubble('')
        if (bubbleTimer.current) window.clearTimeout(bubbleTimer.current)
      }, [])

      useEffect(() => {
        if (!folderInputRef.current) return
        folderInputRef.current.setAttribute('webkitdirectory', '')
        folderInputRef.current.setAttribute('directory', '')
      }, [])

      useEffect(() => {
        let cancelled = false
        dbListPets()
          .then((records) => {
            if (cancelled) return
            const pets = records
              .filter((record) => record && typeof record.id === 'string' && record.blob)
              .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
              .map((record) => {
                const url = URL.createObjectURL(record.blob)
                urlsRef.current.set(record.id, url)
                return { ...record, url }
              })
            setCustomPets(pets)
          })
          .catch(() => {})
          .finally(() => {
            if (!cancelled) setPetsReady(true)
          })
        return () => {
          cancelled = true
        }
      }, [])

      useEffect(
        () => () => {
          for (const url of urlsRef.current.values()) URL.revokeObjectURL(url)
          urlsRef.current.clear()
        },
        []
      )

      useEffect(() => {
        if (!petsReady) return
        if (settings.selectedId !== BUILTIN_ID && !customPets.some((pet) => pet.id === settings.selectedId)) {
          setSettings((current) => ({ ...current, selectedId: BUILTIN_ID }))
        }
      }, [petsReady, customPets, settings.selectedId])

      useEffect(() => {
        const timer = window.setTimeout(() => persistSettings(settings), 160)
        return () => window.clearTimeout(timer)
      }, [settings])

      useEffect(() => {
        const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [])

      useEffect(() => {
        if (settings.x == null && settings.y == null) return
        setSettings((current) => {
          if (current.x == null || current.y == null) return current
          const maxX = Math.max(8, viewport.width - dimensions.width - 8)
          const maxY = Math.max(8, viewport.height - dimensions.height - 8)
          const x = clamp(current.x, 8, maxX)
          const y = clamp(current.y, 8, maxY)
          if (x === current.x && y === current.y) return current
          return { ...current, x, y }
        })
      }, [viewport.width, viewport.height, dimensions.width, dimensions.height])

      useEffect(() => {
        if (settings.bubbles === false || settings.hidden || greetedRef.current) return
        greetedRef.current = true
        const timer = window.setTimeout(() => {
          let first = false
          try {
            first = !localStorage.getItem(GREETED_KEY)
          } catch {}
          const base = t(`bubble.${greetingKey(new Date().getHours())}`)
          say(first ? `${base} ${t('bubble.welcome')}` : base, first ? 7200 : 5200)
          try {
            localStorage.setItem(GREETED_KEY, '1')
          } catch {}
        }, 800)
        return () => window.clearTimeout(timer)
      }, [say, settings.bubbles, settings.hidden, t])

      useEffect(() => {
        if (!settings.reactive) {
          previousRunning.current = Boolean(running)
          previousWaiting.current = Boolean(waiting)
          setReviewing(false)
          return
        }
        if (running && !previousRunning.current) {
          setReviewing(false)
          if (reviewTimer.current) window.clearTimeout(reviewTimer.current)
        }
        if (!running && previousRunning.current) {
          setReviewing(true)
          if (reviewTimer.current) window.clearTimeout(reviewTimer.current)
          reviewTimer.current = window.setTimeout(() => setReviewing(false), 6200)
          say(t('bubble.done'), 4200)
        }
        previousRunning.current = Boolean(running)
      }, [running, say, settings.reactive, t])

      useEffect(() => {
        if (!settings.reactive) {
          previousWaiting.current = Boolean(waiting)
          return
        }
        if (waiting && !previousWaiting.current) say(t('bubble.waiting'), 4200)
        previousWaiting.current = Boolean(waiting)
      }, [waiting, say, settings.reactive, t])

      useEffect(() => {
        if (!settingsOpen) return
        const onKeyDown = (event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            setSettingsOpen(false)
          }
        }
        window.addEventListener('keydown', onKeyDown)
        const timer = window.setTimeout(() => dialogRef.current && dialogRef.current.focus(), 20)
        return () => {
          window.removeEventListener('keydown', onKeyDown)
          window.clearTimeout(timer)
          if (settingsButtonRef.current) settingsButtonRef.current.focus()
        }
      }, [settingsOpen])

      useLayoutEffect(() => {
        if (!bubble || !bubbleRef.current) {
          setBubbleShift(0)
          return
        }
        const width = bubbleRef.current.offsetWidth || 0
        const center = petX + dimensions.width / 2
        const left = center - width / 2
        const right = center + width / 2
        let shift = 0
        if (left < 12) shift = 12 - left
        else if (right > viewport.width - 12) shift = viewport.width - 12 - right
        setBubbleShift((current) => (Math.abs(current - shift) > 0.5 ? shift : current))
      }, [bubble, petX, dimensions.width, viewport.width])

      useEffect(
        () => () => {
          if (bubbleTimer.current) window.clearTimeout(bubbleTimer.current)
          if (boopTimer.current) window.clearTimeout(boopTimer.current)
          if (transientTimer.current) window.clearTimeout(transientTimer.current)
          if (reviewTimer.current) window.clearTimeout(reviewTimer.current)
        },
        []
      )

      const artState = dragging
        ? 'jumping'
        : transient
          ? transient
          : settings.reactive && waiting
            ? 'waiting'
            : settings.reactive && running
              ? 'running'
              : settings.reactive && reviewing
                ? 'review'
                : 'idle'
      const happy = boop || artState === 'review' || artState === 'jumping'

      const sayClick = useCallback(() => {
        const lines = [
          t('bubble.click1'),
          t('bubble.click2'),
          t('bubble.click3'),
          t('bubble.click4'),
          t('bubble.click5')
        ].filter(Boolean)
        const line = pickRandom(lines, lastClickLine.current)
        lastClickLine.current = line
        say(line, 4800)
      }, [say, t])

      const poke = useCallback(() => {
        if (settings.hidden) return
        setBoop(true)
        if (boopTimer.current) window.clearTimeout(boopTimer.current)
        boopTimer.current = window.setTimeout(() => setBoop(false), 760)
        setTransient('waving')
        if (transientTimer.current) window.clearTimeout(transientTimer.current)
        transientTimer.current = window.setTimeout(() => setTransient(null), 1350)
        sayClick()
      }, [sayClick, settings.hidden])

      const onPointerDown = useCallback(
        (event) => {
          if (event.button !== 0 || settings.hidden) return
          event.preventDefault()
          hideBubble()
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: petX,
            originY: petY,
            moved: false
          }
          setDragging(true)
          try {
            event.currentTarget.setPointerCapture(event.pointerId)
          } catch {}
        },
        [hideBubble, petX, petY, settings.hidden]
      )

      const onPointerMove = useCallback(
        (event) => {
          const drag = dragRef.current
          if (!drag || drag.pointerId !== event.pointerId) return
          const dx = event.clientX - drag.startX
          const dy = event.clientY - drag.startY
          if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true
          if (!drag.moved) return
          const x = clamp(drag.originX + dx, 8, Math.max(8, window.innerWidth - dimensions.width - 8))
          const y = clamp(drag.originY + dy, 8, Math.max(8, window.innerHeight - dimensions.height - 8))
          setSettings((current) => (current.x === x && current.y === y ? current : { ...current, x, y }))
        },
        [dimensions.height, dimensions.width]
      )

      const onPointerEnd = useCallback(
        (event) => {
          const drag = dragRef.current
          if (!drag || drag.pointerId !== event.pointerId) return
          dragRef.current = null
          setDragging(false)
          try {
            event.currentTarget.releasePointerCapture(event.pointerId)
          } catch {}
          if (!drag.moved) {
            poke()
          } else {
            setTransient('jumping')
            if (transientTimer.current) window.clearTimeout(transientTimer.current)
            transientTimer.current = window.setTimeout(() => setTransient(null), 900)
          }
        },
        [poke]
      )

      const onPointerCancel = useCallback((event) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        dragRef.current = null
        setDragging(false)
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {}
      }, [])

      const onStageKeyDown = useCallback(
        (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            poke()
          }
        },
        [poke]
      )

      const selectPet = useCallback((id) => {
        setSettings((current) => ({ ...current, selectedId: id }))
        hideBubble()
      }, [hideBubble])

      const removePet = useCallback(
        async (pet) => {
          try {
            await dbDeletePet(pet.id)
            const url = urlsRef.current.get(pet.id)
            if (url) URL.revokeObjectURL(url)
            urlsRef.current.delete(pet.id)
            setCustomPets((current) => current.filter((item) => item.id !== pet.id))
            setSettings((current) =>
              current.selectedId === pet.id ? { ...current, selectedId: BUILTIN_ID } : current
            )
          } catch {
            setImportError(t('err.storage'))
          }
        },
        [t]
      )

      const resetPosition = useCallback(() => {
        setSettings((current) => ({ ...current, x: null, y: null, hidden: false }))
      }, [])

      const hidePet = useCallback(() => {
        setSettingsOpen(false)
        setSettings((current) => ({ ...current, hidden: true }))
        hideBubble()
      }, [hideBubble])

      const restorePet = useCallback(() => {
        setSettings((current) => ({ ...current, hidden: false }))
      }, [])

      const installPet = useCallback(
        async (record) => {
          await dbPutPet(record)
          const url = URL.createObjectURL(record.blob)
          urlsRef.current.set(record.id, url)
          const pet = { ...record, url }
          setCustomPets((current) => [pet, ...current.filter((item) => item.id !== pet.id)])
          setSettings((current) => ({ ...current, selectedId: pet.id }))
          setImportMessage(`${t('settings.imported')}${pet.name}`)
          setImportError('')
        },
        [t]
      )

      const importFromFolder = useCallback(
        async (fileList) => {
          const files = Array.from(fileList || [])
          if (files.length === 0) return
          const manifests = files.filter((file) => file.name === 'pet.json')
          const manifestFile = manifests.sort(
            (a, b) => (a.webkitRelativePath || '').split('/').length - (b.webkitRelativePath || '').split('/').length
          )[0]
          if (!manifestFile) throw new Error(t('err.folder'))
          const parent = relativeParent(manifestFile)
          let manifest
          try {
            manifest = JSON.parse(await manifestFile.text())
          } catch {
            throw new Error(t('err.read'))
          }
          const desiredName = cleanText(
            manifest.spritesheetPath || 'spritesheet.webp',
            200
          )
          const sheetName = desiredName.split('/').pop() || 'spritesheet.webp'
          const sheetFile =
            fileInParent(files, sheetName, parent) ||
            fileInParent(files, 'spritesheet.webp', parent) ||
            files.find((file) => file.name === sheetName) ||
            files.find((file) => file.name === 'spritesheet.webp')
          if (!sheetFile) throw new Error(t('err.sheetMissing'))
          if (sheetFile.size > 12 * 1024 * 1024) throw new Error(t('err.tooLarge'))
          const dimensions = await imageDimensions(sheetFile).catch(() => {
            throw new Error(t('err.image'))
          })
          const version = Number(manifest.spriteVersionNumber) === 2 ? 2 : 1
          const expectedHeight = version === 2 ? 2288 : 1872
          if (dimensions.width !== 1536 || dimensions.height !== expectedHeight) {
            throw new Error(t('err.sheetSize'))
          }
          let author = cleanText(manifest.author, 60)
          if (!author) {
            const submissionFile = fileInParent(files, 'submission.json', parent)
            if (submissionFile) {
              try {
                const submission = JSON.parse(await submissionFile.text())
                author = cleanText(submission.author || submission.creator || '', 60)
              } catch {}
            }
          }
          const folderName = parent.split('/').pop() || ''
          const name = friendlyPetName(
            manifest.displayName || manifest.name || folderName || fileNameWithoutExtension(sheetFile.name),
            t
          )
          const record = {
            id: randomId(),
            kind: 'sheet',
            name,
            description: cleanText(manifest.description, 200) || t('settings.sheetDesc'),
            author: author || t('tag.localAuthor'),
            createdAt: Date.now(),
            width: dimensions.width,
            height: dimensions.height,
            spriteVersion: version,
            mime: sheetFile.type || 'image/webp',
            blob: sheetFile
          }
          await installPet(record)
        },
        [installPet, t]
      )

      const importFromImage = useCallback(
        async (file) => {
          if (!file) return
          if (file.size > 12 * 1024 * 1024) throw new Error(t('err.tooLarge'))
          if (!String(file.type).startsWith('image/')) throw new Error(t('err.image'))
          const dimensions = await imageDimensions(file).catch(() => {
            throw new Error(t('err.image'))
          })
          const version =
            dimensions.width === 1536 && dimensions.height === 2288
              ? 2
              : dimensions.width === 1536 && dimensions.height === 1872
                ? 1
                : 0
          const record = {
            id: randomId(),
            kind: version ? 'sheet' : 'image',
            name: friendlyPetName(fileNameWithoutExtension(file.name), t),
            description: version ? t('settings.sheetDesc') : t('settings.imageDesc'),
            author: t('tag.localAuthor'),
            createdAt: Date.now(),
            width: dimensions.width,
            height: dimensions.height,
            spriteVersion: version || null,
            mime: file.type || 'image/png',
            blob: file
          }
          await installPet(record)
        },
        [installPet, t]
      )

      const runImport = useCallback(
        async (task) => {
          setImportBusy(true)
          setImportError('')
          setImportMessage('')
          try {
            await task()
          } catch (error) {
            setImportError(`${t('settings.importError')}${error && error.message ? error.message : t('err.read')}`)
          } finally {
            setImportBusy(false)
          }
        },
        [t]
      )

      function handleFolderInput(event) {
        const files = event.target.files
        event.target.value = ''
        runImport(() => importFromFolder(files))
      }

      function handleImageInput(event) {
        const file = event.target.files && event.target.files[0]
        event.target.value = ''
        runImport(() => importFromImage(file))
      }

      const modal = settingsOpen
        ? h(
            'div',
            {
              className: 'dsp-modal-layer',
              onMouseDown: (event) => {
                if (event.target === event.currentTarget) setSettingsOpen(false)
              }
            },
            h(
              'div',
              {
                ref: dialogRef,
                tabIndex: -1,
                className: 'dsp-dialog',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': 'dsp-pet-settings-title',
                onMouseDown: (event) => event.stopPropagation()
              },
              h(
                'div',
                { className: 'dsp-dialog-head' },
                h(
                  'div',
                  null,
                  h('h2', { id: 'dsp-pet-settings-title' }, t('settings.title')),
                  h('p', null, t('settings.subtitle'))
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsp-dialog-close',
                    title: t('aria.close'),
                    'aria-label': t('aria.close'),
                    onClick: () => setSettingsOpen(false)
                  },
                  h(DspIcon, { name: 'close' })
                )
              ),
              h(
                'section',
                { className: 'dsp-section' },
                h(
                  'div',
                  { className: 'dsp-section-head' },
                  h('h3', { className: 'dsp-section-title' }, t('settings.characters')),
                  h('p', { className: 'dsp-section-hint' }, t('settings.charactersHint'))
                ),
                h(
                  'div',
                  { className: `dsp-gallery${allPets.length === 1 ? ' is-single' : ''}` },
                  allPets.map((pet) =>
                    h(PetCard, {
                      key: pet.id,
                      pet,
                      selected: pet.id === selectedPet.id,
                      onSelect: () => selectPet(pet.id),
                      onDelete: () => removePet(pet),
                      t
                    })
                  )
                ),
                h(
                  'div',
                  { className: 'dsp-import-row' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsp-import-btn',
                      disabled: importBusy,
                      onClick: () => folderInputRef.current && folderInputRef.current.click(),
                      title: t('aria.importFolder')
                    },
                    h(DspIcon, { name: 'folder' }),
                    importBusy ? t('settings.importing') : t('settings.importFolder')
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsp-import-btn',
                      disabled: importBusy,
                      onClick: () => imageInputRef.current && imageInputRef.current.click(),
                      title: t('aria.importImage')
                    },
                    h(DspIcon, { name: 'image' }),
                    t('settings.importImage')
                  )
                ),
                h('p', { className: 'dsp-import-hint' }, t('settings.importHint')),
                importMessage ? h('p', { className: 'dsp-import-status' }, importMessage) : null,
                importError ? h('p', { className: 'dsp-import-status is-error', role: 'alert' }, importError) : null
              ),
              h(
                'section',
                { className: 'dsp-section' },
                h(
                  'div',
                  { className: 'dsp-range-head' },
                  h('strong', null, t('settings.size')),
                  h('span', null, `${Math.round(settings.scale * 100)}%`)
                ),
                h('input', {
                  type: 'range',
                  className: 'dsp-range',
                  min: 0.65,
                  max: 1.35,
                  step: 0.05,
                  value: settings.scale,
                  'aria-label': t('settings.size'),
                  onChange: (event) =>
                    setSettings((current) => ({ ...current, scale: Number(event.target.value) }))
                }),
                h('p', { className: 'dsp-import-hint' }, t('settings.sizeHint'))
              ),
              h(
                'section',
                { className: 'dsp-section' },
                h('h3', { className: 'dsp-section-title' }, t('settings.behavior')),
                h(ToggleRow, {
                  checked: settings.bubbles,
                  title: t('settings.bubbles'),
                  hint: t('settings.bubblesHint'),
                  onToggle: () => setSettings((current) => ({ ...current, bubbles: !current.bubbles }))
                }),
                h(ToggleRow, {
                  checked: settings.reactive,
                  title: t('settings.reactive'),
                  hint: t('settings.reactiveHint'),
                  onToggle: () => setSettings((current) => ({ ...current, reactive: !current.reactive }))
                })
              ),
              h(
                'section',
                { className: 'dsp-section' },
                h('h3', { className: 'dsp-section-title' }, t('settings.position')),
                h(
                  'div',
                  { className: 'dsp-actions' },
                  h(
                    'button',
                    { type: 'button', className: 'dsp-action', onClick: resetPosition },
                    h(DspIcon, { name: 'arrow' }),
                    t('settings.resetPosition')
                  ),
                  h(
                    'button',
                    { type: 'button', className: 'dsp-action is-danger', onClick: hidePet },
                    h(DspIcon, { name: 'eyeOff' }),
                    t('settings.hide')
                  )
                )
              ),
              h('p', { className: 'dsp-format-note' }, t('settings.formatNote'))
            )
          )
        : null

      if (settings.hidden) {
        return h(
          'div',
          { className: 'dsp-root' },
          h('style', null, CSS),
          h(
            'button',
            {
              type: 'button',
              className: 'dsp-restore',
              onClick: restorePet,
              title: t('settings.restore'),
              'aria-label': t('settings.restore')
            },
            h(DspIcon, { name: 'paw' }),
            t('settings.restore')
          )
        )
      }

      return h(
        'div',
        { className: 'dsp-root' },
        h('style', null, CSS),
        h(
          'div',
          {
            className: `dsp-pet${boop ? ' dsp-is-boop' : ''}${artState === 'running' ? ' dsp-is-running' : ''}${artState === 'waiting' ? ' dsp-is-waiting' : ''}${artState === 'review' ? ' dsp-is-review' : ''}${dragging ? ' dsp-is-dragging' : ''}`,
            style: {
              left: petX,
              top: petY,
              width: dimensions.width,
              height: dimensions.height
            }
          },
          h(
            'div',
            {
              className: `dsp-bubble${bubble ? ' is-visible' : ''}`,
              ref: bubbleRef,
              style: { '--dsp-bubble-shift': `${bubbleShift}px` },
              onClick: hideBubble,
              role: 'status',
              'aria-live': 'polite'
            },
            h('span', { className: 'dsp-bubble-text' }, bubble)
          ),
          h(
            'div',
            { className: 'dsp-toolbar' },
            h(
              'button',
              {
                ref: settingsButtonRef,
                type: 'button',
                className: 'dsp-tool',
                title: t('aria.settings'),
                'aria-label': t('aria.settings'),
                onClick: () => {
                  setSettingsOpen(true)
                  hideBubble()
                }
              },
              h(DspIcon, { name: 'gear' })
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dsp-tool',
                title: t('aria.hide'),
                'aria-label': t('aria.hide'),
                onClick: hidePet
              },
              h(DspIcon, { name: 'eyeOff' })
            )
          ),
          h(
            'div',
            {
              className: 'dsp-stage',
              role: 'button',
              tabIndex: 0,
              title: `${selectedPet.name} · ${t('aria.pet')}`,
              'aria-label': `${selectedPet.name} · ${t('aria.pet')}`,
              onPointerDown,
              onPointerMove,
              onPointerUp: onPointerEnd,
              onPointerCancel,
              onKeyDown: onStageKeyDown
            },
            h('span', { className: 'dsp-sparkle', 'aria-hidden': true }, '✦'),
            h('div', { className: 'dsp-ground', 'aria-hidden': true }),
            h(PetArtwork, {
              pet: selectedPet,
              state: artState,
              happy,
              dragging
            })
          )
        ),
        modal,
        h('input', {
          ref: folderInputRef,
          type: 'file',
          multiple: true,
          style: { display: 'none' },
          onChange: handleFolderInput
        }),
        h('input', {
          ref: imageInputRef,
          type: 'file',
          accept: 'image/png,image/gif,image/webp,image/jpeg,image/avif,image/apng',
          style: { display: 'none' },
          onChange: handleImageInput
        })
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(
          () =>
            ctx.locale.register(NS, {
              zh: ZH,
              en: EN
            }),
          'dsh-pet: locale'
        )
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'dsh-pet',
              order: 80,
              locale: NS
            },
            PetOverlay
          )
        )
      }
    }
  }
})
