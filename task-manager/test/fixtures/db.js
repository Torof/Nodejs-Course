const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user.model')
const Task = require('../../src/models/task.model')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "tom",
    email: "scottintrip@gmail.com",
    password: "pswtom!",
    tokens: [{
        token: jwt.sign({ _id: userOneId }
            , process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "bob",
    email: "bob@gmail.com",
    password: "pswbob!",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }
            , process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "task one test",
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "task two test",
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "task three test",
    completed: false,
    owner: userTwo._id
}

const setUpDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
}