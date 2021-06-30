/***            Global Variables         ***/
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?id=';
const apiKey = '&appid=53058c171c2fa87400423531cdf9bf51&units=metric'; // Personal API Key for OpenWeatherMap API
let countryList = document.getElementById('countryList');
let cityList = document.getElementById('cityList');
let citiesDataList = {};

/***                        Fill country code textbox with autocomplete list                    ***/

/**
 * @description Get Cities Data from server side
 * @returns CitiesDataList contain all countries code, cities name and ID 
 */
const getCitiesDataList = async () => {
    const request = await fetch('/list');
    try{
        citiesDataList = await request.json();
        return citiesDataList;
    }
    catch(error){
        console.log("error", error);
    }
}; 


/**
 * @description Arrange what to be perform to set Country autocomplete list
 */
const arrangeCountryAutocomplete = (() =>{
    getCitiesDataList()
    .then(function(citiesDataList) {
        fillCountryAutocomplete(citiesDataList);
    });
})() //IIFE (Immediately Invoked Function Expression)


/**
 * @description Fill Country autocomplete list with distinct country code
 * @param {*} list CitiesDataList contains all Cities Details
 */
const fillCountryAutocomplete = (list) => {
    let div = document.createElement('div');
    let countryArray = [];
    for(let i = 0; i < citiesDataList.length; i++){
        if(!countryArray.includes(citiesDataList[i].country)){ // Check if the country code is distinct
            countryArray.push(citiesDataList[i].country);

            let option = document.createElement('option');
            option.value = citiesDataList[i].country;
            div.appendChild(option);
        }
    }
    countryList.appendChild(div);
}

/******************************************************************************************/


/***          Event listener to add function to existing HTML DOM element           ***/
document.getElementById('city-name').addEventListener('focus', fillCityAutocomplete); // User focus on City Name textbox

document.getElementById('add').addEventListener('click', addNewEntry); // Click on the ADD Button



/**
 * @description Function called by event listener to Fill City Name autocomplete list according to chosen Country code
 * @param {*} event focus event details
 */
function fillCityAutocomplete(event){
    let countryCode = document.getElementById('country-code').value;
    let div = document.createElement('div');

    for(let i = 0; i < citiesDataList.length; i++){
        if(citiesDataList[i].country === countryCode){
            let option = document.createElement('option');
            option.value = citiesDataList[i].name;
            div.appendChild(option);
        }
    }

    cityList.removeChild(cityList.childNodes[0]); // Remove the last div 
    cityList.appendChild(div);
}



/**
 * @description Function called by event listener to Arrange what to be perform to post newEntry to server side
 * @param {*} event click event details
 */
function addNewEntry(event) {
    let userFeel = document.getElementById('feelings').value; // Get user input
    let cityID = getCityID();

    getCityData(apiUrl, cityID, apiKey) // send GET request to weather API to get city data

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



/**
 * @description Create a new date instance dynamically with JS
 * @returns current Date
 */
function getDate() {
    let date = new Date();
    date.m
    return newDate = (date.getMonth() + 1)+'.'+ date.getDate()+'.'+ date.getFullYear();
}



/**
 * @description Get CityID according to chosen Country code and City name
 * @returns Chosen cityID
 */
const getCityID = () =>{
    let countryCode = document.getElementById('country-code').value;
    let cityName = document.getElementById('city-name').value;

    for(let i = 0; i < citiesDataList.length; i++){
        if(citiesDataList[i].country === countryCode && citiesDataList[i].name === cityName){
            return citiesDataList[i].id;
        }
    }
}



/**
 * @description GET Data from Web API (OpenWeatherMap.com) 
 * @param {*} baseURL OpenWeatherMap API url
 * @param {*} userCityId chosen CityID want to get its data
 * @param {*} apiKey Our API KEY
 * @returns chosen City Data
 */
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



/**
 * @description Post Data to the server side
 * @param {*} url where we want to post
 * @param {*} data what we want to post
 */
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



/**
 * @description Update UI with the data GET from the server side
 */
const updateUI = async () => {
    const request = await fetch('/all');

    try{
        const projectData = await request.json();
        
        document.getElementById('temp').innerHTML = 'Temp: ' + projectData[projectData.length - 1].temperature.toFixed(2) + '`C';
        document.getElementById('date').innerHTML = 'Date: ' + projectData[projectData.length - 1].date;
        document.getElementById('content').innerHTML = projectData[projectData.length - 1].userFeel;
    }
    catch(error){
        console.log("error", error);
    }
}