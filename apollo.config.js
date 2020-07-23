module.exports = {
  client: {
    includes: ['./pages/**/*.tsx'],
    service: {
      name: 'airbnb-app',
      localSchemaFile: './__generated__/schema.graphql',
    },
  },
}
