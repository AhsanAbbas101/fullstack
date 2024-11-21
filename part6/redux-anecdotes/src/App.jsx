import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import service from './services/anecdotes'

import { setAnecdotes } from './reducers-toolkit/anecdoteReducer'
const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
      service
        .getAll()
        .then(a => dispatch(setAnecdotes(a)))
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App