
const data = require('./data')

const typeQuery = `
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
`

const queryResolvers = {
    bookCount: data.bookCount,
    allBooks: data.allBooks,
    allGenres: data.allGenres
}

module.exports = {
    typeQuery,
    queryResolvers
}