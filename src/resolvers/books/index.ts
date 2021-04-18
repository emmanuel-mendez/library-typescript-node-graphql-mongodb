import { PubSub } from 'apollo-server-express'
import { User, Author, Book } from '../../models/'
import { authorization } from '../../utils'
import { validateId } from '../validate/validateId'
import { Books, ParentBook, IBook, GetBooks, CreateBook } from './IBooks'
import { validateGetBook, validateCreateBook, validateUpdateBook } from './validateBooks'

export const books: Books = {

 Book: {

  writted_by: async (parent: ParentBook, args: object, { req }: { req: Request }, info: any) => {

   authorization(req)

   return await Author.findOne({ _id: parent.writted_by })
  },

  register_by: async (parent: ParentBook, args: object, { req }: { req: Request }, info: any) => {

   authorization(req)

   return await User.findOne({ _id: parent.register_by })
  },
 },

 Query: {

  getBooks: async (parent: void, { first, skip, orderBy }: { first: number, skip: number, orderBy: string }, { req }: { req: Request }, info: object): Promise<GetBooks> => {

   authorization(req)

   return await Book.find().sort(orderBy).limit(first).skip(skip)

  },

  getBook: async (parent: void, { _id }: { _id: string }, { req }: { req: Request }, info: object): Promise<IBook> => {

   authorization(req)

   validateId(_id)

   const book: IBook = await Book.findById(_id)

   await validateGetBook(book)

   return book
  }
 },

 Mutation: {

  createBook: async (parent: void, { data }: { data: CreateBook }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<CreateBook> => {

   authorization(req)

   await validateCreateBook(data)

   const { title, description, quantity, price, writted_by, register_by, } = data

   const book: any = new Book({
    title,
    description,
    quantity,
    price,
    writted_by,
    register_by
   })

   const bookCreated = await book.save()

   pubsub.publish('BOOK', {
    book: {
     mutation: 'CREATE',
     data: bookCreated
    }
   })

   return bookCreated

  },

  updateBook: async (parent: void, { _id, data }: { _id: string, data: { title: string, description: string, quantity: number, price: number, writted_by: string, register_by: string } }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<IBook> => {

   authorization(req)

   await validateUpdateBook(_id, data)

   let book: IBook = await Book.findById(_id)

   await validateGetBook(book)

   const bookUpdated = await Book.findByIdAndUpdate(_id, data, { new: true })

   pubsub.publish('BOOK', {
    book: {
     mutation: 'UPDATE',
     data: bookUpdated
    }
   })

   return bookUpdated
  },

  deleteBook: async (parent: void, { _id }: { _id: string }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<{}> => {

   authorization(req)

   validateId(_id)

   const book: IBook = await Book.findByIdAndDelete(_id)

   await validateGetBook(book)

   pubsub.publish('BOOK', {
    book: {
     mutation: 'DELETE',
     data: book
    }
   })

   return book
  },

 },

 Subscription: {
  book: {
   subscribe(parent: void, args: object, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object) {

    authorization(req)

    return pubsub.asyncIterator('BOOK')
   }
  }
 }
}
