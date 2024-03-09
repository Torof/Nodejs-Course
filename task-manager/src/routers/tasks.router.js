const express = require('express')
const router = new express.Router
const auth = require('../middleware/auth.middleware')
const Task = require("../models/task.model")

//create new task
router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


//fetch all tasks of a user
//?completed=true||false
//?limit
//?skip
//?sortBy
router.get("/tasks", auth, async (req, res) => {

    try {
        const { completed, limit, skip, sortBy } = req.query
        let tasks = []
        const sort = {}

        if (sortBy) {
            const parts = req.query.sortBy.split(":")
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1
        }

        const options = {
            limit: parseInt(limit),
            skip: parseInt(skip),
            sort
        }

        switch (completed) {
            case 'true':
                tasks = await Task.find({ owner: req.user._id, completed: true }, null, options)
                break
            case 'false':
                tasks = await Task.find({ owner: req.user._id, completed: false }, null, options)
                break
            default:
                tasks = await Task.find({ owner: req.user._id }, null, options)
        }

        if (tasks.length == 0) return res.status(404).send()



        res.send(tasks)

    } catch (error) {
        res.status(500).send(error)
    }

})

//get task by id
router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

//update task
router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) return res.status(400).send({ error: "invalid updates" })

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send()

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete task 
router.delete("/tasks/:id", auth, async (req, res) => {
    try {

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) return res.status(404).send()

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router