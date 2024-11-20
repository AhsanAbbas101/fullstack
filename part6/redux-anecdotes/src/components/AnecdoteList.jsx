import { useSelector, useDispatch } from "react-redux"
//import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdote } from '../reducers-toolkit/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers-toolkit/notificationReducer'

const Anecdote = ({ anecdote, voteCallback }) => {
    return (
        <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={voteCallback}>vote</button>
              </div>
            </div>
    )
}


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '')
            return state.anecdotes

        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))
    
      dispatch(setNotification({
        msg:`you voted '${anecdote.content}'`,
        timeoutID: setTimeout(() => {dispatch(removeNotification())},5000)
        }))
    }
     
    return (
        <>
            { anecdotes.map(anecdote =>
                <Anecdote key={ anecdote.id } anecdote={anecdote} voteCallback={() => vote(anecdote)}/>
            )}
        </>
    )
}

export default AnecdoteList