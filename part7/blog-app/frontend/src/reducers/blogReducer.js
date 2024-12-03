import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload
        },
        create(state, action) {
            return state.concat(action.payload)
        },
        sort(state, action) {
            const byLikes = (a, b) => b.likes - a.likes
            return state.sort(byLikes)
        },
        replaceOne(state, action) {
            return state.map(a => a.id === action.payload.id ? action.payload : a)
        },
        deleteOne(state, action) {
            return state.filter(a => a.id !== action.payload.id)
        }
    }
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(set(blogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch(create(newBlog))
        return newBlog
    }
}

export const voteBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1,
        })
        dispatch(replaceOne(updatedBlog))
        return updatedBlog
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog.id)
        dispatch(deleteOne(blog))
    }
}

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.comment(id, { comment: comment })
        dispatch(replaceOne(updatedBlog))
    }
}

export const { set,create,sort, replaceOne,deleteOne  } = blogSlice.actions
export default blogSlice.reducer