import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (anecdote) => {
    const obj = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseUrl,obj)
    return response.data
}

const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {votes:anecdote.votes})
    return response.data
}

export default { getAll, create, vote }