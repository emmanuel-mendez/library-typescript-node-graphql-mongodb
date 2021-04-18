import { User, Author, Book } from '../../models/'
import { Users, IUser, GetUsers, CreateUser } from './IUsers'
import { validateId } from '../validate/validateId'
import { validateGetUser, validateCreateUser, validateLogin, validateUpdateUser } from './validateUsers'
import { authorization, generateToken, hashPassword, validatePassword } from '../../utils'

export const users: Users = {

 Query: {

  getUsers: async (parent: void, { first, skip, orderBy }: { first: number, skip: number, orderBy: string }, { req }: { req: Request }, info: object): Promise<GetUsers> => {

   authorization(req)

   return await User.find().sort(orderBy).limit(first).skip(skip)
  },

  getUser: async (parent: void, { _id }: { _id: string }, { req }: { req: Request }, info: object): Promise<IUser> => {

   authorization(req)

   validateId(_id)

   const user: IUser = await User.findById(_id)

   await validateGetUser(user)

   return user
  },
 },

 Mutation: {

  createUser: async (parent: void, { data }: { data: CreateUser }, context: object, info: object): Promise<any> => {

   await validateCreateUser(data)

   let { name, lastname, email, password } = data

   const user: CreateUser = new User({
    name: name.replace(/\s+/g, ''),
    lastname,
    email,
    password: await hashPassword(password)
   })

   const userCreated = await user.save()

   return {
    user: userCreated,
    token: generateToken(userCreated._id)
   }
  },

  login: async (parent: void, { data }: { data: CreateUser }, context: object, info: object): Promise<any> => {

   await validateLogin(data)

   let { email, password } = data

   const user = await User.findOne({ email })

   await validateGetUser(user)

   await validatePassword(password, user.password)

   return {
    user,
    token: generateToken(user._id)
   }
  },

  updateUser: async (parent: void, { _id, data }: { _id: string, data: { name: string, lastname: string, email: string, password: string } }, { req }: { req: Request }, info: object): Promise<IUser> => {

   authorization(req)

   await validateUpdateUser(_id, data)

   let user: IUser = await User.findById(_id)

   await validateGetUser(user)

   if (data.password) await hashPassword(data.password)

   return await User.findByIdAndUpdate(_id, data, { new: true })
  },

  deleteUser: async (parent: void, { _id }: { _id: string }, { req }: { req: Request }, info: object): Promise<IUser> => {

   authorization(req)

   validateId(_id)

   const user: IUser = await User.findByIdAndDelete(_id)

   await validateGetUser(user)

   await Author.findOneAndDelete({ register_by: _id })
   await Book.findOneAndDelete({ register_by: _id })

   return user
  }
 }
}
