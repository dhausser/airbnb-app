module.exports = {
  client: {
    includes: ['./pages/**/*.tsx'],
    service: {
      name: 'airbnb-app',
      localSchemaFile: './schema.graphql',
    },
  },
}
