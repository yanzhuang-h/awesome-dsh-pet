<div align="center">

# Awesome DSH Pet

**一只住在 DeepSeek Harness 里的可自定义桌宠。**

Codex Pet 风格 · 非独立应用 · 角色素材只存本机

![License](https://img.shields.io/badge/license-MIT-2f7d5a)
![Harness](https://img.shields.io/badge/DeepSeek%20Harness-0.2.1--rc.2-4d6bfe)
![Atlas](https://img.shields.io/badge/Codex%20Pet-v1%20%7C%20v2-d9a441)

</div>

> Harness 启动，它出现；Harness 关闭，它离开。没有单独要打开的窗口，也没有额外常驻的后台应用。

![桌面上的麻薯](docs/preview.png)

## 这个项目是什么

Awesome DSH Pet 是 **DeepSeek Harness 的 Client 插件**。它挂载在 Harness Web UI 的 `shell.overlay` 上，所以桌宠会自然地浮在 Harness 界面右下角，跟随页面一起启动、一起关闭。

默认角色「麻薯」是原创的云朵猫。你也可以：

- 导入一套 [Codex Pet 社区角色包](https://github.com/legeling/awesome-codex-pet)，获得完整动作动画；
- 导入一张透明背景的 PNG / GIF / WebP，马上换成自己的角色；
- 调整大小、拖动位置、隐藏桌宠，或者让它跟着任务的进行状态做动作。

这个项目面向 [awesome-codex-pet](https://github.com/legeling/awesome-codex-pet) 的图集规格做了兼容，但不是 Codex 官方项目，也与 DeepSeek / OpenAI 没有隶属关系。

## 特性

- **随 Harness 一起出现**：注册为 immediate Client 插件，无需单独启动。
- **Codex Pet 图集兼容**：读取 `pet.json` + `spritesheet.webp`，支持 v1（1536×1872，8×9）与 v2（1536×2288，8×11）。
- **会看状态的小家伙**：任务进行时跑动，等待确认时守候，一轮结束时检查，点击时挥手。
- **位置与尺寸记忆**：可以按住拖动，位置写入本地设置；刷新或重启后仍然在原处。
- **角色工坊**：内置角色、Codex 角色包、单张图片三种来源；支持删除、缩放、恢复默认位置。
- **本地优先**：角色 Blob 存放在 IndexedDB，设置有 localStorage；不上传任何素材。
- **跟随主题**：界面使用 Harness 的 `--dsw-alias-*` 主题变量，深色 / 浅色模式都能融入。

<p align="center">
  <img src="docs/settings.png" alt="桌宠小屋" width="720">
</p>

悬停角色右上角会出现设置齿轮与隐藏按钮；桌宠小屋负责角色、大小和陪伴方式。

## 在 DSH 中安装

### 环境要求

- 已安装 **DeepSeek Harness Desktop**（开发验证基于 `0.2.1-rc.2`）
- Windows 10 / 11（当前实际验证平台；其他平台欢迎反馈）
- Git

### 1. 克隆仓库

```powershell
git clone https://github.com/yanzhuang-h/awesome-dsh-pet.git
```

把仓库放到一个自己方便维护的目录，例如 `E:\Projects\awesome-dsh-pet`。

> 下面命令里的 `E:\Projects\awesome-dsh-pet` 要换成你机器上实际的克隆路径。

### 2. 使用 Harness 自带的 dsh 命令安装

`desktop` 是桌面端保留 profile，必须使用 **Harness 安装目录里的** `dsh.cmd`。把下面的 DSH 路径替换成你的实际安装位置：

```powershell
$DSH = "D:\deepseekharness\resources\runtime\cli\bin\dsh.cmd"
& $DSH plugin --profile desktop add "link:E:\Projects\awesome-dsh-pet"
```

如果你的 `dsh` 已经在 PATH 中，也可以：

```powershell
dsh plugin --profile desktop add "link:E:\Projects\awesome-dsh-pet"
```

命令会完成两件事：

1. 把插件包链接（`link:`）到 `desktop` profile；
2. 把 `awesome-dsh-pet` 加进该 profile 的 bundle 列表并启用。

### 3. 刷新或重启 Harness

新加入的 Client 插件需要重新加载一次页面才会进入启动模块图：

- 在 Harness 窗口按 `Ctrl+R`，或者
- 完全退出 Harness 后重新启动。

之后每次启动 Harness，桌宠都会自动出现。可以在 Harness 的 **插件** 页面确认 `awesome-dsh-pet` 在已安装 / 已启用列表中。

> 为什么不能直接双击一个 HTML 或运行 `npm start`？因为这个项目是 Harness 插件，依赖 Harness 的 Client Slot、主题和会话状态；它不启动独立窗口。

### 更新

因为安装方式是 `link:` 指向本地仓库，更新只需：

```powershell
cd E:\Projects\awesome-dsh-pet
git pull
```

然后按 `Ctrl+R` 刷新 Harness 页面。若更新涉及 `package.json` 的 manifest，刷新或重启一次 Harness 即可。

### 卸载

在 Harness 的 **插件** 页面停用并移除 `awesome-dsh-pet`。如果使用命令行：

```powershell
& $DSH plugin --profile desktop remove awesome-dsh-pet
```

如果「已启用插件」里仍保留条目，在插件页面关闭它即可。角色设置和导入素材可选择在浏览器站点数据中清除。

## 使用

| 操作 | 效果 |
| --- | --- |
| 悬停角色 | 显示设置齿轮和隐藏按钮 |
| 单击角色 | 开心表情 / 动作 + 随机回应 |
| 按住拖动 | 移动桌宠，松手后保存位置 |
| 点击气泡 | 收起当前回应 |
| 设置齿轮 | 打开「桌宠小屋」 |
| 隐藏按钮 / 小屋里的「藏起桌宠」 | 收成右下角的小胶囊，点击可唤醒 |
| 任务运行 / 等待确认 / 结束 | `running` / `waiting` / `review` 动作 |

任务状态来自 Harness 的 Session 状态；如果同时有多个 Session 在运行，任意一个运行都会让桌宠进入跑动状态。

## 自定义角色

打开桌宠右上角的齿轮 → **桌宠小屋**。

### 方式一：导入 Codex Pet 角色包（推荐，有完整动作）

1. 准备一个文件夹，至少包含：
   ```text
   my-pet/
   ├─ pet.json
   └─ spritesheet.webp
   ```
2. 在「桌宠小屋」点击 **导入角色包**，选择这个文件夹。
3. 导入成功后会立即换上新角色，并可在角色卡片之间切换。

`pet.json` 示例：

```json
{
  "id": "my-pet--me",
  "displayName": "小星",
  "description": "一只住在桌面上的小星星。",
  "spriteVersionNumber": 1,
  "spritesheetPath": "spritesheet.webp"
}
```

支持的图集规格：

| 版本 | 尺寸 | 布局 | 说明 |
| --- | --- | --- | --- |
| v1 | 1536 × 1872 | 8 列 × 9 行 | 标准动作 |
| v2 | 1536 × 2288 | 8 列 × 11 行 | 标准动作 + 两行环视方向 |

单文件上限 12 MB。图集尺寸不符合 `spriteVersionNumber` 时会拒绝导入并提示原因。v2 的最后两行环视方向目前不参与交互，标准九行动画会正常播放。

社区角色包可以从 [awesome-codex-pet](https://github.com/legeling/awesome-codex-pet) 或 [codexpet.top](https://codexpet.top) 获取。**角色素材的版权与许可属于各自作者，本项目不打包、不再分发这些素材。**

### 方式二：导入一张图片 / GIF

点击 **导入一张图片**，选择 PNG / GIF / WebP：

- 透明背景效果最好；
- 静态图片会加上轻微呼吸与点击弹跳；
- GIF 保留自身的动画节奏。

如果文件名是 `idle`、`spritesheet`、`image` 这类通用名称，角色会显示为「我的角色」，可以重新命名文件后再导入。

### 数据在哪里

- 设置：Harness Web 页面的 `localStorage`，键名 `dsh-pet.settings.v1`
- 角色：Harness Web 页面的 IndexedDB，数据库 `dsh-pet.pets.v1`
- 自定义角色只在你的机器上；插件没有任何上传或统计请求。

## 开发

项目没有运行时依赖，只有 Node 内置模块与 Harness 提供的 React / Slot API。

```powershell
npm run build     # src/client.js + src/mochi-*.svg → client.js
npm run check     # manifest / 导出 / 图标 / 语法检查
```

目录：

```text
awesome-dsh-pet/
├─ client.js            # 构建产物：Client 半，注册到 shell.overlay
├─ src/
│  ├─ client.js         # 可维护源码
│  ├─ mochi-idle.svg    # 内置角色
│  └─ mochi-happy.svg
├─ index.js             # Host 半，空实现
├─ cordis.patch.yml     # 插入 awesome-dsh-pet 这一行
├─ package.json         # bundle + Client manifest
├─ icon.png             # 插件图标
├─ locale/{en,zh}.json  # Plugin Manager 显示元数据
├─ docs/                # README 截图
└─ tools/
   ├─ build.mjs
   └─ check.mjs
```

修改 `src/client.js` 或 `src/*.svg` 后运行 `npm run build`。如果要修改动画，请参考 `src/client.js` 里的 `SPRITE` 表和 `PetOverlay` 状态映射。

Built and tested against DeepSeek Harness `0.2.1-rc.2`. DSH 的 Client Slot、主题 token 和插件 manifest 仍处于预览阶段，升级 Harness 后可能需要同步适配。

## Roadmap

- [ ] v2 环视方向：让角色跟随鼠标转头
- [ ] 直接列出本机 `~/.codex/pets` 中已安装的角色
- [ ] 拖放导入、ZIP 导入
- [ ] 每个角色独立台词 / 声音
- [ ] 更多内置原创角色
- [ ] 浅色主题细节打磨与多语言完善
- [ ] 一键安装脚本 / 插件市场条目

欢迎通过 Issues 提功能建议。会优先做**能把角色玩得更有生命力**的功能。

## 参与贡献

- Bug 反馈、角色包兼容问题、功能建议：欢迎开 [Issue](https://github.com/yanzhuang-h/awesome-dsh-pet/issues)。
- 代码和角色贡献：请先看 [CONTRIBUTING.md](CONTRIBUTING.md)。
- 版本变化：[CHANGELOG.md](CHANGELOG.md)。

如果这个项目让你的桌面多了一点快乐，欢迎点一个 Star ⭐

## 常见问题

**安装完刷新了，桌宠没有出现？**
先确认 Harness 的 **插件** 页面里 `awesome-dsh-pet` 已启用；如果刚刚安装，完全退出并重新打开 Harness 最稳妥。也可以在页面按 `Ctrl+R` 后再等几秒。

**安装命令提示 desktop profile 只能由 Electron 管理？**
请使用 Harness 安装目录中的 `resources\runtime\cli\bin\dsh.cmd`，不要使用全局 npm 安装的 `dsh` 命令。

**导入角色包提示图集尺寸不符？**
检查 `spriteVersionNumber` 与图集尺寸是否匹配（v1 1872 高，v2 2288 高），以及是否漏了 `spritesheet.webp`。本项目只接受 8 列的 Codex Pet 图集。

**桌宠挡住了输入框？**
拖动它到其他位置，或点击悬停时的隐藏按钮。位置会保存。

**如何彻底移除？**
在插件页面移除插件；如需要，再清除 Harness 站点的 localStorage / IndexedDB 数据。

## 致谢与声明

- 角色格式与动画灵感来自 [Codex Pet](https://github.com/legeling/awesome-codex-pet)，感谢其开放的图集规范与社区。
- 默认角色「麻薯」、插件图标与界面为本项目原创。
- 这是一个社区项目，与 DeepSeek、OpenAI、Codex 官方均无隶属关系。

## License

代码以 [MIT](LICENSE) 许可发布。导入的社区角色素材不属于本项目，遵循各自作者 / 角色包的许可。
