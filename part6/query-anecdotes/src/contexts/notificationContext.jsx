
import reducer, { initialState } from '../reducers/notificationReducer'

import { createContext, useReducer, useContext } from 'react'


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(reducer, initialState)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
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
