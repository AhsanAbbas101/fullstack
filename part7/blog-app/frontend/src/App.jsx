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
import { Route, Routes, Link, useMatch, useNavigate } from 'react-router-dom'

import {
    AppBar,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'
import Navigation from './components/Navigation'

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

    const navigate = useNavigate()

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
        // blogFormRef.current.toggleVisibility()
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
            navigate('/')
        }
    }

    if (!user) {
        return (
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Typography variant="h6">BLOGS APP</Typography>
                    </Container>
                </AppBar>
                <Notification />
                <Login doLogin={handleLogin} />
            </div>
        )
    }

    const byLikes = (a, b) => b.likes - a.likes

    return (
        <Container>
            <Navigation
                user={user}
                doLogout={handleLogout}
            />
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
                            <br />
                            <Togglable
                                buttonLabel="create new blog"
                                ref={blogFormRef}>
                                <NewBlog
                                    doCreate={(blog) => {
                                        handleCreate(blog)
                                        blogFormRef.current.toggleVisibility()
                                    }}
                                />
                            </Togglable>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {[...blogs]
                                            .sort(byLikes)
                                            .map((blog) => (
                                                <TableRow key={blog.id}>
                                                    <TableCell>
                                                        <Typography
                                                            component={Link}
                                                            to={`/blogs/${blog.id}`}
                                                            variant="h6">
                                                            {blog.title}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {blog.user.name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                />
            </Routes>
        </Container>
    )
}

export default App
