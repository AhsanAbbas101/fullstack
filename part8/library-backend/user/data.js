const jwt = require('jsonwebtoken')

const User = require('./model')

const { GraphQLError } = require('graphql')

// Query
const me = (root,args,context) => {
    return context.currentUser
}

// Mutations
const createUser = async (root,args) => {
    const user = new User({ ...args })
    
    try {
        await user.save()
    } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
    }
    return user
}

const login = async (root, args) => {
    const user = await User.findOne({ username: args.username })
    
    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    console.log("userForToken",userForToken);
    
    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
}

module.exports = {
    me,
    createUser,
    login
}