export interface Authors {
 Author: {
  register_by: object,
  books: object
 }
 Query: {
  getAuthors: object,
  getAuthor: object
 }
 Mutation: {
  createAuthor: object,
  updateAuthor: object,
  deleteAuthor: object
 }
 Subscription: object
}

export interface ParentAuthor {
 _id: string,
 name: string,
 lastname: string,
 country: string,
 register_by: string
}

export interface IAuthor {
 name: string,
 lastname: string,
 country: string,
 register_by: string
}

export interface GetAuthors {
 getAuthors: [IAuthor]
}

export interface CreateAuthor {
 name: string,
 lastname: string,
 country: string,
 register_by: string
 save: Function
}

export interface ErrorsAuthor {
 _id?: string,
 author?: string,
 name?: string,
 lastname?: string,
 country?: string,
 register_by?: string
}