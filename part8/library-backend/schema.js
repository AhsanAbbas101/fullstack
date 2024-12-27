
const typeDefs = `
    ${require('./book/type').typeDef}
    ${require('./author/type')}
    type Query {
        ${require('./book/query').typeQuery}
        ${require('./author/query').typeQuery}
    }
    type Mutation {
        ${require('./book/mutation').typeMutation}
        ${require('./author/mutation').typeMutation}
    }
`

const resolvers = {
    ...require('./book/type').typeResolver,
    Query: {
        ...require('./book/query').queryResolvers,
        ...require('./author/query').queryResolvers,
    },
    Mutation: {
        ...require('./book/mutation').mutationResolvers,
        ...require('./author/mutation').mutationResolvers,
    }
}

module.exports = {
    typeDefs,
    resolvers
}