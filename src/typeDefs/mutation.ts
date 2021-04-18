import { gql } from 'apollo-server-express'

export const typeDef = gql`

type Mutation{

  createUser(
    data: createUserInput!
  ): Authorization!

  login(
    data:loginInput!
  ): Authorization!

  updateUser(
    _id: ID!
    data: updateUserInput
  ): User!

  deleteUser(
    _id: ID!
  ): User!

  createAuthor(
    data: createAuthorInput
  ): Author!

  updateAuthor(
    _id: ID!
    data: updateAuthorInput
  ): Author!

    deleteAuthor(
    _id: ID!
  ): Author!

  createBook(
    data: createBookInput
  ): Book!

  updateBook(
    _id: ID!
    data: updateBookInput
  ): Book!

  deleteBook(
    _id: ID!
  ): Book!
}
`