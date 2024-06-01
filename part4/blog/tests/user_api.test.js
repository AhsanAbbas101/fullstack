const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../tests/test_helper')
const bcrypt = require('bcryptjs')

const api = supertest(app)

const User = require('../models/user')


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secrytKey',10)
    const user = new User ({
        username: 'root',
        name: 'admin',
        passwordHash: passwordHash,
    })

    await user.save()
})

const base_url = '/api/users'

describe('[POST] /api/users', () => {
    test('a valid user is added', async () => {
        const usersInDb = await helper.usersInDb()

        const newUser = {
            username: 'aabbas',
            name: 'Ahsan Abbas',
            password: 'passwordSeckret',
        }

        await api
            .post(base_url)
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersInDb.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

})

after( async () => {
    await mongoose.connection.close()
})

