if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../graphql/mutation')
require('../../graphql/post')
require('../../graphql/profile')
require('../../graphql/query')
require('../../graphql/schema')
require('../../graphql/user')

app.assemble()

export default app.server.handlers.graphql
