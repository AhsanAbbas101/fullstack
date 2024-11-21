import { createSlice } from "@reduxjs/toolkit";

import service from "../services/anecdotes";


const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            return state.concat(action.payload)
        },
        voteAnecdote(state, action) {
            state = state.map(a => a.id === action.payload.id ? action.payload : a)
            return state.sort((a,b) => b.votes - a.votes)
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a,b) => b.votes - a.votes)
        }
    }
})

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await service.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createNewAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await service.create(anecdote)
        dispatch(createAnecdote(newAnecdote))
    }
}

export const voteAnAnecdote = (anecdote) => {
    return async (dispatch) => {
        const obj = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        const update = await service.vote(obj)
        dispatch(voteAnecdote(update))
    }
}

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer