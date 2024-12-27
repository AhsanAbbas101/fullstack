
const data = require('./data')

const typeQuery = `
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
`

const queryResolvers = {
    bookCount: data.bookCount,
    allBooks: data.allBooks
}

module.exports = {
    typeQuery,
    queryResolvers
}