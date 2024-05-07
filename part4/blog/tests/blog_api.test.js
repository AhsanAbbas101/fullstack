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





after( async () => {
    await mongoose.connection.close()
})