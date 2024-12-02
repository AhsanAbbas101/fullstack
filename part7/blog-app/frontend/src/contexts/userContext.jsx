import { useReducer, createContext, useContext } from 'react'

// REDUCER
export const initialState = null

const userReducer = (state, action) => {
    switch (action.type) {
    case 'SET': {
        return action.payload
    }
    case 'CLEAR': {
        return initialState
    }
    default:
        return initialState
    }
}

// action creators
export const setUser = (user) => {
    return {
        type: 'SET',
        payload: user,
    }
}

export const removeUser = () => {
    return {
        type: 'CLEAR',
    }
}

// CONTEXT

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(
        userReducer,
        initialState
    )

    return (
        <UserContext.Provider
            value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const [user, userDispatch] = useContext(UserContext)
    return user
}
export const useUserDispatch = () => {
    const [user, userDispatch] = useContext(UserContext)
    return userDispatch
}

export default UserContext
