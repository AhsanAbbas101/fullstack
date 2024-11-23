import { useReducer } from "react";

export const initialState = {
    msg: '',
    timeoutId: undefined
}

const notificationReducer = (state,action) => {
    switch(action.type) {
        case "SET": {
            //
            clearTimeout(state.timeoutId)
            return action.payload
        }
        case "CLEAR": {
            //
            return initialState
        }
        default: return initialState
    }
}

// action creators
export const setNotification = (msg, timeoutId) => {
    return {
        type: "SET",
        payload: {
            msg: msg,
            timeoutId: timeoutId
        }
    }
}

export const removeNotification = () => {
    return {
        type: "CLEAR"
    }  
}

export default notificationReducer