const data = require('./data')

const typeQuery = `
    authorCount: Int!
    allAuthors: [Author!]!
`

const queryResolvers = {
    authorCount: data.authorCount,
    allAuthors: data.allAuthors
}

module.exports = {
    typeQuery,
    queryResolvers
}