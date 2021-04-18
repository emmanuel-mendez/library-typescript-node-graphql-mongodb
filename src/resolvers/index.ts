import { users } from './users'
import { authors } from './authors'
import { books } from './books'

type Resolvers = {
  Author: object
  Book: object,
  Query: object,
  Mutation: object,
  Subscription: object
}

export const resolvers: Resolvers = {

  Author: {
    ...authors.Author,
  },

  Book: {
    ...books.Book,
  },

  Query: {
    ...users.Query,
    ...authors.Query,
    ...books.Query
  },

  Mutation: {
    ...users.Mutation,
    ...authors.Mutation,
    ...books.Mutation,
  },

  Subscription: {
    ...authors.Subscription,
    ...books.Subscription,
  }
}