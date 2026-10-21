window.__ModuleLoader__.load({
  id: 'awesome-dsh-pet',
  factory(require) {
    const React = require('react')
    const { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } = React
    const h = React.createElement

    const NS = 'dsh-pet'
    const DEFAULT_PET_ID = 'whale-girl'
    const SETTINGS_KEY = 'dsh-pet.settings.v1'
    const GREETED_KEY = 'dsh-pet.greeted.v2'
    const DB_NAME = 'dsh-pet.pets.v1'
    const DB_STORE = 'pets'
    const WHALE_GIRL_IMAGE = '__WHALE_GIRL_DATA__'
    const DEEPSEEK_GIRL_SHEET = '__DEEPSEEK_GIRL_SHEET__'
    const DEEPSEEK_WHALECHAN_SHEET = '__DEEPSEEK_WHALECHAN_SHEET__'
    const CLICK_PRESS_SOUND = '__CLICK_PRESS_SOUND__'
    const CLICK_RELEASE_SOUND = '__CLICK_RELEASE_SOUND__'
    const BUILTIN_CELL_WIDTH = 168
    const BUILTIN_CELL_HEIGHT = 182
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

    const ACCENTS = {
      tide: { base: '#6f9bff', soft: 'rgba(111,155,255,.18)', glow: 'rgba(84,128,230,.4)' },
      dusk: { base: '#b28cff', soft: 'rgba(178,140,255,.18)', glow: 'rgba(139,96,230,.4)' },
      mint: { base: '#55d6c2', soft: 'rgba(85,214,194,.17)', glow: 'rgba(46,176,158,.35)' },
      shell: { base: '#ff9fba', soft: 'rgba(255,159,186,.17)', glow: 'rgba(224,107,141,.35)' }
    }

    const TONES = ['gentle', 'bright', 'quiet']

    const TONE_LINES = {
      gentle: ['bubble.gentle1', 'bubble.gentle2', 'bubble.gentle3', 'bubble.gentle4', 'bubble.gentle5'],
      bright: ['bubble.bright1', 'bubble.bright2', 'bubble.bright3', 'bubble.bright4'],
      quiet: ['bubble.quiet1', 'bubble.quiet2', 'bubble.quiet3', 'bubble.quiet4']
    }

    const ZH = {
      'brand.eyebrow': 'WHALE ISLE',
      'pet.whaleGirl.name': '鲸汐',
      'pet.whaleGirl.source': '经典鲸鱼娘',
      'pet.whaleGirl.desc': '从 DeepSeek 小鲸鱼挂件游来，安静地待在桌面一角。',
      'pet.deepseekGirl.name': '深澜',
      'pet.deepseekGirl.source': 'DeepSeek Girl',
      'pet.deepseekGirl.desc': '蓝发、鲸鳍和鲸尾的 DeepSeek 鲸鱼少女，来自 Codex Pet 社区。',
      'pet.whalechan.name': '鲸酱',
      'pet.whalechan.source': 'Whalechan',
      'pet.whalechan.desc': 'Q 版蓝鲸女仆，抱着小本子陪你在 Harness 里工作。',
      'bubble.morning': '早上好呀，今天也慢慢来。',
      'bubble.forenoon': '上午好，记得喝口水再继续。',
      'bubble.noon': '中午啦，要好好吃饭哦。',
      'bubble.afternoon': '下午好，伸个懒腰吧。',
      'bubble.evening': '晚上好呀，今天辛苦你了。',
      'bubble.night': '夜深了，忙完就早点休息吧。',
      'bubble.welcome': '我是{pet}。按住我可以拖动，点一下会有回应。',
      'bubble.welcomeNamed': '{name}，我是{pet}。今天也请多关照。',
      'bubble.gentle1': '戳我做什么呀～',
      'bubble.gentle2': '我在这里陪你，慢慢来。',
      'bubble.gentle3': '再忙也要休息一下。',
      'bubble.gentle4': '你专注的样子，很好看。',
      'bubble.gentle5': '偷偷告诉你：你已经很棒了。',
      'bubble.gentleNamed': '{name}，我在呢。',
      'bubble.bright1': '收到召唤！今天也要闪闪发光。',
      'bubble.bright2': '抬头，给你补一点元气。',
      'bubble.bright3': '先完成这一小步，然后夸夸自己。',
      'bubble.bright4': '有我在，效率也会变可爱。',
      'bubble.brightNamed': '{name}，冲呀！',
      'bubble.quiet1': '嗯，我在。',
      'bubble.quiet2': '不着急。',
      'bubble.quiet3': '先呼吸一下。',
      'bubble.quiet4': '陪你一会儿。',
      'bubble.quietNamed': '嗯，{name}。',
      'bubble.running': '开始忙啦，我在旁边守着你。',
      'bubble.waiting': '需要你看一下这边哦。',
      'bubble.done': '这一轮做完啦，辛苦你了。',
      'bubble.drag': '轻一点放我下来～',
      'aria.pet': '和桌宠互动',
      'aria.settings': '打开鲸屿手帐',
      'aria.hide': '让她去休息',
      'aria.close': '合上手帐',
      'aria.delete': '删除这个角色',
      'aria.importFolder': '导入 Codex 角色包',
      'aria.importImage': '导入一张图片',
      'settings.title': '鲸屿手帐',
      'settings.subtitle': '把一小片海，养在 Harness 的角落里。',
      'settings.characters': '同行者',
      'settings.charactersHint': '选一位此刻陪着你的人。',
      'settings.customEmpty': '还没有导入角色。',
      'settings.identity': '名字与称呼',
      'settings.identityHint': '让她知道该怎么叫你。',
      'settings.nickname': '给她的名字',
      'settings.nicknamePlaceholder': '留空就用原名',
      'settings.nicknameHint': '只属于你的叫法。',
      'settings.userName': '她怎么称呼你',
      'settings.userNamePlaceholder': '你的名字（可选）',
      'settings.userNameHint': '会出现在她的悄悄话里。',
      'settings.tone': '她的性子',
      'settings.toneHint': '换一种她回应你的语气。',
      'tone.gentle': '温柔',
      'tone.gentleHint': '慢慢来',
      'tone.bright': '元气',
      'tone.brightHint': '给你打气',
      'tone.quiet': '安静',
      'tone.quietHint': '字少一点',
      'settings.palette': '今天的海色',
      'settings.paletteHint': '把她身边的光也一起换掉。',
      'accent.tide': '潮汐蓝',
      'accent.dusk': '暮光紫',
      'accent.mint': '海盐青',
      'accent.shell': '樱贝粉',
      'settings.importFolder': '迎接新伙伴',
      'settings.importImage': '带一张照片',
      'settings.importing': '正在读取…',
      'settings.importHint': 'Codex 角色包需要 pet.json + spritesheet.webp；图片支持 PNG / GIF / WebP。',
      'settings.imported': '已加入：',
      'settings.importError': '导入失败：',
      'settings.size': '存在感',
      'settings.sizeHint': '让她更轻巧，或者更醒目一点。',
      'settings.behavior': '相处方式',
      'settings.bubbles': '悄悄话',
      'settings.bubblesHint': '偶尔说句话，也会回应你的点击。',
      'settings.sound': '轻声回应',
      'settings.soundHint': '点击她时，轻轻应你一声。',
      'settings.reactive': '跟着工作节奏',
      'settings.reactiveHint': '你忙起来时，她会在旁边跑动。',
      'settings.position': '落脚点',
      'settings.positionHint': '也可以直接拖动她。',
      'settings.cornerLeft': '左下',
      'settings.cornerRight': '右下',
      'settings.cornerTop': '右上',
      'settings.reset': '恢复初始',
      'settings.done': '完成',
      'settings.hide': '让她去休息',
      'settings.restore': '叫她回来',
      'settings.localOnly': '只存在这台设备',
      'settings.by': '形象：',
      'settings.formatNote': '她的图集遵循 Codex Pet 8×9 / 8×11 规格。所有素材都只留在这台设备。',
      'tag.builtin': '鲸屿常驻',
      'tag.codex': 'Codex 图集',
      'tag.image': '照片',
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
      'brand.eyebrow': 'WHALE ISLE',
      'pet.whaleGirl.name': 'Jingxi',
      'pet.whaleGirl.source': 'Classic Whale Girl',
      'pet.whaleGirl.desc': 'The classic DeepSeek whale girl from the balance widget, quietly keeping you company.',
      'pet.deepseekGirl.name': 'DeepSeek Girl',
      'pet.deepseekGirl.source': 'Deepsea Whale Girl',
      'pet.deepseekGirl.desc': 'A blue-haired DeepSeek whale girl with fins and a whale tail, from the Codex Pet community.',
      'pet.whalechan.name': 'Whalechan',
      'pet.whalechan.source': 'Blue Whale Maid',
      'pet.whalechan.desc': 'A super-deformed blue whale maid with a little notebook, keeping you company in Harness.',
      'bubble.morning': 'Morning. Let us take today gently.',
      'bubble.forenoon': 'Good morning. Remember to sip some water.',
      'bubble.noon': 'It is noon. Please have a proper lunch.',
      'bubble.afternoon': 'Good afternoon. Time for a little stretch.',
      'bubble.evening': 'Good evening. You did well today.',
      'bubble.night': 'It is late. Finish up and get some rest.',
      'bubble.welcome': 'I am {pet}. Hold me to move me around, or tap me for a reply.',
      'bubble.welcomeNamed': '{name}, I am {pet}. Let us take good care of today.',
      'bubble.gentle1': 'You poked me!',
      'bubble.gentle2': 'I am right here. Take your time.',
      'bubble.gentle3': 'Even busy people deserve a break.',
      'bubble.gentle4': 'You look nice when you are focused.',
      'bubble.gentle5': 'A secret: you are already doing great.',
      'bubble.gentleNamed': 'I am here, {name}.',
      'bubble.bright1': 'You called! Time to shine.',
      'bubble.bright2': 'Look up. A little energy refill for you.',
      'bubble.bright3': 'One small step, then praise yourself.',
      'bubble.bright4': 'Work is better with a little whale nearby.',
      'bubble.brightNamed': 'Go, {name}!',
      'bubble.quiet1': 'Mm, I am here.',
      'bubble.quiet2': 'No rush.',
      'bubble.quiet3': 'Take one breath first.',
      'bubble.quiet4': 'I will stay a while.',
      'bubble.quietNamed': 'Mm, {name}.',
      'bubble.running': 'Off to work. I will keep watch from here.',
      'bubble.waiting': 'This part needs your attention.',
      'bubble.done': 'That round is done. Nice work.',
      'bubble.drag': 'Easy does it!',
      'aria.pet': 'Interact with the desktop pet',
      'aria.settings': 'Open the Whale Isle journal',
      'aria.hide': 'Let the pet rest',
      'aria.close': 'Close the journal',
      'aria.delete': 'Delete this character',
      'aria.importFolder': 'Import a Codex pet package',
      'aria.importImage': 'Import a single image',
      'settings.title': 'Whale Isle Journal',
      'settings.subtitle': 'A little piece of the sea, living inside Harness.',
      'settings.characters': 'Companions',
      'settings.charactersHint': 'Choose who keeps you company right now.',
      'settings.customEmpty': 'No imported characters yet.',
      'settings.identity': 'Names',
      'settings.identityHint': 'Let her know how to call you.',
      'settings.nickname': 'Her name',
      'settings.nicknamePlaceholder': 'Leave blank to keep the original',
      'settings.nicknameHint': 'A name only you use.',
      'settings.userName': 'What should she call you?',
      'settings.userNamePlaceholder': 'Your name (optional)',
      'settings.userNameHint': 'It will show up in her whispers.',
      'settings.tone': 'Her temperament',
      'settings.toneHint': 'Change the way she answers you.',
      'tone.gentle': 'Gentle',
      'tone.gentleHint': 'Take it slow',
      'tone.bright': 'Bright',
      'tone.brightHint': 'A little boost',
      'tone.quiet': 'Quiet',
      'tone.quietHint': 'Fewer words',
      'settings.palette': 'Today’s sea',
      'settings.paletteHint': 'Change the light around her too.',
      'accent.tide': 'Tide Blue',
      'accent.dusk': 'Dusk Violet',
      'accent.mint': 'Sea Glass',
      'accent.shell': 'Shell Pink',
      'settings.importFolder': 'Meet someone new',
      'settings.importImage': 'Bring a photo',
      'settings.importing': 'Reading…',
      'settings.importHint': 'Codex packages need pet.json + spritesheet.webp; images can be PNG, GIF, or WebP.',
      'settings.imported': 'Added: ',
      'settings.importError': 'Import failed: ',
      'settings.size': 'Presence',
      'settings.sizeHint': 'Make her lighter, or a little more present.',
      'settings.behavior': 'Together',
      'settings.bubbles': 'Whispers',
      'settings.bubblesHint': 'A few words now and then, plus a reply when you tap.',
      'settings.sound': 'Little voice',
      'settings.soundHint': 'A soft sound when you tap her.',
      'settings.reactive': 'Follow your work',
      'settings.reactiveHint': 'She runs along while Harness works.',
      'settings.position': 'Her spot',
      'settings.positionHint': 'You can also drag her anywhere.',
      'settings.cornerLeft': 'Lower left',
      'settings.cornerRight': 'Lower right',
      'settings.cornerTop': 'Upper right',
      'settings.reset': 'Reset look',
      'settings.done': 'Done',
      'settings.hide': 'Let her rest',
      'settings.restore': 'Call her back',
      'settings.localOnly': 'Only on this device',
      'settings.by': 'Art by ',
      'settings.formatNote': 'Her atlas follows Codex Pet 8×9 / 8×11. Everything stays on this device.',
      'tag.builtin': 'Whale Isle resident',
      'tag.codex': 'Codex atlas',
      'tag.image': 'Photo',
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
      .dsp-sound { display: none !important; }
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
      .dsp-stage:focus-visible { outline: 2px solid var(--dsp-accent, var(--dsw-focus-ring-color, #5b7cfa)); outline-offset: 4px; }
      .dsp-ground {
        position: absolute;
        z-index: 0;
        left: 50%;
        bottom: 1.5%;
        width: 62%;
        height: 10%;
        border-radius: 50%;
        background: radial-gradient(ellipse at center, rgba(26, 49, 91, .22), rgba(26, 49, 91, 0) 70%);
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
        object-position: 50% 100%;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
        filter: drop-shadow(0 8px 9px rgba(31, 21, 13, .18));
      }
      .dsp-is-portrait .dsp-art {
        filter: drop-shadow(0 9px 14px rgba(25, 45, 92, .26));
      }
      .dsp-is-portrait .dsp-ground {
        width: 68%;
        height: 12%;
        background: radial-gradient(ellipse at center, var(--dsp-accent-glow, rgba(64, 111, 196, .33)), transparent 70%);
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
        color: var(--dsp-accent, #e9b94f);
        font-size: 18px;
        line-height: 1;
        opacity: 0;
        pointer-events: none;
        text-shadow: 0 2px 10px var(--dsp-accent-glow, rgba(153, 99, 16, .2));
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
      .dsp-tool:hover { border-color: color-mix(in srgb, var(--dsp-accent) 42%, var(--dsw-alias-border-l2, rgba(255,255,255,.16))); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.17)); color: var(--dsp-accent); transform: translateY(-1px); }
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
        padding: 18px;
        background:
          radial-gradient(ellipse at 78% 8%, var(--dsp-accent-soft), transparent 52%),
          var(--dsw-alias-bg-mask-2, rgba(4, 8, 18, .62));
        backdrop-filter: blur(7px);
        pointer-events: auto;
      }
      .dsp-dialog {
        position: relative;
        width: min(880px, calc(100vw - 34px));
        height: min(800px, calc(100vh - 36px));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--dsp-accent) 22%, var(--dsw-alias-border-l2, rgba(255,255,255,.15)));
        border-radius: 24px;
        background:
          radial-gradient(120% 70% at 18% 0%, var(--dsp-accent-soft), transparent 55%),
          var(--dsw-alias-bg-layer-1, #202020);
        color: var(--dsw-alias-label-primary, #f5f5f5);
        box-shadow: 0 34px 100px -28px rgba(0,0,0,.78), inset 0 1px 0 rgba(255,255,255,.06);
        animation: dsp-dialog-in .28s cubic-bezier(.2,.8,.25,1) both;
      }
      .dsp-dialog:focus { outline: none; }
      .dsp-root button:focus-visible, .dsp-root [role="button"]:focus-visible {
        outline: 2px solid var(--dsp-accent);
        outline-offset: 2px;
      }
      .dsp-dialog-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        padding: 23px 26px 18px;
        flex: none;
      }
      .dsp-brand { display: flex; align-items: flex-start; gap: 13px; min-width: 0; }
      .dsp-brand-mark {
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        flex: none;
        padding-bottom: 6px;
        border: 1px solid color-mix(in srgb, var(--dsp-accent) 34%, var(--dsw-alias-border-l2, rgba(255,255,255,.15)));
        border-radius: 13px;
        background:
          linear-gradient(145deg, color-mix(in srgb, var(--dsp-accent) 30%, transparent), transparent 74%),
          var(--dsw-alias-bg-layer-2, #2b2b2b);
        color: var(--dsp-accent);
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        box-shadow: 0 8px 22px -14px var(--dsp-accent-glow);
      }
      .dsp-brand-copy { min-width: 0; }
      .dsp-eyebrow {
        display: block;
        margin-bottom: 7px;
        color: var(--dsp-accent);
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: .26em;
        line-height: 1;
      }
      .dsp-brand-copy h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -.6px;
        line-height: 1.2;
      }
      .dsp-brand-copy p {
        margin: 5px 0 0;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        font-size: 10.5px;
        line-height: 1.45;
      }
      .dsp-dialog-close {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 10px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        cursor: pointer;
        transition: background .15s ease, border-color .15s ease, color .15s ease;
      }
      .dsp-dialog-close:hover {
        border-color: var(--dsw-alias-border-l2, rgba(255,255,255,.15));
        background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.17));
        color: var(--dsw-alias-label-primary, #fff);
      }
      .dsp-dialog-close .dsp-icon { width: 16px; height: 16px; }
      .dsp-body {
        display: grid;
        grid-template-columns: 236px minmax(0, 1fr);
        gap: 20px;
        flex: 1;
        min-height: 0;
        padding: 0 26px;
      }
      .dsp-preview-panel {
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 15px;
        overflow-x: hidden;
        overflow-y: auto;
        border: 1px solid color-mix(in srgb, var(--dsp-accent) 16%, var(--dsw-alias-border-l2, rgba(255,255,255,.15)));
        border-radius: 18px;
        background:
          linear-gradient(180deg, color-mix(in srgb, var(--dsp-accent) 9%, transparent), transparent 46%),
          var(--dsw-alias-bg-layer-2, #2b2b2b);
        scrollbar-width: thin;
      }
      .dsp-preview-stage {
        position: relative;
        display: grid;
        place-items: center;
        flex: none;
        height: 206px;
        margin-bottom: 14px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.045);
        border-radius: 14px;
        background:
          radial-gradient(circle at 50% 68%, var(--dsp-accent-soft), transparent 57%),
          linear-gradient(160deg, rgba(255,255,255,.035), transparent 52%);
      }
      .dsp-preview-stage::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 50%;
        width: 154px;
        height: 154px;
        border: 1px solid color-mix(in srgb, var(--dsp-accent) 25%, transparent);
        border-radius: 50%;
        transform: translateX(-50%);
        opacity: .85;
      }
      .dsp-preview-stage::after {
        content: "";
        position: absolute;
        bottom: 10px;
        width: 190px;
        height: 40px;
        border-radius: 50%;
        background: radial-gradient(ellipse, var(--dsp-accent-glow), transparent 72%);
        filter: blur(8px);
        opacity: .72;
      }
      .dsp-preview-orbit {
        position: absolute;
        top: 31px;
        right: 30px;
        width: 24px;
        height: 24px;
        border: 1px solid color-mix(in srgb, var(--dsp-accent) 34%, transparent);
        border-radius: 50%;
        opacity: .55;
      }
      .dsp-preview-orbit::after {
        content: "";
        position: absolute;
        top: 4px;
        right: 1px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--dsp-accent);
        box-shadow: 0 0 8px var(--dsp-accent-glow);
      }
      .dsp-preview-avatar {
        position: relative;
        z-index: 1;
        display: grid;
        place-items: center;
        width: 164px;
        height: 180px;
      }
      .dsp-preview-avatar img, .dsp-preview-avatar canvas {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      .dsp-preview-copy { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .dsp-preview-source {
        color: var(--dsp-accent);
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: .08em;
        line-height: 1.2;
      }
      .dsp-preview-name {
        margin: 0;
        overflow: hidden;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -.35px;
        line-height: 1.25;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsp-preview-desc {
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        font-size: 10px;
        line-height: 1.7;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
      .dsp-preview-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 5px 8px; margin-top: 3px; }
      .dsp-fields-preview {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 9px;
        flex: none;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
      }
      .dsp-fields-preview .dsp-input { height: 33px; }
      .dsp-fields-preview .dsp-field-hint { font-size: 7.5px; }
      .dsp-chip {
        padding: 3px 7px;
        border-radius: 999px;
        background: var(--dsp-accent-soft);
        color: var(--dsp-accent);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .03em;
      }
      .dsp-preview-author { color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 8px; }
      .dsp-preview-note {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: auto 0 0;
        padding-top: 14px;
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 8px;
        letter-spacing: .04em;
      }
      .dsp-preview-note::before {
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--dsp-accent);
        opacity: .8;
      }
      .dsp-controls {
        min-width: 0;
        overflow-y: auto;
        padding: 1px 7px 10px 1px;
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb, var(--dsp-accent) 30%, transparent) transparent;
      }
      .dsp-section {
        margin: 0 0 17px;
        padding: 0 0 17px;
        border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
      }
      .dsp-section:last-of-type { border-bottom: 0; }
      .dsp-section-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }
      .dsp-section-copy { min-width: 0; }
      .dsp-section-title { margin: 0; font-size: 12px; font-weight: 700; letter-spacing: .01em; }
      .dsp-section-hint {
        margin: 3px 0 0;
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 9.5px;
        line-height: 1.5;
      }
      .dsp-value {
        color: var(--dsp-accent);
        font-size: 10px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .dsp-gallery {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 1px 7px;
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb, var(--dsp-accent) 28%, transparent) transparent;
      }
      .dsp-card {
        position: relative;
        flex: 0 0 126px;
        min-width: 0;
        overflow: hidden;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.12));
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-2, #2b2b2b);
        transition: border-color .16s ease, background .16s ease, transform .16s ease;
      }
      .dsp-card:hover {
        border-color: color-mix(in srgb, var(--dsp-accent) 38%, var(--dsw-alias-border-l3, rgba(255,255,255,.22)));
        transform: translateY(-2px);
      }
      .dsp-card.is-selected {
        border-color: var(--dsp-accent);
        background:
          linear-gradient(180deg, var(--dsp-accent-soft), transparent 82%),
          var(--dsw-alias-bg-layer-2, #2b2b2b);
        box-shadow: 0 0 0 1px var(--dsp-accent), 0 8px 22px -18px var(--dsp-accent-glow);
      }
      .dsp-card-main {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 7px;
        width: 100%;
        padding: 7px;
        border: 0;
        background: transparent;
        text-align: left;
        cursor: pointer;
      }
      .dsp-thumb {
        display: grid;
        place-items: center;
        width: 100%;
        height: 72px;
        overflow: hidden;
        border-radius: 10px;
        background:
          radial-gradient(circle at 50% 58%, var(--dsp-accent-soft), transparent 66%),
          var(--dsw-alias-bg-layer-3, #333);
      }
      .dsp-thumb img, .dsp-thumb canvas {
        display: block;
        width: auto;
        height: auto;
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        pointer-events: none;
      }
      .dsp-card-copy { display: flex; flex-direction: column; gap: 2px; min-width: 0; padding: 0 2px 2px; }
      .dsp-card-copy strong {
        overflow: hidden;
        color: var(--dsw-alias-label-primary, #f5f5f5);
        font-size: 10.5px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsp-card-copy span {
        overflow: hidden;
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsp-card-check {
        position: absolute;
        top: 7px;
        right: 7px;
        display: grid;
        place-items: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dsp-accent);
        color: #08111f;
        font-size: 10px;
        font-weight: 800;
        box-shadow: 0 3px 8px rgba(0,0,0,.3);
      }
      .dsp-card-delete {
        position: absolute;
        top: 6px;
        left: 6px;
        display: grid;
        place-items: center;
        width: 20px;
        height: 20px;
        padding: 0;
        border: 0;
        border-radius: 7px;
        background: rgba(10,14,24,.5);
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        cursor: pointer;
        opacity: 0;
        transition: opacity .15s ease, background .15s ease, color .15s ease;
      }
      .dsp-card:hover .dsp-card-delete, .dsp-card-delete:focus-visible { opacity: 1; }
      .dsp-card-delete:hover {
        background: var(--dsw-alias-interactive-bg-hover-danger, rgba(220,80,70,.16));
        color: var(--dsw-alias-state-error-primary, #f08d86);
      }
      .dsp-card-delete .dsp-icon { width: 12px; height: 12px; }
      .dsp-import-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 2px; }
      .dsp-import-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-height: 35px;
        padding: 7px 9px;
        border: 1px dashed color-mix(in srgb, var(--dsp-accent) 24%, var(--dsw-alias-border-l2, rgba(255,255,255,.18)));
        border-radius: 10px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #c9c9c9);
        font-size: 9.5px;
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease, color .15s ease;
      }
      .dsp-import-btn:hover {
        border-color: color-mix(in srgb, var(--dsp-accent) 48%, var(--dsw-alias-border-l3, rgba(255,255,255,.3)));
        background: var(--dsp-accent-soft);
        color: var(--dsw-alias-label-primary, #fff);
      }
      .dsp-import-btn:disabled { opacity: .55; cursor: wait; }
      .dsp-import-btn .dsp-icon { width: 13px; height: 13px; }
      .dsp-import-hint {
        margin: 7px 1px 0;
        color: var(--dsw-alias-label-tertiary, #888);
        font-size: 8.5px;
        line-height: 1.55;
      }
      .dsp-import-status {
        margin: 8px 0 0;
        padding: 7px 9px;
        border-radius: 8px;
        background: var(--dsw-alias-state-success-tertiary, rgba(50,160,100,.12));
        color: var(--dsw-alias-state-success-primary, #73cf9d);
        font-size: 9px;
      }
      .dsp-import-status.is-error {
        background: var(--dsw-alias-state-error-secondary, rgba(220,80,70,.12));
        color: var(--dsw-alias-state-error-primary, #f49089);
      }
      .dsp-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .dsp-fields.dsp-fields-preview { grid-template-columns: minmax(0, 1fr); gap: 9px; }
      .dsp-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
      .dsp-field-label {
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        font-size: 9px;
        font-weight: 600;
      }
      .dsp-input {
        width: 100%;
        height: 35px;
        padding: 0 11px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.14));
        border-radius: 10px;
        background: var(--dsw-alias-bg-layer-2, #2b2b2b);
        color: var(--dsw-alias-label-primary, #f5f5f5);
        font: inherit;
        font-size: 10.5px;
        outline: none;
        transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
      }
      .dsp-input::placeholder { color: var(--dsw-alias-label-tertiary, #8e8e8e); opacity: .75; }
      .dsp-input:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.22)); }
      .dsp-dialog .dsp-input:focus-visible {
        outline: none;
        border-color: var(--dsp-accent);
        box-shadow: 0 0 0 3px var(--dsp-accent-soft);
      }
      .dsp-field-hint {
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 8px;
        line-height: 1.45;
      }
      .dsp-tones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 13px; }
      .dsp-tone {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 9px 10px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.12));
        border-radius: 10px;
        background: transparent;
        text-align: left;
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease, transform .15s ease;
      }
      .dsp-tone:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.22)); transform: translateY(-1px); }
      .dsp-tone strong { color: var(--dsw-alias-label-primary, #f5f5f5); font-size: 10.5px; font-weight: 600; }
      .dsp-tone span { color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 8.5px; }
      .dsp-tone.is-selected {
        border-color: var(--dsp-accent);
        background: var(--dsp-accent-soft);
      }
      .dsp-tone.is-selected span { color: color-mix(in srgb, var(--dsp-accent) 72%, var(--dsw-alias-label-secondary, #b7b7b7)); }
      .dsp-subhead {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
        margin: 0 0 7px;
      }
      .dsp-subhead span { font-size: 9px; font-weight: 600; color: var(--dsw-alias-label-secondary, #b7b7b7); }
      .dsp-subhead small { color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 8px; }
      .dsp-palette { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
      .dsp-swatch {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        padding: 6px 7px;
        border: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 8px;
        text-align: left;
        cursor: pointer;
      }
      .dsp-swatch:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.22)); }
      .dsp-swatch.is-selected {
        border-color: var(--dsp-swatch);
        background: color-mix(in srgb, var(--dsp-swatch) 10%, transparent);
        color: var(--dsw-alias-label-primary, #f5f5f5);
      }
      .dsp-swatch-dot {
        width: 10px;
        height: 10px;
        flex: none;
        border-radius: 50%;
        background: var(--dsp-swatch);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsp-swatch) 18%, transparent);
      }
      .dsp-range {
        width: 100%;
        height: 18px;
        margin: 2px 0 2px;
        padding: 0;
        background: transparent;
        accent-color: var(--dsp-accent);
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
      }
      .dsp-range::-webkit-slider-runnable-track {
        height: 5px;
        border-radius: 999px;
        background:
          linear-gradient(90deg, var(--dsp-accent) 0%, var(--dsp-accent) var(--dsp-range-fill, 50%), rgba(127,127,127,.22) var(--dsp-range-fill, 50%));
      }
      .dsp-range::-webkit-slider-thumb {
        width: 14px;
        height: 14px;
        margin-top: -4.5px;
        border: 2px solid var(--dsp-accent);
        border-radius: 50%;
        background: #f8fbff;
        box-shadow: 0 2px 9px var(--dsp-accent-glow);
        -webkit-appearance: none;
        appearance: none;
      }
      .dsp-range:focus-visible { outline: none; }
      .dsp-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--dsp-accent-soft), 0 2px 9px var(--dsp-accent-glow); }
      .dsp-under { margin-top: 4px; }
      .dsp-toggle-group {
        padding: 0 12px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.12));
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-2, #2b2b2b);
      }
      .dsp-row {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 11px 0;
        border: 0;
        border-top: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
        background: transparent;
        text-align: left;
        cursor: pointer;
      }
      .dsp-row:first-child { border-top: 0; }
      .dsp-row-copy { min-width: 0; flex: 1; }
      .dsp-row-copy strong { display: block; font-size: 10.5px; font-weight: 600; }
      .dsp-row-copy span { display: block; margin-top: 2px; color: var(--dsw-alias-label-tertiary, #8e8e8e); font-size: 8.5px; }
      .dsp-switch {
        position: relative;
        width: 34px;
        height: 20px;
        flex: none;
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-3, #454545);
        transition: background .16s ease;
      }
      .dsp-switch::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--dsw-alias-switch-thumb, #fff);
        box-shadow: 0 1px 3px rgba(0,0,0,.25);
        transition: transform .16s ease;
      }
      .dsp-row[aria-checked="true"] .dsp-switch { background: var(--dsp-accent); }
      .dsp-row[aria-checked="true"] .dsp-switch::after { transform: translateX(14px); }
      .dsp-corners { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
      .dsp-corner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        height: 38px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.12));
        border-radius: 10px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        font-size: 9.5px;
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease, color .15s ease;
      }
      .dsp-corner:hover { border-color: var(--dsw-alias-border-l3, rgba(255,255,255,.22)); color: var(--dsw-alias-label-primary, #f5f5f5); }
      .dsp-corner.is-active { border-color: var(--dsp-accent); background: var(--dsp-accent-soft); color: var(--dsw-alias-label-primary, #f5f5f5); }
      .dsp-corner-icon {
        position: relative;
        width: 16px;
        height: 16px;
        flex: none;
        border: 1px solid var(--dsw-alias-border-l3, rgba(255,255,255,.22));
        border-radius: 4px;
      }
      .dsp-corner-icon i {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--dsp-accent);
        opacity: .65;
      }
      .dsp-corner-icon.is-left i { left: 3px; bottom: 3px; }
      .dsp-corner-icon.is-right i { right: 3px; bottom: 3px; }
      .dsp-corner-icon.is-top i { top: 3px; right: 3px; }
      .dsp-corner.is-active .dsp-corner-icon { border-color: var(--dsp-accent); }
      .dsp-corner.is-active .dsp-corner-icon i { opacity: 1; box-shadow: 0 0 7px var(--dsp-accent-glow); }
      .dsp-format-note {
        margin: 0;
        padding-top: 2px;
        color: var(--dsw-alias-label-tertiary, #838383);
        font-size: 8px;
        line-height: 1.55;
      }
      .dsp-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex: none;
        padding: 13px 26px 16px;
        border-top: 1px solid var(--dsw-alias-border-l1, rgba(255,255,255,.07));
      }
      .dsp-reset {
        padding: 6px 0;
        border: 0;
        background: transparent;
        color: var(--dsw-alias-label-tertiary, #8e8e8e);
        font-size: 9px;
        text-decoration: underline;
        text-decoration-color: color-mix(in srgb, var(--dsp-accent) 35%, transparent);
        text-underline-offset: 3px;
        cursor: pointer;
      }
      .dsp-reset:hover { color: var(--dsw-alias-label-secondary, #b7b7b7); }
      .dsp-foot-actions { display: flex; align-items: center; gap: 8px; }
      .dsp-ghost {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 34px;
        padding: 0 12px;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255,255,255,.15));
        border-radius: 10px;
        background: transparent;
        color: var(--dsw-alias-label-secondary, #b7b7b7);
        font-size: 9px;
        cursor: pointer;
      }
      .dsp-ghost:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14)); color: var(--dsw-alias-label-primary, #fff); }
      .dsp-ghost .dsp-icon { width: 13px; height: 13px; }
      .dsp-dialog .dsp-primary {
        height: 34px;
        padding: 0 20px;
        border: 0;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--dsp-accent), color-mix(in srgb, var(--dsp-accent) 62%, #d8ebff));
        color: #08111f;
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: .02em;
        cursor: pointer;
        box-shadow: 0 8px 18px -10px var(--dsp-accent-glow);
      }
      .dsp-dialog .dsp-primary:hover { filter: brightness(1.06); transform: translateY(-1px); }
      @media (max-width: 760px) {
        .dsp-modal-layer { padding: 10px; }
        .dsp-dialog { width: calc(100vw - 20px); height: calc(100vh - 20px); border-radius: 20px; }
        .dsp-dialog-head { padding: 18px 18px 14px; }
        .dsp-body { display: block; overflow-y: auto; padding: 0 18px; }
        .dsp-preview-panel {
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px;
        }
        .dsp-preview-copy { flex: 1; }
        .dsp-fields-preview {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          flex: 1 0 100%;
          margin-top: 2px;
        }
        .dsp-preview-stage { width: 108px; height: 112px; flex: none; margin: 0; }
        .dsp-preview-stage::before { width: 84px; height: 84px; }
        .dsp-preview-stage::after { width: 100px; height: 26px; }
        .dsp-preview-orbit { top: 12px; right: 10px; width: 18px; height: 18px; }
        .dsp-preview-avatar { width: 96px; height: 104px; }
        .dsp-preview-copy { gap: 4px; }
        .dsp-preview-name { font-size: 15px; }
        .dsp-preview-desc { font-size: 9px; -webkit-line-clamp: 2; }
        .dsp-preview-note { display: none; }
        .dsp-controls { overflow: visible; padding: 0; }
        .dsp-fields { grid-template-columns: minmax(0, 1fr); }
        .dsp-fields-preview { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dsp-foot { padding: 12px 18px 15px; }
        .dsp-brand-copy p { display: none; }
      }
      @media (max-width: 520px) {
        .dsp-palette { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dsp-tones { grid-template-columns: minmax(0, 1fr); }
        .dsp-gallery { gap: 6px; }
        .dsp-card { flex-basis: 116px; }
        .dsp-foot { gap: 8px; }
        .dsp-reset { font-size: 8px; }
        .dsp-ghost { padding: 0 9px; }
        .dsp-dialog .dsp-primary { padding: 0 14px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dsp-pet, .dsp-art-wrap, .dsp-sparkle, .dsp-dialog { animation: none !important; }
        .dsp-toolbar, .dsp-card, .dsp-import-btn, .dsp-tone, .dsp-dialog { transition: none !important; }
      }
      @keyframes dsp-arrive { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes dsp-dialog-in { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes dsp-breathe { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3px) scale(1.005); } }
      @keyframes dsp-run-bob { 0%,100% { transform: translateY(0) rotate(-1.3deg); } 50% { transform: translateY(-5px) rotate(1.8deg); } }
      @keyframes dsp-wait { 0%,100% { transform: rotate(0) translateY(0); } 50% { transform: rotate(-2.3deg) translateY(-2px); } }
      @keyframes dsp-review { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(1.2deg); } }
      @keyframes dsp-boop { 0% { transform: scale(1); } 20% { transform: translateY(4px) scale(1.06,.94); } 54% { transform: translateY(-9px) scale(.97,1.04); } 78% { transform: translateY(1px) scale(1.01,.99); } 100% { transform: translateY(0) scale(1); } }
      @keyframes dsp-sparkle-pop { 0% { opacity: 0; transform: scale(.4) rotate(0); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-13px) scale(1.15) rotate(35deg); } }
    `

    const DEFAULT_SETTINGS = {
      selectedId: DEFAULT_PET_ID,
      scale: 1,
      bubbles: true,
      sound: true,
      reactive: true,
      hidden: false,
      x: null,
      y: null,
      nicknames: {},
      userName: '',
      tone: 'gentle',
      accent: 'tide'
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

    function normalizeNicknames(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
      const result = {}
      for (const [key, name] of Object.entries(value)) {
        if (typeof name !== 'string') continue
        const cleaned = cleanText(name, 12)
        if (key && cleaned) result[key] = cleaned
      }
      return result
    }

    function loadSettings() {
      try {
        const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null')
        if (!raw || typeof raw !== 'object') return { ...DEFAULT_SETTINGS }
        return {
          selectedId: typeof raw.selectedId === 'string' ? raw.selectedId : DEFAULT_PET_ID,
          scale: Number.isFinite(Number(raw.scale)) ? clamp(Number(raw.scale), 0.65, 1.35) : 1,
          bubbles: raw.bubbles !== false,
          sound: raw.sound !== false,
          reactive: raw.reactive !== false,
          hidden: raw.hidden === true,
          x: Number.isFinite(Number(raw.x)) ? Number(raw.x) : null,
          y: Number.isFinite(Number(raw.y)) ? Number(raw.y) : null,
          nicknames: normalizeNicknames(raw.nicknames),
          userName: cleanText(raw.userName, 12),
          tone: TONES.includes(raw.tone) ? raw.tone : 'gentle',
          accent: Object.hasOwn(ACCENTS, raw.accent) ? raw.accent : 'tide'
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
      if (pet.builtin) return t('tag.builtin')
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
        wave: [
          h('path', {
            key: 'a',
            d: 'M3.5 9.5c2.4 0 2.4-3 4.8-3s2.4 3 4.8 3 2.4-3 4.8-3 2.4 3 4.8 3'
          }),
          h('path', {
            key: 'b',
            d: 'M3.5 14.5c2.4 0 2.4-3 4.8-3s2.4 3 4.8 3 2.4-3 4.8-3 2.4 3 4.8 3'
          })
        ],
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

    function PetThumb({ pet }) {
      const canvasRef = useRef(null)
      const cellWidth = pet.cellWidth || 192
      const cellHeight = pet.cellHeight || 208

      useEffect(() => {
        if (pet.kind !== 'sheet' || !canvasRef.current) return
        let cancelled = false
        const img = new Image()
        img.onload = () => {
          if (cancelled || !canvasRef.current) return
          const ctx = canvasRef.current.getContext('2d')
          if (!ctx) return
          const zoom = 0.8
          const sourceWidth = cellWidth * zoom
          const sourceHeight = cellHeight * zoom
          ctx.clearRect(0, 0, cellWidth, cellHeight)
          ctx.drawImage(
            img,
            (cellWidth - sourceWidth) / 2,
            (cellHeight - sourceHeight) / 2,
            sourceWidth,
            sourceHeight,
            0,
            0,
            cellWidth,
            cellHeight
          )
        }
        img.src = pet.url
        return () => {
          cancelled = true
          img.onload = null
        }
      }, [pet.url, pet.kind, cellWidth, cellHeight])

      if (pet.kind === 'sheet') {
        return h('canvas', {
          ref: canvasRef,
          width: cellWidth,
          height: cellHeight,
          'aria-label': pet.name
        })
      }
      return h('img', { src: pet.url, alt: '', draggable: false })
    }

    function SpriteCanvas({ pet, state }) {
      const canvasRef = useRef(null)
      const cellWidth = pet.cellWidth || 192
      const cellHeight = pet.cellHeight || 208

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
          ctx.drawImage(
            img,
            frame * cellWidth,
            spec.row * cellHeight,
            cellWidth,
            cellHeight,
            0,
            0,
            canvas.width,
            canvas.height
          )
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
      }, [pet.url, state, cellWidth, cellHeight])

      return h('canvas', {
        ref: canvasRef,
        className: 'dsp-sheet',
        width: cellWidth,
        height: cellHeight,
        'aria-hidden': true
      })
    }

    function PetArtwork({ pet, state, dragging }) {
      const stateClass =
        state === 'running'
          ? ' dsp-is-running'
          : state === 'waiting'
            ? ' dsp-is-waiting'
            : state === 'review'
              ? ' dsp-is-review'
              : ''

      const art =
        pet.kind === 'sheet'
          ? h(SpriteCanvas, { pet, state })
          : h('img', {
              className: 'dsp-art',
              src: pet.url,
              alt: '',
              draggable: false
            })

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

    function displayNameFor(pet, nicknames) {
      const nickname = pet && nicknames ? nicknames[pet.id] : ''
      return nickname || (pet && pet.name) || ''
    }

    function SectionHead({ title, hint, trailing }) {
      return h(
        'div',
        { className: 'dsp-section-head' },
        h(
          'div',
          { className: 'dsp-section-copy' },
          h('h3', { className: 'dsp-section-title' }, title),
          hint ? h('p', { className: 'dsp-section-hint' }, hint) : null
        ),
        trailing || null
      )
    }

    function PetCard({ pet, selected, displayName, onSelect, onDelete, t }) {
      const subtitle = pet.builtin && pet.sourceKey ? t(pet.sourceKey) : tagFor(pet, t)
      return h(
        'div',
        { className: `dsp-card${selected ? ' is-selected' : ''}` },
        h(
          'button',
          {
            type: 'button',
            className: 'dsp-card-main',
            onClick: onSelect,
            'aria-pressed': selected,
            'aria-label': `${displayName} · ${subtitle}`
          },
          h('span', { className: 'dsp-thumb' }, h(PetThumb, { pet })),
          h(
            'span',
            { className: 'dsp-card-copy' },
            h('strong', null, displayName),
            h('span', null, subtitle)
          )
        ),
        selected ? h('span', { className: 'dsp-card-check', 'aria-hidden': true }, '✓') : null,
        !pet.builtin
          ? h(
              'button',
              {
                type: 'button',
                className: 'dsp-card-delete',
                title: t('aria.delete'),
                'aria-label': `${t('aria.delete')}: ${displayName}`,
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
      const pressSoundRef = useRef(null)
      const releaseSoundRef = useRef(null)
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

      const builtinPets = useMemo(
        () => [
          {
            id: 'whale-girl',
            kind: 'image',
            builtin: true,
            portrait: true,
            url: WHALE_GIRL_IMAGE,
            name: t('pet.whaleGirl.name'),
            sourceKey: 'pet.whaleGirl.source',
            description: t('pet.whaleGirl.desc'),
            author: 'MeteorNOX / EthanMaven',
            createdAt: 0
          },
          {
            id: 'deepseek-girl',
            kind: 'sheet',
            builtin: true,
            url: DEEPSEEK_GIRL_SHEET,
            cellWidth: BUILTIN_CELL_WIDTH,
            cellHeight: BUILTIN_CELL_HEIGHT,
            spriteVersion: 2,
            name: t('pet.deepseekGirl.name'),
            sourceKey: 'pet.deepseekGirl.source',
            description: t('pet.deepseekGirl.desc'),
            author: 'legeling',
            createdAt: 0
          },
          {
            id: 'deepseek-whalechan',
            kind: 'sheet',
            builtin: true,
            url: DEEPSEEK_WHALECHAN_SHEET,
            cellWidth: BUILTIN_CELL_WIDTH,
            cellHeight: BUILTIN_CELL_HEIGHT,
            spriteVersion: 2,
            name: t('pet.whalechan.name'),
            sourceKey: 'pet.whalechan.source',
            description: t('pet.whalechan.desc'),
            author: 'qimi',
            createdAt: 0
          }
        ],
        [t]
      )

      const allPets = useMemo(() => [...builtinPets, ...customPets], [builtinPets, customPets])
      const selectedPet = useMemo(
        () => allPets.find((pet) => pet.id === settings.selectedId) || builtinPets[0],
        [allPets, settings.selectedId, builtinPets]
      )
      const selectedName = displayNameFor(selectedPet, settings.nicknames)
      const selectedNickname = (settings.nicknames && settings.nicknames[selectedPet.id]) || ''
      const accent = ACCENTS[settings.accent] || ACCENTS.tide
      const themeVars = useMemo(
        () => ({
          '--dsp-accent': accent.base,
          '--dsp-accent-soft': accent.soft,
          '--dsp-accent-glow': accent.glow
        }),
        [accent]
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
      const activeCorner = petY <= 24 ? 'top' : petX < viewport.width / 2 ? 'left' : 'right'

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
        if (!allPets.some((pet) => pet.id === settings.selectedId)) {
          setSettings((current) => ({ ...current, selectedId: DEFAULT_PET_ID }))
        }
      }, [petsReady, allPets, settings.selectedId])

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
          const welcome = (settings.userName ? t('bubble.welcomeNamed') : t('bubble.welcome'))
            .replaceAll('{pet}', () => selectedName)
            .replaceAll('{name}', () => settings.userName)
          say(first ? `${base} ${welcome}` : base, first ? 7600 : 5200)
          try {
            localStorage.setItem(GREETED_KEY, '1')
          } catch {}
        }, 800)
        return () => window.clearTimeout(timer)
      }, [say, settings.bubbles, settings.hidden, settings.userName, selectedName, t])

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

      const sayClick = useCallback(() => {
        const tone = TONES.includes(settings.tone) ? settings.tone : 'gentle'
        const lines = (TONE_LINES[tone] || TONE_LINES.gentle).map((key) => t(key)).filter(Boolean)
        if (settings.userName) {
          lines.push(t(`bubble.${tone}Named`).replaceAll('{name}', () => settings.userName))
        }
        const line = pickRandom(lines, lastClickLine.current)
        lastClickLine.current = line
        say(line, 4800)
      }, [say, settings.tone, settings.userName, t])

      const playPetSound = useCallback(() => {
        if (!settings.sound) return
        const press = pressSoundRef.current
        const release = releaseSoundRef.current
        if (!press || !release) return
        try {
          release.pause()
          release.currentTime = 0
          press.pause()
          press.currentTime = 0
          press.volume = 0.8
          release.volume = 0.8
          press.onended = () => {
            try {
              release.currentTime = 0
              const played = release.play()
              if (played && typeof played.catch === 'function') played.catch(() => {})
            } catch {}
          }
          const played = press.play()
          if (played && typeof played.catch === 'function') played.catch(() => {})
        } catch {}
      }, [settings.sound])

      const poke = useCallback(() => {
        if (settings.hidden) return
        playPetSound()
        setBoop(true)
        if (boopTimer.current) window.clearTimeout(boopTimer.current)
        boopTimer.current = window.setTimeout(() => setBoop(false), 760)
        setTransient('waving')
        if (transientTimer.current) window.clearTimeout(transientTimer.current)
        transientTimer.current = window.setTimeout(() => setTransient(null), 1350)
        sayClick()
      }, [playPetSound, sayClick, settings.hidden])

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
            setSettings((current) => {
              const nicknames = { ...(current.nicknames || {}) }
              delete nicknames[pet.id]
              return current.selectedId === pet.id
                ? { ...current, selectedId: DEFAULT_PET_ID, nicknames }
                : { ...current, nicknames }
            })
          } catch {
            setImportError(t('err.storage'))
          }
        },
        [t]
      )

      const placePet = useCallback(
        (corner) => {
          const x = corner === 'left' ? 12 : Math.max(8, viewport.width - dimensions.width - 10)
          const y =
            corner === 'top' ? 16 : Math.max(8, viewport.height - dimensions.height - BOTTOM_GAP)
          setSettings((current) => ({ ...current, x, y }))
          hideBubble()
        },
        [BOTTOM_GAP, dimensions.height, dimensions.width, hideBubble, viewport.height, viewport.width]
      )

      const resetPersonalization = useCallback(() => {
        setSettings((current) => ({
          ...current,
          scale: 1,
          bubbles: true,
          sound: true,
          reactive: true,
          tone: 'gentle',
          accent: 'tide',
          nicknames: {},
          userName: '',
          x: null,
          y: null,
          hidden: false
        }))
        hideBubble()
      }, [hideBubble])

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

      const toneOptions = [
        { id: 'gentle', label: t('tone.gentle'), hint: t('tone.gentleHint') },
        { id: 'bright', label: t('tone.bright'), hint: t('tone.brightHint') },
        { id: 'quiet', label: t('tone.quiet'), hint: t('tone.quietHint') }
      ]
      const paletteOptions = Object.entries(ACCENTS).map(([id, value]) => ({
        id,
        value,
        label: t('accent.' + id)
      }))
      const cornerOptions = [
        { id: 'left', label: t('settings.cornerLeft') },
        { id: 'right', label: t('settings.cornerRight') },
        { id: 'top', label: t('settings.cornerTop') }
      ]
      const selectedSource =
        selectedPet.builtin && selectedPet.sourceKey
          ? t(selectedPet.sourceKey)
          : tagFor(selectedPet, t)

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
                'header',
                { className: 'dsp-dialog-head' },
                h(
                  'div',
                  { className: 'dsp-brand' },
                  h('span', { className: 'dsp-brand-mark', 'aria-hidden': true }, '≈'),
                  h(
                    'div',
                    { className: 'dsp-brand-copy' },
                    h('span', { className: 'dsp-eyebrow' }, t('brand.eyebrow')),
                    h('h2', { id: 'dsp-pet-settings-title' }, t('settings.title')),
                    h('p', null, t('settings.subtitle'))
                  )
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
                'div',
                { className: 'dsp-body' },
                h(
                  'aside',
                  { className: 'dsp-preview-panel' },
                  h(
                    'div',
                    { className: 'dsp-preview-stage' },
                    h('span', { className: 'dsp-preview-orbit', 'aria-hidden': true }),
                    h('div', { className: 'dsp-preview-avatar' }, h(PetThumb, { pet: selectedPet }))
                  ),
                  h(
                    'div',
                    { className: 'dsp-preview-copy' },
                    h('span', { className: 'dsp-preview-source' }, selectedSource),
                    h('h3', { className: 'dsp-preview-name' }, selectedName),
                    h('p', { className: 'dsp-preview-desc' }, selectedPet.description),
                    h(
                      'div',
                      { className: 'dsp-preview-meta' },
                      h('span', { className: 'dsp-chip' }, tagFor(selectedPet, t)),
                      selectedPet.author
                        ? h(
                            'span',
                            { className: 'dsp-preview-author' },
                            t('settings.by') + selectedPet.author
                          )
                        : null
                    )
                  ),
                  h(
                    'div',
                    { className: 'dsp-fields dsp-fields-preview' },
                    h(
                      'label',
                      { className: 'dsp-field' },
                      h('span', { className: 'dsp-field-label' }, t('settings.nickname')),
                      h('input', {
                        className: 'dsp-input',
                        type: 'text',
                        value: selectedNickname,
                        maxLength: 12,
                        placeholder: selectedPet.name,
                        autoComplete: 'off',
                        spellCheck: false,
                        onChange: (event) => {
                          const value = event.target.value.slice(0, 12)
                          setSettings((current) => {
                            const nicknames = { ...(current.nicknames || {}) }
                            if (value.trim()) nicknames[selectedPet.id] = value
                            else delete nicknames[selectedPet.id]
                            return { ...current, nicknames }
                          })
                        }
                      }),
                      h('span', { className: 'dsp-field-hint' }, t('settings.nicknameHint'))
                    ),
                    h(
                      'label',
                      { className: 'dsp-field' },
                      h('span', { className: 'dsp-field-label' }, t('settings.userName')),
                      h('input', {
                        className: 'dsp-input',
                        type: 'text',
                        value: settings.userName,
                        maxLength: 12,
                        placeholder: t('settings.userNamePlaceholder'),
                        autoComplete: 'off',
                        spellCheck: false,
                        onChange: (event) =>
                          setSettings((current) => ({
                            ...current,
                            userName: event.target.value.slice(0, 12)
                          }))
                      }),
                      h('span', { className: 'dsp-field-hint' }, t('settings.userNameHint'))
                    )
                  ),
                  h('p', { className: 'dsp-preview-note' }, t('settings.localOnly'))
                ),
                h(
                  'div',
                  { className: 'dsp-controls' },
                  h(
                    'section',
                    { className: 'dsp-section' },
                    h(SectionHead, {
                      title: t('settings.characters'),
                      hint: t('settings.charactersHint')
                    }),
                    h(
                      'div',
                      { className: 'dsp-gallery' },
                      allPets.map((pet) =>
                        h(PetCard, {
                          key: pet.id,
                          pet,
                          displayName: displayNameFor(pet, settings.nicknames),
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
                    importMessage
                      ? h('p', { className: 'dsp-import-status' }, importMessage)
                      : null,
                    importError
                      ? h('p', { className: 'dsp-import-status is-error', role: 'alert' }, importError)
                      : null
                  ),
                  h(
                    'section',
                    { className: 'dsp-section' },
                    h(SectionHead, {
                      title: t('settings.tone'),
                      hint: t('settings.toneHint')
                    }),
                    h(
                      'div',
                      { className: 'dsp-tones' },
                      toneOptions.map((option) =>
                        h(
                          'button',
                          {
                            key: option.id,
                            type: 'button',
                            className:
                              'dsp-tone' + (settings.tone === option.id ? ' is-selected' : ''),
                            'aria-pressed': settings.tone === option.id,
                            onClick: () =>
                              setSettings((current) => ({ ...current, tone: option.id }))
                          },
                          h('strong', null, option.label),
                          h('span', null, option.hint)
                        )
                      )
                    ),
                    h(
                      'div',
                      { className: 'dsp-subhead' },
                      h('span', null, t('settings.palette')),
                      h('small', null, t('settings.paletteHint'))
                    ),
                    h(
                      'div',
                      { className: 'dsp-palette' },
                      paletteOptions.map((option) =>
                        h(
                          'button',
                          {
                            key: option.id,
                            type: 'button',
                            className:
                              'dsp-swatch' + (settings.accent === option.id ? ' is-selected' : ''),
                            style: { '--dsp-swatch': option.value.base },
                            title: option.label,
                            'aria-pressed': settings.accent === option.id,
                            onClick: () =>
                              setSettings((current) => ({ ...current, accent: option.id }))
                          },
                          h('span', { className: 'dsp-swatch-dot', 'aria-hidden': true }),
                          h('span', null, option.label)
                        )
                      )
                    )
                  ),
                  h(
                    'section',
                    { className: 'dsp-section' },
                    h(SectionHead, {
                      title: t('settings.size'),
                      trailing: h('span', { className: 'dsp-value' }, Math.round(settings.scale * 100) + '%')
                    }),
                    h('input', {
                      type: 'range',
                      className: 'dsp-range',
                      min: 0.65,
                      max: 1.35,
                      step: 0.05,
                      value: settings.scale,
                      style: {
                        '--dsp-range-fill': `${Math.round(((settings.scale - 0.65) / 0.7) * 100)}%`
                      },
                      'aria-label': t('settings.size'),
                      onChange: (event) =>
                        setSettings((current) => ({ ...current, scale: Number(event.target.value) }))
                    }),
                    h('p', { className: 'dsp-section-hint dsp-under' }, t('settings.sizeHint'))
                  ),
                  h(
                    'section',
                    { className: 'dsp-section' },
                    h(SectionHead, { title: t('settings.behavior') }),
                    h(
                      'div',
                      { className: 'dsp-toggle-group' },
                      h(ToggleRow, {
                        checked: settings.bubbles,
                        title: t('settings.bubbles'),
                        hint: t('settings.bubblesHint'),
                        onToggle: () =>
                          setSettings((current) => ({ ...current, bubbles: !current.bubbles }))
                      }),
                      h(ToggleRow, {
                        checked: settings.sound,
                        title: t('settings.sound'),
                        hint: t('settings.soundHint'),
                        onToggle: () =>
                          setSettings((current) => ({ ...current, sound: !current.sound }))
                      }),
                      h(ToggleRow, {
                        checked: settings.reactive,
                        title: t('settings.reactive'),
                        hint: t('settings.reactiveHint'),
                        onToggle: () =>
                          setSettings((current) => ({ ...current, reactive: !current.reactive }))
                      })
                    )
                  ),
                  h(
                    'section',
                    { className: 'dsp-section' },
                    h(SectionHead, {
                      title: t('settings.position'),
                      hint: t('settings.positionHint')
                    }),
                    h(
                      'div',
                      { className: 'dsp-corners' },
                      cornerOptions.map((corner) =>
                        h(
                          'button',
                          {
                            key: corner.id,
                            type: 'button',
                            className:
                              'dsp-corner' + (activeCorner === corner.id ? ' is-active' : ''),
                            'aria-pressed': activeCorner === corner.id,
                            onClick: () => placePet(corner.id)
                          },
                          h(
                            'span',
                            { className: 'dsp-corner-icon is-' + corner.id, 'aria-hidden': true },
                            h('i', null)
                          ),
                          h('span', null, corner.label)
                        )
                      )
                    )
                  ),
                  h('p', { className: 'dsp-format-note' }, t('settings.formatNote'))
                )
              ),
              h(
                'footer',
                { className: 'dsp-foot' },
                h(
                  'button',
                  { type: 'button', className: 'dsp-reset', onClick: resetPersonalization },
                  t('settings.reset')
                ),
                h(
                  'div',
                  { className: 'dsp-foot-actions' },
                  h(
                    'button',
                    { type: 'button', className: 'dsp-ghost', onClick: hidePet },
                    h(DspIcon, { name: 'eyeOff' }),
                    t('settings.hide')
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsp-primary',
                      onClick: () => setSettingsOpen(false)
                    },
                    t('settings.done')
                  )
                )
              )
            )
          )
        : null

      if (settings.hidden) {
        return h(
          'div',
          { className: 'dsp-root', style: themeVars },
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
            h(DspIcon, { name: 'wave' }),
            t('settings.restore')
          )
        )
      }

      return h(
        'div',
        { className: 'dsp-root', style: themeVars },
        h('style', null, CSS),
        h('audio', {
          ref: pressSoundRef,
          className: 'dsp-sound',
          src: CLICK_PRESS_SOUND,
          preload: 'auto',
          'aria-hidden': true
        }),
        h('audio', {
          ref: releaseSoundRef,
          className: 'dsp-sound',
          src: CLICK_RELEASE_SOUND,
          preload: 'auto',
          'aria-hidden': true
        }),
        h(
          'div',
          {
            className: `dsp-pet${boop ? ' dsp-is-boop' : ''}${artState === 'running' ? ' dsp-is-running' : ''}${artState === 'waiting' ? ' dsp-is-waiting' : ''}${artState === 'review' ? ' dsp-is-review' : ''}${dragging ? ' dsp-is-dragging' : ''}${selectedPet.portrait ? ' dsp-is-portrait' : ''}`,
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
              title: `${selectedName} · ${t('aria.pet')}`,
              'aria-label': `${selectedName} · ${t('aria.pet')}`,
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
