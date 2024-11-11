
const cityInput = document.getElementById("city-name-input")
const getWeather = document.getElementById("get-weather")
const weatherDisplay = document.getElementById("weather-display")
const apiKey = "1edb918fe303d0da5513cd2f25d76884"

getWeather.addEventListener("click", () => {
   const city = cityInput.value;
   if(city){
      fetchWeatherData(city);
   }else{
      alert("Please Input A Valid City Name Here")
   }
})

function fetchWeatherData(city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

   fetch(apiUrl)
   .then(response => response.json ())
   .then(data => {
      if(data.cod === 200){
         displayWeather(data)
      }else{
         weatherDisplay.innerHTML = "<p>City Not Found</p>"
      }
   })
   .catch(error => {
      console.error("Error Fetching Data", error)
      weatherDisplay.innerHTML = "<p>Error Fetching Weather Data. Please Try Again</p>"
   })
}

   function displayWeather(data){
      const { name, timezone, main: { temp, pressure }, weather:[{description}], sys: {country, sunrise, sunset} } = data;
      weatherDisplay.innerHTML = `
         <p>city: ${name}</p>
         <p>timezone: ${timezone}</p>
         <p>temperature: ${temp}</p>
         <p>condition: ${description}</p>
         <p>pressure: ${pressure}</p>
         <p>country: ${country}</p>
         <p>sunrise: ${sunrise}</p>
         <p>sunset: ${sunset}</p>
      `
   }


