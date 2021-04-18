import { gql } from 'apollo-server-express'

export const typeDef = gql`

enum mutationType {
  CREATE
  UPDATE
  DELETE
}

enum orderByType {
  ASC,
  DESC
}
`