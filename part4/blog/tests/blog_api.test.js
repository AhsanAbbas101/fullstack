const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../tests/test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


// TESTS
const base_url = '/api/blogs'

describe('[GET] /api/blogs', () => {


    test('blogs are returned from db', async () => {
        await api
            .get(base_url)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get(base_url)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('the first blog author is Michael Chan', async () => {
        const response = await api.get(base_url)

        const authors = response.body.map(blog => blog.author)
        assert(authors.includes('Michael Chan'))
    })
})


describe('blog object properties', () => {

    test('check id', async () => {
        const response = await api.get(base_url)

        assert(Object.keys(response.body[0]).includes('id'))
    })

})

describe('[POST] /api/blogs', () => {

    test('a valid blog is added', async () => {
        const newBlog = {
            title: 'A new blog',
            author: 'Jon Doe',
            url: 'https://example.com',
            likes: 5
        }

        await api.post(base_url)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        assert(titles.includes('A new blog'))
    })

    test('missing likes property defaults to 0', async () => {
        const newBlog = {
            title: 'A new blog with no likes property',
            author: 'Jon Doe',
            url: 'https://example.com',
        }

        const response = await api.post(base_url)
            .send(newBlog)

        assert.strictEqual(response.body.likes,0)
    })

    test('400 if title is missing', async () => {
        const newBlogwithNoTitle = {
            author: 'Jon Doe',
            url: 'https://example.com',
            likes: 5
        }

        await api.post(base_url)
            .send(newBlogwithNoTitle)
            .expect(400)

        const blogs = await helper.blogsInDb()
        assert.strictEqual(blogs.length, helper.initialBlogs.length)

    })

    test('400 if url is missing', async () => {
        const newBlogwithNoURL = {
            title: 'A new blog with no url',
            author: 'Jon Doe',
            likes: 5
        }

        await api.post(base_url)
            .send(newBlogwithNoURL)
            .expect(400)

        const blogs = await helper.blogsInDb()
        assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
})

describe('[DELETE] /api/blogs', () => {
    test('successfully delete a blog', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToDelete = blogsInDb[0]

        await api
            .delete(`${base_url}/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert(!titles.includes(blogToDelete.title))
    })

    test('400 on invalid id', async () => {
        const invalidId = 'invalidID'

        await api
            .delete(`${base_url}/${invalidId}`)
            .expect(400)
    })

    test('404 on missing valid id', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToDelete = blogsInDb[0]

        await api
            .delete(`${base_url}/${blogToDelete.id}`)
            .expect(204)

        await api
            .delete(`${base_url}/${blogToDelete.id}`)
            .expect(404)
    })
})

describe('[PUT] /api/blogs', () => {

    test('successfully update likes of blog', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToUpdate = blogsInDb[0]

        blogToUpdate.likes = blogToUpdate.likes + 10

        const response = await api
            .put(`${base_url}/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsInEnd = await helper.blogsInDb()

        // assert in both response and db
        assert.strictEqual(blogsInEnd[0].likes, blogToUpdate.likes)
        assert.strictEqual(response.body.likes, blogToUpdate.likes)
    })

    test('400 on invalid id', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToUpdate = blogsInDb[0]

        blogToUpdate.likes = blogToUpdate.likes + 10
        const invalidId = 'invalidID'

        await api
            .put(`${base_url}/${invalidId}`)
            .send(blogToUpdate)
            .expect(400)
    })

    test('404 on missing valid id', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogToUpdate = blogsInDb[0]

        blogToUpdate.likes = blogToUpdate.likes + 10

        await api
            .delete(`${base_url}/${blogToUpdate.id}`)
            .expect(204)

        await api
            .put(`${base_url}/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(404)
    })
})


after( async () => {
    await mongoose.connection.close()
})