console.log("poop");

const api = {
    key: "c63b9092f5df15b024e8d8f805ddd82c", 
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);


function setQuery(event)
{
    if(event.keyCode == 13)
    {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query)
{
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&appid=${api.key}`).then(weather => {return weather.json();}).then(displayResults);
}

function displayResults (weather)
{
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    
    let time = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(time);

    let temp = document.querySelector('.temperature .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°F`;

    let weatherXD = document.querySelector('.temperature .weather');
    setIcons(weather.weather[0].main);

    weatherXD.innerHTML = `${weather.weather[0].main}`;

    let hiLow = document.querySelector('.temperature .low-hi');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(time)
{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[time.getDay()];
    let date = time.getDate();
    let month = months[time.getMonth()];
    let year = time.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function setIcons(iconID){
    if(iconID == "Clear")
        document.getElementById('icon').className = "fas fa-cloud-sun";
    if(iconID == "Clouds")
        document.getElementById('icon').className = "fas fa-cloud";
    if(iconID == "Rain")
        document.getElementById('icon').className = "fas fa-cloud-showers-heavy";
    if(iconID == "Snow")
        document.getElementById('icon').className = "far fa-snowflake";


    
}
