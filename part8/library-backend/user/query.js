const data = require('./data')

const typeQuery = `
    me: User
`

const queryResolvers = {
    me: data.me
}

module.exports = {
    typeQuery,
    queryResolvers
}