/***            Global Variables         ***/
const apiUrl = 'api.openweathermap.org/data/2.5/weather?id=';
const apiKey = '&appid=53058c171c2fa87400423531cdf9bf51'; // Personal API Key for OpenWeatherMap API

/***        Fill textboxes with autocomplete list       ***/
const fillCountryList = async (url = '') => {
    const cityList = await fetch(url);
    try{
        console.log(cityList);
    }
    catch(error){
        console.log("error", error);
    }
}

fillCountryList('/list');

/***          Event listener to add function to existing HTML DOM element           ***/
document.getElementById('add').addEventListener('click', addNewEntry);


/* Function called by event listener */
function addNewEntry(event) {
    console.log("clicked");
}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */