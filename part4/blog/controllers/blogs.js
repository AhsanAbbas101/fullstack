const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user',{ username:1, name:1 })

    response.json(blogs)

    /*
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
    */
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    blog.likes = blog.likes || 0

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    if (blog.title && blog.url)
    {
        // assign user as creater of blog
        // const user = await User.findOne()
        const user = await User.findById(decodedToken.id)
        blog.user = user._id

        const result = await blog.save()

        // assign blog id to user doc
        const updatedUser = await User.findByIdAndUpdate(user._id, { blogs: user.blogs.concat([blog.id]) }, { new: true })
        console.log(updatedUser)

        response.status(201).json(result)
    }

    response.status(400).json({ error: 'Missing blog title or url' })

    /*
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
    */
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if (blog)
    {
        response.status(204).end()
    }
    response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
        response.json(updatedBlog)
    }

    response.status(404).end()
})

module.exports = blogsRouter