const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

    if (blog.title && blog.url)
    {
        const result = await blog.save()
        response.status(201).json(result)
    }

    response.status(400).end()

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