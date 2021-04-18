import { gql } from 'apollo-server-express'
import { typeDef as Enum } from './enum'
import { typeDef as Query } from './query'
import { typeDef as Mutation } from './mutation'
import { typeDef as Subscription } from './subscription'
import { typeDef as Input } from './input'

export const typeDefs = gql`

type Authorization {
  user: User!
  token: String!
}

type User {
  _id: ID!
  name: String!
  lastname: String!
  email: String!
  createdAt: String!
  updatedAt: String!
}

type Author {
  _id: ID!
  name: String!
  lastname: String!
  country: String!
  register_by: User!
  books: [Book]!
  createdAt: String!
  updatedAt: String!
}

type AuthorSubscription{
  mutation: mutationType!
  data: Author!
}

type Book {
  _id: ID!
  title: String!
  description: String!
  quantity: Int!
  price: Float!
  writted_by: Author!
  register_by: User!
  createdAt: String!
  updatedAt: String!
}

type BookSubscription {
  mutation: mutationType!
  data: Book!
}

${Query}

${Mutation}

${Subscription}

${Input}

${Enum}
`