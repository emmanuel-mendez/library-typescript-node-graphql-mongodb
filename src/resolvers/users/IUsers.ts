export interface Users {
 Query: {
  getUsers: object,
  getUser: object
 }
 Mutation: {
  createUser: object,
  login: object,
  updateUser: object,
  deleteUser: object
 }
}

export interface IUser {
 name: string,
 lastname: string,
 email: string,
 password: string,
}

export interface GetUsers {
 getUsers: [IUser]
}

export interface CreateUser {
 name: string,
 lastname: string,
 email: string,
 password: string,
 confirmPassword: string,
 save: Function
}

export interface Login {
 email: string,
 password: string,
}

export interface ErrorsUser {
 _id?: string,
 user?: string,
 name?: string,
 lastname?: string,
 email?: string,
 password?: string,
 confirmPassword?: string
}