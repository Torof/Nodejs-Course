const mongoose = require("mongoose")
const databaseName = 'task-manager-api'

mongoose.connect(process.env.MONGODB_URL + databaseName)
