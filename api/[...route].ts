import { handle } from 'hono/vercel'

import { app } from '../src/worker/app'

// Vercel Edge Function. Every /api/* request is handled by the same Hono app
// the Cloudflare Worker runs; static files and the SPA are served by Vercel.
export const config = { runtime: 'edge' }

export default handle(app)
