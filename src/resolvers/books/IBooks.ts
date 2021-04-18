export interface Books {
 Book: { writted_by: object, register_by: object },
 Query: { getBooks: object, getBook: object };
 Mutation: { createBook: object, updateBook: object, deleteBook: object };
 Subscription: { book: object }
}

export interface ParentBook {
 _id: string,
 title: string,
 quantity: number,
 price: number,
 writted_by: string,
 register_by: string
}

export interface IBook {
 title: string,
 description: string,
 quantity: number,
 price: number,
 writted_by: string,
 register_by: string
}

export interface GetBooks {
 getBooks: [IBook]
}

export interface CreateBook {
 title: string,
 description: string,
 quantity: number,
 price: number,
 writted_by: string,
 register_by: string
 save: Function
}

export interface ErrorsBook {
 _id?: string,
 book?: string,
 title?: string,
 description?: string,
 quantity?: string,
 price?: string,
 writted_by?: string,
 register_by?: string
}