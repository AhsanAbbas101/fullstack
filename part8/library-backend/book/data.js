
const { GraphQLError } = require('graphql')
const Author = require('../author/model')
const Book = require('./model')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const getAuthor = async (root) => {
    return Author.findById(root.author) 
}

// Queries
const bookCount = async () => {
    return Book.collection.countDocuments()
}

const allBooks = async (root, args) => {
    //args - author: String, genre: String

    const condition = {}
    if (args.author)
    {
        const author = await Author.findOne({ name: args.author })
        if (author)
            condition.author = author._id
    }
    if (args.genre)
        condition.genres = args.genre
    
    return Book.find(condition)
  
}

const allGenres = async () => {
    const books = await Book.find({}, 'genres')
    let genres = new Set()
    books.forEach(book => genres = new Set([...genres, ...book.genres]))
    return Array.from(genres)

}

// Mutations
const addBook = async (root, args, {currentUser}) => {    
    
    if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
    }

    let author = await Author.findOne({ name: args.author })
    if (!author)
    {
        author = new Author({ name: args.author })
        try {
            await author.save()
        } catch (error) {
            throw new GraphQLError('Saving author failed.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.author,
                    error
                }
            })
        }
        
    }

    const book = new Book({ ...args, author: author.id })
    try {
        await book.save()
    } catch (error) {
        throw new GraphQLError('Saving book failed.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    error
                }
            })
    }

    pubsub.publish("BOOK_ADDED", {bookAdded: book})

    return book
}

// Subscriptions
const bookAdded = () => {
    return pubsub.asyncIterableIterator("BOOK_ADDED")
}

module.exports = {
    addBook,
    getAuthor,
    bookCount,
    allBooks,
    allGenres,
    bookAdded
}


