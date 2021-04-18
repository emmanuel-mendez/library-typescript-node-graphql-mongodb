import { User } from '../../models/'
import { UserInputError } from 'apollo-server-express'
import { IAuthor, CreateAuthor, ErrorsAuthor } from './IAuthors'
import { REGEX_ID } from '../validate/regEx'

let errors: ErrorsAuthor = {}

export const validateGetAuthor = (author: IAuthor): void => {

 errors = {}

 if (!author) {
  errors.author = 'Author not found'
  throw new UserInputError('Input error', { errors })
 }
}

export const validateCreateAuthor = async (data: CreateAuthor): Promise<void> => {

 errors = {}

 let { name, lastname, country, register_by } = data

 if (name.trim() === '') {
  errors.name = 'Name is required'
 } else {
  name = name.replace(/\s+/g, '')
 }

 if (lastname.trim() === '') {
  errors.lastname = 'Lastname is required'
 }

 if (country.trim() === '') {
  errors.country = 'Country is required'
 }

 if (register_by.trim() === '') {
  errors.register_by = 'Register_by is required'
 } else if (!register_by.match(REGEX_ID)) {
  errors.register_by = 'Invalid register_by'
 } else if (!await User.findById(register_by)) {
  errors.register_by = 'User (register_by) not found'
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}

export const validateUpdateAuthor = async (_id: string, data: IAuthor): Promise<void> => {

 errors = {}

 let { name, lastname, country, register_by } = data

 if (typeof (name) === 'string' && name.length === 0) {
  errors.name = 'Name is required'
 } else if (name) {
  name = name.replace(/\s+/g, '')
 }

 if (typeof (lastname) === 'string' && lastname.length === 0) {
  errors.lastname = 'Lastname is required'
 } else if (lastname) {
  lastname = lastname.replace(/\s+/g, '')
 }

 if (typeof (country) === 'string' && country.length === 0) {
  errors.country = 'Country is required'
 } else if (country) {
  country = country.replace(/\s+/g, '')
 }

 if (typeof (register_by) === 'string' && register_by.length === 0) {
  errors.register_by = 'Register_by is required'
 } else if (register_by) {
  if (!register_by.match(REGEX_ID)) {
   errors.register_by = 'Invalid register_by'
  } else if (!await User.findById(register_by)) {
   errors.register_by = 'User (register_by) not found'
  }
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}