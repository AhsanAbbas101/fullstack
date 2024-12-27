const data = require('./data')

const typeMutation = `
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
`

const mutationResolvers = {
    addBook: data.addBook,
}

module.exports = {
    typeMutation,
    mutationResolvers
}