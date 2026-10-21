import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const fail = (message) => {
  console.error(`CHECK FAILED: ${message}`)
  process.exitCode = 1
}

const pkg = JSON.parse(read('package.json'))
const patch = read('cordis.patch.yml')
const client = read('client.js')

if (!pkg.dsh || !pkg.dsh.bundle || pkg.dsh.bundle.patch !== './cordis.patch.yml') {
  fail('package.json must declare dsh.bundle.patch')
}
if (!pkg.dsh.client || pkg.dsh.client.platform !== 'web' || pkg.dsh.client.immediately !== true) {
  fail('package.json must declare an immediate web client')
}
if (!pkg.exports || pkg.exports['./client'] !== './client.js' || pkg.exports['./icon'] !== './icon.png') {
  fail('package.json exports are incomplete')
}
for (const file of pkg.files || []) {
  if (file.includes('*')) continue
  if (!fs.existsSync(path.join(root, file))) fail(`declared file is missing: ${file}`)
}
if (!patch.includes('awesome-dsh-pet')) fail('cordis.patch.yml does not insert awesome-dsh-pet')
if (!client.includes("id: 'awesome-dsh-pet'")) fail('client.js does not register awesome-dsh-pet')
if (!client.includes("name: 'shell.overlay'")) fail('client.js does not register shell.overlay')
for (const asset of ['whale-girl.png', 'deepseek-girl.webp', 'deepseek-whalechan.webp']) {
  if (!fs.existsSync(path.join(root, 'src', 'builtins', asset))) fail(`built-in asset is missing: ${asset}`)
}
for (const placeholder of ['__WHALE_GIRL_DATA__', '__DEEPSEEK_GIRL_SHEET__', '__DEEPSEEK_WHALECHAN_SHEET__']) {
  if (client.includes(placeholder)) fail(`client.js still contains the ${placeholder} placeholder`)
}
try {
  new vm.Script(client, { filename: 'client.js' })
} catch (error) {
  fail(`client.js has a syntax error: ${error.message}`)
}
if (Buffer.byteLength(client) > 5 * 1024 * 1024) fail('client.js exceeds the 5 MiB bundle budget')

const icon = fs.statSync(path.join(root, 'icon.png'))
if (icon.size > 256 * 1024) fail('icon.png exceeds the 256 KiB display metadata limit')

for (const locale of ['en', 'zh']) {
  const dictionary = JSON.parse(read(`locale/${locale}.json`))
  if (!dictionary.meta || !dictionary.meta.title || !dictionary.meta.description) {
    fail(`locale/${locale}.json is missing meta.title or meta.description`)
  }
}

if (!process.exitCode) {
  console.log('Plugin checks passed')
}
