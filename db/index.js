// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const password = process.env.password;

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
//DO NOT TOUCH!!!!

const MONGO_URI =
  process.env.MONGODB_URI ||
  `mongodb://user:${password}@ac-du6qg39-shard-00-00.ztdoc7q.mongodb.net:27017,ac-du6qg39-shard-00-01.ztdoc7q.mongodb.net:27017,ac-du6qg39-shard-00-02.ztdoc7q.mongodb.net:27017/?ssl=true&replicaSet=atlas-7n326a-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
