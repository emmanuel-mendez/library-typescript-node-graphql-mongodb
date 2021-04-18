import { UserInputError } from 'apollo-server-express'

interface Errors {
 _id?: string
}

let errors: Errors = {}

export const validateId = (_id: string): void => {

 errors = {}

 if (_id.trim() === '') {
  errors._id = '_id is required'
  throw new UserInputError('Input error', { errors })
 }

 if (!_id.match(
  /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
 )) {
  errors._id = 'Invalid _id'
  throw new UserInputError('Input error', { errors })
 }
}