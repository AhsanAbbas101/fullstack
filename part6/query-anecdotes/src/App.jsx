import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import service from './services/anecdotes'

import { useNotificationDispatch } from './contexts/notificationContext'
import { setNotification, removeNotification } from './reducers/notificationReducer'

const App = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: service.vote,
    onSuccess: (anecdote) => {
      const data = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],data.map(a => a.id === anecdote.id ? anecdote : a ))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate({...anecdote, votes:anecdote.votes+1})

    dispatch(setNotification(
      `You voted '${anecdote.content}'`,
      setTimeout(() => dispatch(removeNotification()), 5000)
    ))
  }

  const { status, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: service.getAll,
    retry:1,
    refetchOnWindowFocus: false,
  })

  if (status === 'error') {
    return (
      <p>anecdote service not available due to problems in the server</p>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
  
      { status === 'pending' ? <span>Loading anecdotes</span> :
        
        data.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }

      
    </div>
  )
}

export default App
