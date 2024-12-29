const data = require('./data')

const typeDef = `
type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int!
}
`
const typeResolver = {
    Author: {
        bookCount: data.getBookCount
    }
}

module.exports = {
    typeDef,
    typeResolver
}