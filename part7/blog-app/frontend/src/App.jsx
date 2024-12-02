import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/noficationReducer'
import {
    initializeBlogs,
    createBlog,
    voteBlog,
    deleteBlog,
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()

    //const [blogs, setBlogs] = useState([])
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    // const [_, setUser] = useState(null)
    //const [notification, setNotification] = useState(null)

    useEffect(() => {
        //blogService.getAll().then((blogs) => setBlogs(blogs))
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            dispatch(setUser(user))
        }
    }, [])

    const blogFormRef = createRef()

    const notify = (message, type = 'success') => {
        dispatch(setNotification(message, type))
        // setNotification({ message, type })
        // setTimeout(() => {
        //     setNotification(null)
        // }, 5000)
    }

    const handleLogin = async (credentials) => {
        try {
            const user = await loginService.login(credentials)
            dispatch(setUser(user))
            storage.saveUser(user)
            notify(`Welcome back, ${user.name}`)
        } catch (error) {
            notify('Wrong credentials', 'error')
        }
    }

    const handleCreate = async (blog) => {
        // const newBlog = await blogService.create(blog)
        // setBlogs(blogs.concat(newBlog))
        const newBlog = await dispatch(createBlog(blog)) //TODO verify
        notify(`Blog created: ${newBlog.title}, ${newBlog.author}`)
        blogFormRef.current.toggleVisibility()
    }

    const handleVote = async (blog) => {
        console.log('updating', blog)
        // const updatedBlog = await blogService.update(blog.id, {
        //     ...blog,
        //     likes: blog.likes + 1,
        // })
        const updatedBlog = await dispatch(voteBlog(blog))
        notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
        //setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
    }

    const handleLogout = () => {
        dispatch(setUser(null))
        storage.removeUser()
        notify(`Bye, ${user.name}!`)
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            //await blogService.remove(blog.id)
            //setBlogs(blogs.filter((b) => b.id !== blog.id))
            dispatch(deleteBlog(blog))
            notify(`Blog ${blog.title}, by ${blog.author} removed`)
        }
    }

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <Login doLogin={handleLogin} />
            </div>
        )
    }

    const byLikes = (a, b) => b.likes - a.likes

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable
                buttonLabel="create new blog"
                ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
            </Togglable>
            {[...blogs].sort(byLikes).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}

export default App
