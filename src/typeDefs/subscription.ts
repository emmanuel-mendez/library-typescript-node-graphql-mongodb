import { gql } from 'apollo-server-express'

export const typeDef = gql`

type Subscription {
  author: AuthorSubscription!
  book(
    authorId: ID!
  ): BookSubscription!
}
`