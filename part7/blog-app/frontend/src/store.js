import { configureStore } from '@reduxjs/toolkit'

import notification from './reducers/noficationReducer'
import blogs from './reducers/blogReducer'

const store = configureStore({
    reducer: {
        notification: notification,
        blogs: blogs
    }
})

export default store