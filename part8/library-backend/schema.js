
const typeDefs = `
    ${require('./book/type').typeDef}
    ${require('./author/type').typeDef}
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
    type Subscription {
        ${require('./book/subsciption').typeSubsciption}
    }
`

const resolvers = {
    ...require('./book/type').typeResolver,
    ...require('./author/type').typeResolver,
    Query: {
        ...require('./book/query').queryResolvers,
        ...require('./author/query').queryResolvers,
        ...require('./user/query').queryResolvers,
    },
    Mutation: {
        ...require('./book/mutation').mutationResolvers,
        ...require('./author/mutation').mutationResolvers,
        ...require('./user/mutation').mutationResolvers,
    },
    Subscription: {
        ...require('./book/subsciption').subscriptionResolvers
    }
}

module.exports = {
    typeDefs,
    resolvers
}