/***            Setup empty JS object to act as endpoint for all routes             ***/
projectData = [];

/***            Require Express to run server and routes                ***/
const express = require('express');

/***            Start up an instance of app         ***/
const app = express();

/* Middleware*/
/***            Here we are configuring express to use body-parser as middle-ware               ***/
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.json());

/***            Cors for cross origin allowance             ***/
const cors = require('cors');
app.use(cors());

/***            Load cityList from json file            ***/
const citylist = require('./cityList.json');

/***            Initialize the main project folder              ***/
app.use(express.static('website'));


/***            Setup Server            ***/
const port = 3000;
const server = app.listen(port, () => {console.log(`Connect to localhost:${port}`);}); // Callback Function to make sure server is running 


// Callback function to complete GET '/all'
app.get('/all', retrieveData);

function retrieveData(req, res){
    res.send(projectData);
}


// Callback function to send citylist.json file
app.get('/list', sendCityList);

function sendCityList(req, res){
    res.send(citylist);
}


// Post Route
app.post('/add', addData);

function addData(req, res){
    const newEntry = {
        'temperature' : req.body.temperature,
        'date' : req.body.date,
        'userFeel' : req.body.userFeel
    };

    projectData.push(newEntry);
    console.log(projectData);
    res.send("POST recieved");
}