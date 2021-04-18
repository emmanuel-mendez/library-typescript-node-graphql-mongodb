import { gql } from 'apollo-server-express'

export const typeDef = gql`

input createUserInput {
  name: String!
  lastname: String!
  email: String!
  password: String!
  confirmPassword: String!
}

input loginInput {
  email: String!
  password: String!
}

input updateUserInput{
  name: String
  lastname: String
  email: String
  password: String
}

input userOrderByInput{
  _id: orderByType
  name: orderByType
  lastname: orderByType
  email: orderByType
  createdAt: orderByType
  updatedAt: orderByType
}

input createAuthorInput{
  name: String!
  lastname: String!
  country: String!
  register_by: ID!
}

input updateAuthorInput{
  name: String
  lastname: String
  country: String
  register_by: ID
}

input authorOrderByInput{
  _id: orderByType
  name: orderByType
  lastname: orderByType
  country: orderByType
  createdAt: orderByType
  updatedAt: orderByType
}

input createBookInput{
  title: String!
  description: String!
  quantity: Int!
  price: Float!
  writted_by: ID!
  register_by: ID!
}

input updateBookInput{
  title: String
  description: String
  quantity: Int
  price: Float
  writted_by: ID
  register_by: ID
}

input bookOrderByInput{
  _id: orderByType
  title: orderByType
  quantity: orderByType
  price: orderByType
  createdAt: orderByType
  updatedAt: orderByType
}
`