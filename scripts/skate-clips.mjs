// Genera los previews de la galería de Skate a partir de los videos originales.
// Uso: npm run clips -- "C:/ruta/a/la/carpeta/con/videos"
// Por cada video crea en public/skate/ un clip en loop sin sonido (.mp4 y .webm, 480 px, 6 s) y una miniatura (.jpg).
// Opcional: CLIP_START (segundo donde empieza el fragmento, por defecto 1) y CLIP_LENGTH (duración, por defecto 6).
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const dir = process.argv[2]
if (!dir) {
  console.error('Uso: npm run clips -- "C:/ruta/a/la/carpeta/con/videos"')
  process.exit(1)
}

const out = 'public/skate'
const start = process.env.CLIP_START ?? '1'
const length = process.env.CLIP_LENGTH ?? '6'
mkdirSync(out, { recursive: true })

const ffmpeg = (args) => execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: 'inherit' })
const videos = readdirSync(dir).filter((f) => /\.(mp4|mov|m4v|webm)$/i.test(f))

for (const file of videos) {
  const name = parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const src = join(dir, file)
  const clip = ['-ss', start, '-t', length, '-i', src, '-an', '-vf', 'scale=480:-2']
  ffmpeg([...clip, '-c:v', 'libx264', '-crf', '25', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(out, `${name}.mp4`)])
  ffmpeg([...clip, '-c:v', 'libvpx-vp9', '-crf', '41', '-b:v', '0', join(out, `${name}.webm`)])
  ffmpeg(['-ss', start, '-i', src, '-frames:v', '1', '-vf', 'scale=480:-2', '-q:v', '4', join(out, `${name}.jpg`)])
  console.log(`${file}  →  clip: '/skate/${name}.mp4', poster: '/skate/${name}.jpg'`)
}

if (!videos.length) console.log('No encontré videos (.mp4, .mov, .m4v, .webm) en esa carpeta.')
