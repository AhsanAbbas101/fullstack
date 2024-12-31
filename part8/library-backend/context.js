
const User = require('./user/model')
const jwt = require('jsonwebtoken')

const loaders = require('./loaders')

const setContext = async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    const contextValue = {}
  
    if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
        )
        console.log("decodedToken", decodedToken)
        console.log("auth.substring(7)",auth.substring(7));
        
      const currentUser = await User
        .findById(decodedToken.id)
      
      contextValue.currentUser = currentUser

  }

  contextValue.loaders = loaders
  
  return contextValue
}

module.exports = { setContext } 