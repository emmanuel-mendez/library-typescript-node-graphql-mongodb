import { Book, User, Author } from '../../models/'
import { UserInputError } from 'apollo-server-express'
import { IBook, CreateBook, ErrorsBook } from './IBooks'
import { REGEX_ID } from '../validate/regEx'

let errors: ErrorsBook = {}

export const validateGetBook = (book: IBook): void => {

 errors = {}

 if (!book) {
  errors.book = 'Book not found'
  throw new UserInputError('Input error', { errors })
 }
}

export const validateCreateBook = async (data: CreateBook): Promise<void> => {

 errors = {}

 let { title, description, quantity, price, writted_by, register_by } = data

 if (title.trim() === '') {
  errors.title = 'Title is required'
 } else {
  title = title.replace(/\s+/g, '')
 }

 if (description.trim() === '') {
  errors.description = 'Description is required'
 }

 if (quantity.toString() === '') {
  errors.quantity = 'Quantity is required'
 }

 if (price.toString() === '') {
  errors.price = 'Price is required'
 }

 if (writted_by.trim() === '') {
  errors.writted_by = 'Writted_by is required'
 } else if (!writted_by.match(REGEX_ID)) {
  errors.writted_by = 'Invalid writted_by'
 } else if (!await Author.findById(writted_by)) {
  errors.writted_by = 'Author (writted_by) not found'
 }

 if (register_by.trim() === '') {
  errors.register_by = 'Register_by is required'
 } else if (!register_by.match(REGEX_ID)) {
  errors.register_by = 'Invalid register_by'
  throw new UserInputError('Input error', { errors })
 } else if (!await User.findById(register_by)) {
  errors.register_by = 'User (register_by) not found'
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}

export const validateUpdateBook = async (_id: string, data: IBook): Promise<void> => {

 errors = {}

 let { title, description, quantity, price, writted_by, register_by } = data

 if (_id.trim() === '') {
  errors._id = '_id is required'
 } else if (!_id.match(REGEX_ID)) {
  errors._id = 'Invalid _id'
 } else if (!await Book.findById(_id)) {
  errors._id = 'Book not found'
 }

 if (typeof (title) === 'string' && title.length === 0) {
  errors.title = 'Title is required'
 } else if (title) {
  title = title.replace(/\s+/g, '')
 }

 if (typeof (description) === 'string' && description.length === 0) {
  errors.description = 'Description is required'
 } else if (description) {
  description = description.replace(/\s+/g, '')
 }

 if (typeof (quantity) === 'number' && quantity.toString().length === 0) {
  errors.quantity = 'Quantity is required'
 } else if (quantity) {
  quantity = parseInt(quantity.toString().replace(/\s+/g, ''))
 }

 if (typeof (price) === 'number' && price.toString().length === 0) {
  errors.price = 'Price is required'
 } else if (price) {
  price = parseInt(price.toString().replace(/\s+/g, ''))
 }

 if (typeof (writted_by) === 'string' && writted_by.length === 0) {
  errors.writted_by = 'Writted_by is required'
 } else if (writted_by) {
  if (!writted_by.match(REGEX_ID)) {
   errors.writted_by = 'Invalid writted_by'
  } else if (!await Author.findById(writted_by)) {
   errors.writted_by = 'Author (writted_by) not found'
  }
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