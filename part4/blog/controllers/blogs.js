const blogsRouter = require('express').Router()
//const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
//const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user',{ username:1, name:1 })

    return response.json(blogs)

    /*
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
    */
})

blogsRouter.post('/', userExtractor ,async (request, response) => {
    const blog = new Blog(request.body)
    blog.likes = blog.likes || 0

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'invalid token' })
    // }

    if (blog.title && blog.url)
    {
        // assign user as creater of blog
        // const user = await User.findOne()
        // const user = await User.findById(decodedToken.id)
        const user = request.user
        blog.user = user._id

        const result = await blog.save()

        // assign blog id to user doc
        const updatedUser = await User.findByIdAndUpdate(user._id, { blogs: user.blogs.concat([blog.id]) }, { new: true })
        console.log(updatedUser)

        return response.status(201).json(result)
    }

    return response.status(400).json({ error: 'Missing blog title or url' })

    /*
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
    */
})

blogsRouter.delete('/:id' , userExtractor, async (request, response) => {

    // verify token
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'invalid token' })
    // }

    const blog = await Blog.findById(request.params.id)
    if (!blog)
    {
        return response.status(404).json({ error: 'invalid blog id' })
    }

    // check if the blog creator and token user are same
    // if (blog.user.toString() === decodedToken.id.toString())
    if (blog.user.toString() === request.user.id.toString())
    {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    else
    {
        return response.status(401).json({ error: 'Deletion on object not allowed.' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
        return response.json(updatedBlog)
    }

    return response.status(404).end()
})

module.exports = blogsRouter