/***            Global Variables         ***/
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?id=';
const apiKey = '&appid=53058c171c2fa87400423531cdf9bf51'; // Personal API Key for OpenWeatherMap API
let cityList = {};

/***        Fill textboxes with autocomplete list       ***/
const getCityList = async () => {
    const request = await fetch('/list');
    try{
        cityList = await request.json();
        console.log(cityList);
        return cityList;
    }
    catch(error){
        console.log("error", error);
    }
}; 

const arrangeAutocomplete = (() =>{
    getCityList()
    .then(function(cityList) {
        fillCountryAutocomplete(cityList);
    });

})() //IIFE (Immediately Invoked Function Expression)



const fillCountryAutocomplete = (list) => {
    let countryList = document.getElementById('countryList');
    let div = document.createElement('div');
    let countryArray = [];
    for(let i = 0; i < cityList.length; i++){
        if(!countryArray.includes(cityList[i].country)){
            countryArray.push(cityList[i].country);
            let option = document.createElement('option');
            option.value = cityList[i].country;
            div.appendChild(option);
        }
    }

    countryList.appendChild(div);
}


/***          Event listener to add function to existing HTML DOM element           ***/
document.getElementById('add').addEventListener('click', addNewEntry);


/* Function called by event listener */
function addNewEntry(event) {
    let userFeel = document.getElementById('feelings').value; // Get user input

    getCityData(apiUrl, '361059', apiKey) // send GET request to weather API to get city data

    .then(function(cityData){
        const newEntry = { // Arrange an object to hold all data user inputed
            'temperature' : cityData.main.temp,
            'date' : getDate(),
            'userFeel' : userFeel
        };

        postData('/add', newEntry); // Send all data to the server

        updateUI();
    })

}


// Create a new date instance dynamically with JS
function getDate() {
    let date = new Date();
    return newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
}


/* fell country code autocomplete list */


/*   function to get city ID  */
const getCityID = (countryCode, cityName) =>{

}


/* Function to GET Web API Data*/
const getCityData = async (baseURL, userCityId, apiKey) => {
    const request = await fetch(baseURL + userCityId + apiKey);

    try{
        const cityData = await request.json();
        return cityData;
    }
    catch(error){
        console.log("error", error);
    }
}


/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  
  });
}


/* Update UI*/
const updateUI = async () => {
    const request = await fetch('/all');

    try{
        const projectData = await request.json();
        
        document.getElementById('temp').innerHTML = (projectData[projectData.length - 1].temperature - 273.15).toFixed(2) + '`C';
        document.getElementById('date').innerHTML = projectData[projectData.length - 1].date;
        document.getElementById('content').innerHTML = projectData[projectData.length - 1].userFeel;
    }
    catch(error){
        console.log("error", error);
    }
}