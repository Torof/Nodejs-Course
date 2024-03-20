const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user.model')
const { userOne, userOneId, setUpDatabase} = require('./fixtures/db')


beforeEach(setUpDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users/signup')
        .send({
            name: "joe",
            email: "scottpanam@protonmail.com",
            password: 'pswjoe'
        }).expect(201)

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "joe",
            email: "scottpanam@protonmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('pswjoe')

})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        
        const userOneMock = await User.findById(userOneId)
    
        expect(response.body.token).toBe(userOneMock.tokens[1].token)

})

test('Should fail use non existant', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: "wrongpsw"
        }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//delete account
test('Should delete account', async () => {
     await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const deletedUser = await User.findById(userOneId)
        expect(deletedUser).toBeNull()
})


//delete account failure unauthenticated
test('Should fail deleting account if unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//test if image save is a binary buffer
test('Should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

//test update user
test('Should update valid user field', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ 
        name: "flavien",
        age: 45
    })
    .expect(200)

    const user = await User.findById(userOneId)

    expect(user.name).toBe("flavien")
    expect(user.age).toBe(45)
})

test('Should not update invalid user field', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ 
        location: "ploucville"
    })
    .expect(400)
})

