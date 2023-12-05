const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// this gets the configurations from .env
require('dotenv').config();

// this line is to create the express server
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// connect to the database
const uri = process.env.ATLAS_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
// connection.once = once the connection is open
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const category_routes = require('./routes/categories.routes')
const interaction_routes = require('./routes/interactions.routes')
const project_routes = require('./routes/projects.routes')
const user_routes = require('./routes/users.routes')
const worker_routes = require('./routes/workers.routes')

// routes
app.use('/api/categories', category_routes)
app.use('/api/interactions', interaction_routes)
app.use('/api/projects', project_routes)
app.use('/api/users', user_routes)
app.use('/api/workers', worker_routes)

// this code listens in the port specified 
app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);

});