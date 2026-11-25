import { app } from './app'

// The Worker in front of the static site. API routes live in ./app so the same
// handlers can be served by Vercel's function (api/[...route].ts); everything
// that is not an API call falls through to the built assets.
type Env = {
  ASSETS: Fetcher
}

app.all('*', (c) => (c.env as Env).ASSETS.fetch(c.req.raw))

export default app
