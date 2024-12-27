const data = require('./data')


const typeDef = `
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}`

const typeResolver = {
    Book: {
        author: data.getAuthor
    }
}
module.exports = {
    typeDef,
    typeResolver
}