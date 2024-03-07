const express = require('express')
const User = require("../models/user.model")
const auth = require('../middleware/auth.middleware')
const router = new express.Router()

//create new user
router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//sign in user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout user of current session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.status(200).send('logged out')
    } catch (error) {
        res.status(500).send(error)
    }
})

//logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send('logged out of all sessions')
    } catch (error) {
        res.status(500).send(error)
    }
})

//fetch my profile
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

//get user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }

})

//update user
router.patch('/users/update',auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "age", "password"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({error: 'invalid updates'})

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()     
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete a user
router.delete('/users/delete', auth, async (req, res) =>{
    try {
        await req.user.deleteOne()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router