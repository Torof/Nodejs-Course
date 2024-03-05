const express = require('express')
const router = new express.Router
const Task = require("../models/task.model")

//create new task
router.post("/tasks", async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


//fetch all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (tasks.length == 0) return res.status(404).send()
        res.send(tasks)

    } catch (error) {
        res.status(500).send()
    }

})

//get task by id
router.get("/tasks/:id", async (req, res) => {
    const taskId = req.params.id

    try {
        const task = await Task.findById(taskId)
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

//update task
router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send({error: "invalid updates"})

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete task 
router.delete("/tasks/:id",async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) return res.status(404).send()

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router