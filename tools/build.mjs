import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'src', 'client.js')
const outputPath = path.join(root, 'client.js')

const assets = [
  { placeholder: '__WHALE_GIRL_DATA__', file: 'src/builtins/whale-girl.png', mime: 'image/png' },
  { placeholder: '__DEEPSEEK_GIRL_SHEET__', file: 'src/builtins/deepseek-girl.webp', mime: 'image/webp' },
  { placeholder: '__DEEPSEEK_WHALECHAN_SHEET__', file: 'src/builtins/deepseek-whalechan.webp', mime: 'image/webp' },
  { placeholder: '__SHARK_PEPPER_SHEET__', file: 'src/builtins/shark-pepper.webp', mime: 'image/webp' },
  { placeholder: '__CLICK_PRESS_SOUND__', file: 'src/builtins/click-press.mp3', mime: 'audio/mpeg' },
  { placeholder: '__CLICK_RELEASE_SOUND__', file: 'src/builtins/click-release.mp3', mime: 'audio/mpeg' }
]

let source = fs.readFileSync(sourcePath, 'utf8')
let totalAssetBytes = 0

for (const asset of assets) {
  const filePath = path.join(root, asset.file)
  const buffer = fs.readFileSync(filePath)
  totalAssetBytes += buffer.length
  if (!source.includes(asset.placeholder)) {
    throw new Error(`Asset placeholder is missing from src/client.js: ${asset.placeholder}`)
  }
  const dataUrl = `data:${asset.mime};base64,${buffer.toString('base64')}`
  source = source.replaceAll(asset.placeholder, dataUrl)
}

new Function(source)

if (totalAssetBytes > 4 * 1024 * 1024) {
  throw new Error('Built-in artwork exceeds the 4 MB budget')
}

fs.writeFileSync(outputPath, source, 'utf8')
console.log(
  `Built client.js (${(Buffer.byteLength(source) / 1024 / 1024).toFixed(2)} MiB, ` +
    `${(totalAssetBytes / 1024).toFixed(0)} KiB artwork)`
)
