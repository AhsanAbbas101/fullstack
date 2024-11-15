import { useState, useEffect } from 'react'

// Components
import {Blog, BlogForm} from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [noificationMsg, setNoificationMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setLoggedUser(user)
    }
  }, [])

  const onLogout = () => {
    setLoggedUser(null)
    window.localStorage.removeItem('loggedAppUser')
  }


  const loginUser = async (username,password) => {
    try {
      
      const user = await loginService.login({username,password})
      blogService.setToken(user.token)

      window.localStorage.setItem(
          'loggedAppUser', JSON.stringify(user)
      ) 
      setLoggedUser(user)

      enableNotification(true,`${username} successfully logged in.`)
      return true
    } 
    catch (exception) {
        enableNotification(false,'Invalid username or password')
        console.log('Invalid username or password')
        return false
    }    
  }

  const createBlog = async (newBlog) => {
    try {

      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))

      console.log(`New Blog title ${blog.title} added!`)
      enableNotification(true,`New Blog with title ${blog.title} added!`)
    }
    catch (exception) {
      enableNotification(false,'Failed to create new blog.')
      console.log('Error creating new blog')
    }
  }

  const enableNotification = (positive, msg, delay=5000) => {
    setNoificationMsg({
      positive:positive,
      msg:msg
    })
    setTimeout(() => {
      setNoificationMsg(null)
    }, delay) 
  }

  if (loggedUser === null) {
    
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={noificationMsg}/>
        <Login  loginUser={loginUser}/>
      </div>
    )

  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={noificationMsg} />
      <p>
        {loggedUser.name} logged in
        <button onClick={onLogout}>Log out</button>
      </p>
      
      <h2>create new</h2>

      <BlogForm createBlog={createBlog}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


}

export default App