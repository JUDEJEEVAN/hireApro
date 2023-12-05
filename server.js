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

const player_routes = require('./routes/players.routes')
const skill_range_routes = require('./routes/skill_range.routes')
const official_routes = require('./routes/officials.routes')
const club_routes = require('./routes/clubs.routes')
const email_templates = require('./routes/mails.routes')
const otp_routes = require('./routes/otp.routes')

// routes
app.use('/api/players', player_routes)
app.use('/api/skill-ranges', skill_range_routes)
app.use('/api/officials', official_routes)
app.use('/api/clubs', club_routes)
app.use('/api/email-templates', email_templates)
app.use('/api/otp', otp_routes)

// this code listens in the port specified 
app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);

});