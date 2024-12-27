const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')


require('dotenv').config()

require('./mongodb').connectDb()

const { typeDefs, resolvers } = require('./schema')

/*
const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int!
}

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
        dummy: () => 0,
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (!args.author && !args.genre)
                return books

            var data = books
            if (args.author)
                data = data.filter(book => book.author === args.author)
            if (args.genre)
                data = data.filter(book => book.genres.includes(args.genre) )

            return data
        },
        allAuthors: () => authors.map(author => {
            const bookCount = books.filter(book => book.author === author.name).length
                return {...author, bookCount}
            }) 
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id: uuid() }
            books = books.concat(book)

            if (!authors.find(author => book.author === author.name)) {
                const newAuthor = { name: book.author, id: uuid() }
                authors = authors.concat(newAuthor)
            }
            return book
        },
        editAuthor: (root, args) => {
            const author = authors.find(author => author.name === args.name)
            if (!author)
                return null

            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
            return updatedAuthor
        }
    }
}
*/

const setContext = require('./context').setContext

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: setContext
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})