// Serves the production build (dist/client) with SPA fallback, gzip and caching.
// Usage: node scripts/serve.mjs [port]
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { createGzip } from 'node:zlib'

const root = resolve('dist/client')
const port = Number(process.argv[2] || process.env.PORT || 43222)
const host = '127.0.0.1'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt'])

function cacheControl(path) {
  if (path.startsWith('/assets/')) return 'public, max-age=31536000, immutable'
  if (path.startsWith('/images/')) return 'public, max-age=2592000'
  if (path.endsWith('.html')) return 'no-cache'
  return 'public, max-age=86400'
}

createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`)
  let file = normalize(join(root, decodeURIComponent(url.pathname)))
  if (!file.startsWith(root)) {
    res.writeHead(403).end('Forbidden')
    return
  }
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html')

  const type = TYPES[extname(file)] || 'application/octet-stream'
  const gzip = COMPRESSIBLE.has(extname(file)) && /gzip/.test(req.headers['accept-encoding'] || '')
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': cacheControl(url.pathname),
    ...(gzip ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
  })
  const stream = createReadStream(file)
  if (gzip) stream.pipe(createGzip()).pipe(res)
  else stream.pipe(res)
}).listen(port, host, () => {
  console.log(`Serving dist/client on http://${host}:${port}`)
})
