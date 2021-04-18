import { gql } from 'apollo-server-express'

export const typeDef = gql`

type Query {
  getUser (
    _id: ID!
  ): User!

  getUsers(
    first: Int,
    skip: Int,
    orderBy: userOrderByInput
  ): [User!]!

  getAuthor (
    _id: ID!,
  ): Author!

  getAuthors(
    first: Int,
    skip: Int,
    orderBy: authorOrderByInput
  ): [Author!]!

  getBook (
    _id: ID!
  ): Book!

  getBooks(
    first: Int,
    skip: Int,
    orderBy: bookOrderByInput
  ): [Book!]!
}
`