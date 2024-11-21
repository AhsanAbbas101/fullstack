import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msg: 'Default notifications go here.',
    timeoutID: undefined
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        set(state, action) {
            clearTimeout(state.timeoutID)
            return action.payload
            
        },
        // eslint-disable-next-line no-unused-vars
        clear(state, action) {
            return initialState
        }
    }
})

export const setNotification = (msg, time) => {
    return (dispatch) => {
        dispatch(set({
            msg: msg,
            timeoutID : setTimeout(() => dispatch(clear()), time * 1000)
        }))
    }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer