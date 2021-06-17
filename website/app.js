/***            Global Variables         ***/
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?id=';
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

//fillCountryList('/list');

/***          Event listener to add function to existing HTML DOM element           ***/
document.getElementById('add').addEventListener('click', addNewEntry);


/* Function called by event listener */
function addNewEntry(event) {
    getCityData(apiUrl, '361059', apiKey)

    .then(function(cityData){
        //postData('/add', cityData);
    });

    
    console.log("clicked");
}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API Data*/
const getCityData = async (baseURL, userCityId, apiKey) => {
    const request = await fetch(baseURL + userCityId + apiKey);

    try{
        const cityData = await request.json();
        console.log(cityData);
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

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
        console.log("error", error);
    }
}

postData('/add', {animal: 'lion'});


/* Function to GET Project Data */
const getProjectData = async (url = '') => {
    const request = await fetch(url);

    try{
        const projectData = await request.json();
    }
    catch(error){
        console.log("error", error);
    }
}