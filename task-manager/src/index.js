const express = require("express")
require('./db/mongoose')
const User = require("./models/user")
const Task = require("./models/task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


//create new user
app.post('/user', (req, res) => {
    const user = new User(req.body)

    user.save()
    .then(() => res.status(201).send(user))
    .catch((error) => res.status(400).send(error))
})

//create new task
app.post("/task", (req, res) => {
    const task = new Task(req.body)

    task.save()
    .then(() => res.status(201).send(task))
    .catch((error) => res.status(400).send(error))
})

//fetch all users
app.get("/users", (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch( error => res.status(500).send(error))
})

//fetch all tasks
app.get("/tasks", (req, res) =>{
    Task.find({})
    .then(tasks => {
        if(tasks.length == 0) return res.status(404).send()
        res.send(tasks)
    })
    .catch(() => res.status(500).send())
})


//get user by id
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id)
    .then( user => {
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    })
    .catch(() => res.status(500).send())
})


//get task by id
app.get("/task/:id", (req, res) => {
    const taskId = req.params.id

    Task.findById(taskId)
    .then((task) => {
        if(!task) return req.status(404).send()

        res.send(task)
    })
    .catch(() => req.status(500).send())
})


app.listen(port, () => {
    console.log("server is up on port " + port)
})