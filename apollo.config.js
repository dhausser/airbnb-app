module.exports = {
  client: {
    includes: ['./apollo/**/*.ts'],
    service: {
      name: 'airbnb-app',
      localSchemaFile: 'schema.graphql',
    },
  },
}
