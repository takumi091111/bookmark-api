import { tagQuery, tagMutation } from '~/resolvers/tags'
import { bookmarkQuery, bookmarkMutation } from '~/resolvers/bookmarks'

export const resolvers = {
  Query: {
    ...tagQuery,
    ...bookmarkQuery
  },
  Mutation: {
    ...tagMutation,
    ...bookmarkMutation
  }
}
