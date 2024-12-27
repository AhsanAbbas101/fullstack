const data = require('./data')

const typeMutation = `
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
`
const mutationResolvers = {
    editAuthor: data.editAuthor,
}

module.exports = {
    typeMutation,
    mutationResolvers
}