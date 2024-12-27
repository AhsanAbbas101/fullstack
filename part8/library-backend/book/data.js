
const Author = require('../author/model')
const Book = require('./model')

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
        console.log(args.author);
        const author = await Author.findOne({ name: args.author })
        // TODO if author doesn't exists
        condition.author = author._id
    }
    if (args.genre)
        condition.genres = args.genre
    
    return Book.find(condition)
  
}

// Mutations
const addBook = async (root, args) => {    
    
    let author = await Author.findOne({ name: args.author })
    if (!author)
    {
        author = new Author({ name: args.author })
        await author.save()
    }

    const book = new Book({ ...args, author: author.id })
    return book.save()
}

module.exports = {
    addBook,
    getAuthor,
    bookCount,
    allBooks
}


