import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers-toolkit/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers-toolkit/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(createAnecdote(anecdote))

        dispatch(setNotification({
            msg:`you created '${anecdote}'`,
            timeoutID: setTimeout(() => {dispatch(removeNotification())},5000)
        }))
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