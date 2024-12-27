const Author = require('./model')
const Book = require('../book/model')
// Queries
const authorCount = async () => {
    return Author.collection.countDocuments()
}

const allAuthors = async () => {
    
    const authors = await Author.find({})

    return authors.map( async (author) => {
        const bookCount = await Book.countDocuments({author: author.id})
        return {...author.toObject(), bookCount}
    })
    
}

// Mutations
const editAuthor = async (root, args) => {
    const author = await Author.findOne({ name: args.name })
    author.born = args.setBornTo
    return author.save()
}

module.exports = {
    authorCount,
    allAuthors,
    editAuthor
}