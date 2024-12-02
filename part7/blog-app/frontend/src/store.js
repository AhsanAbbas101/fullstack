import { configureStore } from '@reduxjs/toolkit'

import notification from './reducers/noficationReducer'
import blogs from './reducers/blogReducer'
import user from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notification,
        blogs: blogs,
        user: user
    }
})

export default store