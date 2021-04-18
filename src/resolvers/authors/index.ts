import { PubSub } from 'apollo-server-express'
import { User, Author, Book } from '../../models/'
import { validateId } from '../validate/validateId'
import { Authors, ParentAuthor, IAuthor, GetAuthors, CreateAuthor } from './IAuthors'
import { validateGetAuthor, validateCreateAuthor, validateUpdateAuthor } from './validateAuthors'
import { authorization } from '../../utils'

export const authors: Authors = {

  Author: {

    register_by: async (parent: ParentAuthor, args: object, { req }: { req: Request }, info: object) => {

      authorization(req)

      return await User.findOne({ _id: parent.register_by })
    },

    books: async (parent: ParentAuthor, args: object, { req }: { req: Request }, info: object) => {

      authorization(req)

      return await Book.find({ writted_by: parent._id })
    }
  },

  Query: {

    getAuthors: async (parent: void, { first, skip, orderBy }: { first: number, skip: number, orderBy: string }, { req }: { req: Request }, info: object): Promise<GetAuthors> => {

      authorization(req)

      return await Author.find().sort(orderBy).limit(first).skip(skip)
    },

    getAuthor: async (parent: void, { _id }: { _id: string }, { req }: { req: Request }, info: object): Promise<IAuthor> => {

      authorization(req)

      validateId(_id)

      const author: IAuthor = await Author.findById(_id)

      await validateGetAuthor(author)

      return author
    }
  },

  Mutation: {

    createAuthor: async (parent: void, { data }: { data: CreateAuthor }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<CreateAuthor> => {

      authorization(req)

      await validateCreateAuthor(data)

      const { name, lastname, country, register_by } = data

      const author: CreateAuthor = new Author({
        name,
        lastname,
        country,
        register_by
      })

      const authorCreated = await author.save()

      pubsub.publish('AUTHOR', {
        author: {
          mutation: 'CREATE',
          data: authorCreated
        }
      })

      return await authorCreated.save()
    },

    updateAuthor: async (parent: void, { _id, data }: { _id: string, data: { name: string, lastname: string, country: string, register_by: string } }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<IAuthor> => {

      authorization(req)

      await validateUpdateAuthor(_id, data)

      let author: IAuthor = await Author.findById(_id)

      await validateGetAuthor(author)

      const authorUpdated = await Author.findByIdAndUpdate(_id, data, { new: true })


      pubsub.publish('AUTHOR', {
        author: {
          mutation: 'UPDATE',
          data: authorUpdated
        }
      })

      return authorUpdated
    },

    deleteAuthor: async (parent: void, { _id }: { _id: string }, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object): Promise<IAuthor> => {

      authorization(req)

      validateId(_id)

      const author: IAuthor = await Author.findByIdAndDelete(_id)

      await validateGetAuthor(author)

      await Book.findOneAndDelete({ writted_by: _id })

      pubsub.publish('AUTHOR', {
        author: {
          mutation: 'DELETE',
          data: author
        }
      })

      return author
    }

  },

  Subscription: {
    author: {
      subscribe(parent: void, args: object, { pubsub, req }: { pubsub: PubSub, req: Request }, info: object) {

        authorization(req)

        return pubsub.asyncIterator('AUTHOR')
      }
    }
  }
}
