/***            Setup empty JS object to act as endpoint for all routes             ***/
projectData = {};

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



// Initialize all route with a callback function
app.get('/all', retrieveData);
app.get('/list', sendCityList);

app.post('/add', addData);


// Callback function to complete GET '/all'
function retrieveData(req, res){
    res.send(data);
}


function sendCityList(req, res){
    res.send(citylist);
}


// Post Route
const data = [];

function addData(req, res){
    const newEntry = {
        'temperature' : req.body.temperature,
        'date' : req.body.date,
        'userFeel' : req.body.userFeel
    };

    data.push(newEntry);
    console.log(data);
    res.send("POST recieved");
}