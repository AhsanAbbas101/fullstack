import { configureStore } from '@reduxjs/toolkit'

import notification from './reducers/noficationReducer'


const store = configureStore({
    reducer: {
        notification: notification
    }
})

export default store