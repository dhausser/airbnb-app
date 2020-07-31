export function getErrorMessage(error: { graphQLErrors: any; message: string }): string {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (graphQLError.extensions && graphQLError.extensions.code === 'BAD_USER_INPUT') {
        return graphQLError.message
      }
    }
  }
  return error.message
}
