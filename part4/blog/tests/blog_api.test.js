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

    for( let blog of helper.initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})


// TESTS

describe('[GET] /api/blogs', () => {

    const base_url = '/api/blogs'

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




after( async () => {
    await mongoose.connection.close()
})