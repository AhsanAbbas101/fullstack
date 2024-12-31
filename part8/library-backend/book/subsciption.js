

const data = require('./data')

const typeSubsciption = `
    bookAdded: Book!
`

const subscriptionResolvers = {
    bookAdded: {
        subscribe: data.bookAdded
    },
}

module.exports = {
    typeSubsciption,
    subscriptionResolvers
}