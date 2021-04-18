import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server-express'

const SECRET: string = process.env.JWT_SECRET!

export const authorization = (req: any) => {

 const header = req.header('authorization')

 if (header) {
  const token = header.replace('Bearer ', '')

  return jwt.verify(token, SECRET)
 }

 throw new Error('Authentication required')
}

export const validatePassword = async (requestPassword: string, password: string): Promise<void> => {

 let errors: { password?: string } = {}
 const comparePassword = await bcrypt.compare(requestPassword, password)

 if (!comparePassword) {
  errors.password = 'Email and password do no match'
  throw new UserInputError('Input error', { errors })
 }
}

export const hashPassword = async (password: string): Promise<string> => {
 const salt = await bcrypt.genSalt(12)
 return bcrypt.hash(password, salt)
}

export const generateToken = async (userId: string): Promise<string> => {

 return await jwt.sign(
  { userId },
  SECRET,
  { expiresIn: '1h' }
 )
}