import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNewAnecdote } from '../reducers-toolkit/anecdoteReducer'
import { setNotification } from '../reducers-toolkit/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(createNewAnecdote(anecdote))

        dispatch(setNotification(`you created '${anecdote}'`,5))
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