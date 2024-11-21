import { useSelector, useDispatch } from "react-redux"
//import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnAnecdote } from '../reducers-toolkit/anecdoteReducer'
import { setNotification } from '../reducers-toolkit/notificationReducer'

import PropTypes  from 'prop-types'

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

Anecdote.propTypes = {
    anecdote: PropTypes.exact({
        id: PropTypes.string,
        content: PropTypes.string,
        votes: PropTypes.number
    }),
    voteCallback: PropTypes.func
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
      //dispatch(voteAnecdote(anecdote.id))
      dispatch(voteAnAnecdote(anecdote))
      
      dispatch(setNotification(`you voted '${anecdote.content}'`,5))
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