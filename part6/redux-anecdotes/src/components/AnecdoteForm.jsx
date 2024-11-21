import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers-toolkit/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers-toolkit/notificationReducer'

import service from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        
        service
            .create(anecdote)
            .then(anecdoteObj => {
                event.target.anecdote.value = ''

                dispatch(createAnecdote(anecdoteObj))

                dispatch(setNotification({
                    msg:`you created '${anecdote}'`,
                    timeoutID: setTimeout(() => {dispatch(removeNotification())},5000)
                }))
            })
            .catch(e => {
                dispatch(setNotification({
                    msg:`Failed to create anecdote: '${anecdote}'`,
                    timeoutID: setTimeout(() => {dispatch(removeNotification())},5000)
                }))                
            })
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