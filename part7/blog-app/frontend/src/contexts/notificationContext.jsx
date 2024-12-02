import { useReducer, createContext, useContext } from 'react'

// REDUCER
export const initialState = {
    content: null,
    timeoutId: undefined,
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET': {
            clearTimeout(state.timeoutId)
            return action.payload
        }
        case 'CLEAR': {
            //
            return initialState
        }
        default:
            return initialState
    }
}

// action creators
export const setNotification = (msg, type, timeoutId) => {
    return {
        type: 'SET',
        payload: {
            content: {
                message: msg,
                type: type,
            },
            timeoutId: timeoutId,
        },
    }
}

export const removeNotification = () => {
    return {
        type: 'CLEAR',
    }
}

// CONTEXT

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        initialState
    )

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    return notification
}
export const useNotificationDispatch = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    return notificationDispatch
}

export default NotificationContext
