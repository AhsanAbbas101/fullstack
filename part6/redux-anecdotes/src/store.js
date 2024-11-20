import { configureStore } from  '@reduxjs/toolkit'

import reducer from './reducers-toolkit/anecdoteReducer'
import filterReducer from './reducers-toolkit/filterReducer'
import notificationReducer from './reducers-toolkit/notificationReducer'

const store = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer,
        notification: notificationReducer
    }
}
)

export default store