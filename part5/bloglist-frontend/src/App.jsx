import { useState, useEffect } from 'react'

// Components
import Blog from './components/Blog'
import Login from './components/Login'

// Services
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  

  const [loggedUser, setLoggedUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [])

  const onLogout = () => {
    setLoggedUser(null)
    window.localStorage.removeItem('loggedAppUser')
  }


  if (loggedUser === null) {
    
    return (
      <div>
        <h2>log in to application</h2>
        <Login  setUser={setLoggedUser}
                handleError={(msg) => {
                  console.log(msg)
                }}/>
      </div>
    )

  }


  return (
    <div>
      <h2>blogs</h2>

      <p>
        {loggedUser.name} logged in
        <button onClick={onLogout}>Log out</button>
      </p>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


}

export default App