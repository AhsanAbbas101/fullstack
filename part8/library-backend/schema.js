
const typeDefs = `
    ${require('./book/type').typeDef}
    ${require('./author/type')}
    ${require('./user/type').typeDef}
    type Query {
        ${require('./book/query').typeQuery}
        ${require('./author/query').typeQuery}
        ${require('./user/query').typeQuery}
    }
    type Mutation {
        ${require('./book/mutation').typeMutation}
        ${require('./author/mutation').typeMutation}
        ${require('./user/mutation').typeMutation}
    }
`

const resolvers = {
    ...require('./book/type').typeResolver,
    Query: {
        ...require('./book/query').queryResolvers,
        ...require('./author/query').queryResolvers,
        ...require('./user/query').queryResolvers,
    },
    Mutation: {
        ...require('./book/mutation').mutationResolvers,
        ...require('./author/mutation').mutationResolvers,
        ...require('./user/mutation').mutationResolvers,
    }
}

module.exports = {
    typeDefs,
    resolvers
}