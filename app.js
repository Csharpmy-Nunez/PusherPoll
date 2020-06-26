const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Bring the db config file
require('./config/db');


const app = express();

const poll = require('./routes/poll');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({extended: false}));

//enable CORS
app.use(cors());


app.use('/poll', poll);

//set port
const port = 3000;

//start the server
app.listen(port, () => console.log(`Server started on port --> ${port}`));