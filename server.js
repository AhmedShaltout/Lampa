const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const user_api = require('./server/routes/user_api');
const task_api = require('./server/routes/task_api');
var session = require('express-session');
const port = 3000;

//prepare the server engine
const app = express();
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//initializing user's session
app.use(session(
  {
    secret: 'random_string_goes_here',
    resave: false,
    saveUninitialized: true,
    user: null
  }
));

// APIs
app.use('/user-api', user_api);
app.use('/task-api', task_api);

// the main index.html page
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

// mlab.com database
const db="mongodb://root:shaltout@ds147034.mlab.com:47034/shaltoutbase";
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    err ? console.log("error:", err) : console.log("connected");
});

//start the server
app.listen(port, ()=>{
    console.log('http://localhost:'+port);
});
