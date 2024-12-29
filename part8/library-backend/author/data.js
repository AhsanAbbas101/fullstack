const Author = require('./model')
const Book = require('../book/model')
const {GraphQLError} = require("graphql")
const getBookCount = async (root) => {
    return  await Book.countDocuments({author: root.id})
}

// Queries
const authorCount = async () => {
    return Author.collection.countDocuments()
}


const allAuthors = async () => {
    
    const authors = await Author.find({})
    return authors
    /*
    return authors.map( async (author) => {
        const bookCount = await Book.countDocuments({author: author.id})
        return {...author.toObject(), bookCount}
    })
    */
    
}

// Mutations
const editAuthor = async (root, args, {currentUser}) => {

    if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
    }

    const author = await Author.findOne({ name: args.name })
    if (!author)
    {
        throw new GraphQLError('No author found.', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                        }
                    })
    }

    author.born = args.setBornTo

    try {
        await author.save()
    } catch (error) {
        throw new GraphQLError('Saving author failed.', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.setBornTo,
                error
            }
        })
    }
    return author
}

module.exports = {
    authorCount,
    allAuthors,
    editAuthor,
    getBookCount
}