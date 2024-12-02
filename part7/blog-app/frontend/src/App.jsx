import { useState, useEffect, createRef, useContext } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import NotificationContext, {
    setNotification,
    removeNotification,
} from './contexts/notificationContext'
import UserContext, { setUser, removeUser } from './contexts/userContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
    const { status, data, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    const queryClient = useQueryClient()
    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            notify(`Blog created: ${newBlog.title}, ${newBlog.author}`)
        },
        onError: () => {
            notify('Failed to create new blog', 'error')
        },
    })
    const voteBlogMutation = useMutation({
        mutationFn: (blog) => blogService.update(blog.id, blog),
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            )
            notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
        },
    })
    const deleteBlogMutation = useMutation({
        mutationFn: (blog) => blogService.remove(blog.id),
        onSuccess: (data, blog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.filter((b) => b.id !== blog.id)
            )
            notify(`Blog ${blog.title}, by ${blog.author} removed`)
        },
    })

    const [user, userDispatch] = useContext(UserContext)
    const [notification, notificationDispatch] = useContext(NotificationContext)

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            userDispatch(setUser(user))
        }
    }, [])

    const blogFormRef = createRef()

    const notify = (message, type = 'success') => {
        notificationDispatch(
            setNotification(
                message,
                type,
                setTimeout(() => {
                    notificationDispatch(removeNotification())
                }, 5000)
            )
        )
    }

    const handleLogin = async (credentials) => {
        try {
            const user = await loginService.login(credentials)
            userDispatch(setUser(user))
            storage.saveUser(user)
            notify(`Welcome back, ${user.name}`)
        } catch (error) {
            notify('Wrong credentials', 'error')
        }
    }

    const handleCreate = async (blog) => {
        newBlogMutation.mutate(blog)
        blogFormRef.current.toggleVisibility()
    }

    const handleVote = async (blog) => {
        console.log('updating', blog)
        voteBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    }

    const handleLogout = () => {
        userDispatch(removeUser())
        storage.removeUser()
        notify(`Bye, ${user.name}!`)
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlogMutation.mutate(blog)
        }
    }

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification notification={notification.content} />
                <Login doLogin={handleLogin} />
            </div>
        )
    }

    const byLikes = (a, b) => b.likes - a.likes

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification.content} />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable
                buttonLabel="create new blog"
                ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
            </Togglable>
            {status === 'pending' ? (
                <div>loading data...</div>
            ) : status === 'error' ? (
                <div>failed to get data..</div>
            ) : (
                data.sort(byLikes).map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleVote={handleVote}
                        handleDelete={handleDelete}
                    />
                ))
            )}
        </div>
    )
}

export default App
