const data = require('./data')

const typeMutation = `
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
`

const mutationResolvers = {
    createUser: data.createUser,
    login: data.login 
}

module.exports = {
    typeMutation,
    mutationResolvers
}