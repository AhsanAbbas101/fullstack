import { useQueryClient, useMutation } from '@tanstack/react-query'

import service from '../services/anecdotes'

import { useNotificationDispatch } from '../contexts/notificationContext'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const anecdoteMutation = useMutation({
    mutationFn: service.create,
    onError: (error) => {
      dispatch(setNotification(
        `${error.response.data.error}`,
        setTimeout(() => dispatch(removeNotification()), 5000)
      ))
    },
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote)
      //queryClient.invalidateQueries({queryKey:['anecdotes']})
      const data = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], data.concat(newAnecdote))

      dispatch(setNotification(
        `You created '${newAnecdote.content}'`,
        setTimeout(() => dispatch(removeNotification()), 5000)
      ))

    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    anecdoteMutation.mutate({content,votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
