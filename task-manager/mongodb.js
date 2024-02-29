//CRUD  (create read update delete)

const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const client = new MongoClient(connectionURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const run = async () => {

    try {
            // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(databaseName);
    const users = db.collection("users");
    const tasks = db.collection("tasks")

    const options = {
        // Include only the `name` and `age` fields in the returned document
        projection: {completed: 1 },
      };

   
    // const insertResultSingle = await users.insertOne({ name: "jack", age: 77 });

    // const insertResultMany = await users.insertMany([{name: "Bob", age: 41},{name: "Jeanne", age: 6}, {name: "Peter", age: 41}])users

    // const deleteUsers = await users.deleteMany()

    // const insertResultMany = await tasks.insertMany([
    //     {task: "learn node", completed: false}, 
    //     {task: "learn react", completed: false}, 
    //     {task: "driver license", completed: false}, 
    //     {task: "internet", completed: false},
    //     {task: "vats vaccine rdv", completed: false}
    // ])

    
    const getResultSingle = await tasks.findOne({task: "internet"}, options)
         console.log(getResultSingle)

      const getResultMany = await tasks.find({completed: false}).toArray()
      const getResultCount = await tasks.countDocuments({completed: true})

      console.log(getResultMany)
      console.log(getResultCount)
      
    //   for await (const doc of getResultMany) {
    //     console.dir(doc);
    //   }
         
    } finally {
        await client.close()
    }

  }
   
  run().catch(console.dir);