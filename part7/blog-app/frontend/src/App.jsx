import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './services/storage'
import Login from './components/Login'
import Blog, { BlogView } from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User, { UserList } from './components/User'

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/noficationReducer'
import {
    initializeBlogs,
    createBlog,
    voteBlog,
    deleteBlog,
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Route, Routes, Link, useMatch } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    // using basic state management as only getting users is required.
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            dispatch(setUser(user))
        }
    }, [])

    const blogFormRef = createRef()

    const blogMatch = useMatch('/blogs/:id')
    const matchedBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null
    const userMatch = useMatch('/users/:id')
    const matchedUser = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null

    const notify = (message, type = 'success') => {
        dispatch(setNotification(message, type))
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
        const newBlog = await dispatch(createBlog(blog))
        notify(`Blog created: ${newBlog.title}, ${newBlog.author}`)
        blogFormRef.current.toggleVisibility()
    }

    const handleVote = async (blog) => {
        console.log('updating', blog)
        const updatedBlog = await dispatch(voteBlog(blog))
        notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    }

    const handleLogout = () => {
        dispatch(setUser(null))
        storage.removeUser()
        notify(`Bye, ${user.name}!`)
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
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
    const linkStyle = {
        padding: 5,
    }

    return (
        <>
            <div>
                <Link
                    style={linkStyle}
                    to="/">
                    blogs
                </Link>
                <Link
                    style={linkStyle}
                    to="/users">
                    users
                </Link>
                <br />
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Notification />

            <Routes>
                <Route
                    path="/blogs/:id"
                    element={
                        <BlogView
                            blog={matchedBlog}
                            handleVote={handleVote}
                            handleDelete={handleDelete}
                        />
                    }
                />
                <Route
                    path="/users/:id"
                    element={<User user={matchedUser} />}
                />
                <Route
                    path="/users"
                    element={<UserList users={users} />}
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <h2>blog app</h2>

                            <Togglable
                                buttonLabel="create new blog"
                                ref={blogFormRef}>
                                <NewBlog doCreate={handleCreate} />
                            </Togglable>

                            {[...blogs].sort(byLikes).map((blog) => (
                                <div
                                    key={blog.id}
                                    style={{
                                        border: 'solid',
                                        padding: 10,
                                        borderWidth: 1,
                                        marginBottom: 5,
                                    }}>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    }
                />
            </Routes>
        </>
    )
}

export default App
