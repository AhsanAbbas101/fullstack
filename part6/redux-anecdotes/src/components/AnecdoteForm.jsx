import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(createAnecdote(anecdote))
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={create}>
          <div><input type="text" name="anecdote"/></div>
          <button>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm