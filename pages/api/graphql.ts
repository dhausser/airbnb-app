if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

// Require your nexus modules here.
// Do not write them inline, since the Nexus API is typed `any` because of `require` import.
// require('...')

app.assemble()

export default app.server.handlers.graphql
