import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msg: 'Default notifications go here.',
    timeoutID: undefined
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotification(state, action) {
            clearTimeout(state.timeoutID)
            return action.payload
            
        },
        removeNotification(state, action) {
            return initialState
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer