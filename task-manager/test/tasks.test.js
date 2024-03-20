const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task.model')
const {
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
} = require('./fixtures/db')


beforeEach(setUpDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "test task"
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should fetch all tasks for a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
    expect(response.body[0].description).toBe("task one test")
    expect(response.body[1].description).toBe("task two test")
})

test('Should not accept deletion of task if not owner', async () => {
    await request(app)
        .delete(`/delete/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

        const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()

})