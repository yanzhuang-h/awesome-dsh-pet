import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'src', 'client.js')
const idlePath = path.join(root, 'src', 'mochi-idle.svg')
const happyPath = path.join(root, 'src', 'mochi-happy.svg')
const outputPath = path.join(root, 'client.js')

let source = fs.readFileSync(sourcePath, 'utf8')
const idle = fs.readFileSync(idlePath)
const happy = fs.readFileSync(happyPath)
const idleData = `data:image/svg+xml;base64,${idle.toString('base64')}`
const happyData = `data:image/svg+xml;base64,${happy.toString('base64')}`

if (!source.includes('__MOCHI_IDLE_DATA__') || !source.includes('__MOCHI_HAPPY_DATA__')) {
  throw new Error('Asset placeholders are missing from src/client.js')
}
if (idle.length > 100_000 || happy.length > 100_000) {
  throw new Error('The built-in pet artwork is unexpectedly large')
}

source = source.replace('__MOCHI_IDLE_DATA__', idleData).replace('__MOCHI_HAPPY_DATA__', happyData)

new Function(source)

fs.writeFileSync(outputPath, source, 'utf8')
console.log(`Built client.js (${(Buffer.byteLength(source) / 1024).toFixed(1)} KiB)`)
