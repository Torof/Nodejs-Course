require('./db/mongoose')
const express = require("express")
const userRouter = require("./routers/user.router")
const taskRouter = require('./routers/tasks.router')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("server is up on port " + port)
})