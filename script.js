// quote api 
//https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373

//svg resource
//https://www.svgrepo.com/svg/532039/cloud-rainbow

const DOMBody = document.querySelector('body')

const weatherArray = ['rain', 'sunny', 'cloudy', 'clear']
const weatherStatusRandom = weatherArray[Math.floor(Math.random() * weatherArray.length)]
DOMBody.style.backgroundImage=`url(./background-images/${weatherStatusRandom}.jpg)`
const greeting = document.querySelector('#greeting')
greeting.src = `./icons/${weatherStatusRandom}.png`

const getWeatherButton = document.querySelector('#getWeatherButton')
const getWeatherData = async () => {
    const weatherSearch = document.querySelector('#weatherSearch')
    const country = document.querySelector('#country')
    const region = document.querySelector('#region')
    const location = document.querySelector('#location')
    const condition = document.querySelector('#condition')
    const quote = document.querySelector('#quote')
    const greeting = document.querySelector('#greeting')

    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      const quoteData = data
      const RNG = Math.floor(Math.random() * 17)
      quote.textContent = quoteData[RNG].text + "\n" + quoteData[RNG].author
      return
    });
    
    const rawWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=cb8b7a44a6504d7cb11210749231612&q=${weatherSearch.value}`, {mode: 'cors'})
    const realWeatherData = await rawWeatherData.json()

    const weatherDataObject = {
        country: realWeatherData.location.country,
        region: realWeatherData.location.region,
        location: realWeatherData.location.name,
        condition: realWeatherData.current.condition.text
    }
    // try {
    //     weatherDataObject.country = 'United States'
    //     weatherDataObject.region = 'georgia'
    //     weatherDataObject.location = 'n/a'
    //     weatherDataObject.condition = 'throwing tf down'
    // } catch {
    //     weatherDataObject.country = 'error'
    //     weatherDataObject.region = 'error'
    //     weatherDataObject.location = 'error'
    //     weatherDataObject.condition = 'error'
    // }

    country.textContent = weatherDataObject.country
    region.textContent = weatherDataObject.region
    location.textContent = weatherDataObject.location
    condition.textContent = weatherDataObject.condition
    console.log(weatherDataObject.condition)
    // console.log((weatherDataObject.condition.toString().toLowerCase().includes('rain')))

    const WeatherVariable = () => {
      for (let index = 0; index < weatherArray.length; index++) {
        console.log(weatherDataObject.condition.toString().toLowerCase().includes(weatherArray[index]))
        if (weatherDataObject.condition.toString().toLowerCase().includes(weatherArray[index]) === true)
          {const WeatherVariableData = weatherArray[weatherArray.indexOf(weatherArray[index])]
            console.log(WeatherVariableData)
            return WeatherVariableData}
      }
      return 'cloudy'
    }

    console.log(WeatherVariable())
    
    greeting.src = `./icons/${WeatherVariable()}.png`
    DOMBody.style.backgroundImage=`url(./background-images/${WeatherVariable()}.jpg)`
    return weatherDataObject
}

getWeatherButton.addEventListener('click', () => {getWeatherData()})
