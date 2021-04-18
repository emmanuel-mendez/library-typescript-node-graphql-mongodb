import { UserInputError } from 'apollo-server-express'
import { User } from '../../models/'
import { IUser, CreateUser, Login, ErrorsUser } from './IUsers'
import { REGEX_ID, REGEX_EMAIL, REGEX_PASSWORD } from '../validate/regEx'

let errors: ErrorsUser = {}

export const validateGetUser = (user: IUser): void => {

 errors = {}

 if (!user) {
  errors.user = 'User not found'
  throw new UserInputError('Input error', { errors })
 }
}

export const validateCreateUser = async (data: CreateUser): Promise<void> => {

 errors = {}

 let { name, lastname, email, password, confirmPassword } = data

 if (name.trim() === '') {
  errors.name = 'Name is required'
 } else {
  name = name.replace(/\s+/g, '')
 }

 if (lastname.trim() === '') {
  errors.lastname = 'Lastname is required'
 }

 if (email.trim() === '') {
  errors.email = 'Email is required'
 } else if (!email.match(REGEX_EMAIL)) {
  errors.email = 'Enter a valid email'
 }

 if (password.trim() === '') {
  errors.password = 'Password is required'
 }

 if (!password.match(REGEX_PASSWORD)) {
  errors.password = 'Password must contain: Minimum eight and maximum sixteen characters. At least one uppercase letter, one lowercase letter, one number and one special character'
 }

 if (confirmPassword.trim() === '') {
  errors.confirmPassword = 'Confirm your password'
 } else if (password !== confirmPassword) {
  errors.confirmPassword = 'Passwords do not match'
 }

 const userEmail = await User.findOne({ email })
 if (userEmail) {
  errors.email = 'Email is already registered'
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}

export const validateLogin = async (data: Login): Promise<void> => {

 errors = {}

 let { email, password } = data

 if (email.trim() === '') {
  errors.email = 'Email is required'
 } else if (!email.match(REGEX_EMAIL)) {
  errors.email = 'Enter a valid email'
 }

 if (password.trim() === '') {
  errors.password = 'Password is required'
 }

 if (!password.match(REGEX_PASSWORD)) {
  errors.password = 'Password must contain: Minimum eight and maximum sixteen characters. At least one uppercase letter, one lowercase letter, one number and one special character'
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}

export const validateUpdateUser = async (_id: string, data: IUser): Promise<void> => {

 errors = {}

 let { name, lastname, email, password } = data

 if (_id.trim() === '') {
  errors._id = '_id is required'
 } else if (!_id.match(REGEX_ID)) {
  errors._id = 'Invalid _id'
 } else if (!await User.findById(_id)) {
  errors._id = 'User not found'
 }

 if (typeof (name) === 'string' && name.length === 0) {
  errors.name = 'Name is required'
 } else if (name) {
  name = name.replace(/\s+/g, '')
 }

 if (typeof (lastname) === 'string' && lastname.length === 0) {
  errors.lastname = 'Lastname is required'
 }

 if (typeof (email) === 'string' && email.length === 0) {
  errors.email = 'Email is required'
 } else if (email && !email.match(REGEX_EMAIL)) {
  errors.email = 'Enter a valid email'
 }

 if (typeof (password) === 'string' && password.length === 0) {
  errors.password = 'Password is required'
 } else if (password && !password.match(REGEX_PASSWORD)) {
  errors.password = 'Password must contain: Minimum eight and maximum sixteen characters. At least one uppercase letter, one lowercase letter, one number and one special character'
 }

 const userEmail = await User.findOne({ email })
 if (userEmail) {
  errors.email = 'Email is already registered'
 }

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('Input error', { errors })
 }
}