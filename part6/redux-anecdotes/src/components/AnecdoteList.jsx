import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
    }
     
    return (
        <>
            { anecdotes.map(anecdote =>
                <Anecdote key={ anecdote.id } anecdote={anecdote} voteCallback={() => vote(anecdote.id)}/>
            )}
        </>
    )
}

export default AnecdoteList