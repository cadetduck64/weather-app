// quote api 
//https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373

//svg resource
//https://www.svgrepo.com/svg/532039/cloud-rainbow

const DOMBody = document.querySelector('body')

const weatherArray = ['rain', 'sunny', 'cloudy', 'clear']
const quoteArray = [
  {quote:'Believe you can and youre halfway there.' , author:'Theodore Roosevelt'},
  {quote: 'Never allow a person to tell you no who doesn’t have the power to say yes', author: 'Eleanor Roosevelt'},
  {quote: 'Keep your face always toward the sunshine - and shadows will fall behind you.', author: 'Walt Whitman'},
  {quote: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde'},
  {quote: 'I can accept failure, everyone fails at something. But I can’t accept not trying.' , author: 'Michael Jordan'},
  {quote: 'The only person you are destined to become is the person you decide to be.' , author: 'Ralph Waldo Emerson'},
  {quote: 'If you change the way you look at things, the things you look at change.' , author: 'Wayne Dyer'},
  {quote: 'Once you face your fear, nothing is ever as hard as you think.', author: 'Olivia Newton-John'} ,
  {quote: 'You will face many defeats in life, but never let yourself be defeated.', author: 'Maya Angelou'},
  {quote: 'Before anything else, preparation is the key to success.', author: 'Alexander Graham Bell '},
]

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

    // fetch("https://type.fit/api/quotes")
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(data) {
    //   console.log(data);
    //   const quoteData = data
    //   quote.textContent = quoteData[RNG].text + "\n" + quoteData[RNG].author
    //   return
    // });
    
    const RNG = Math.floor(Math.random() * quoteArray.length)
    quote.textContent = quoteArray[RNG].quote + "\n" + '-' + quoteArray[RNG].author
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
    
    greeting.src = `./icons/${WeatherVariable()}.png`
    DOMBody.style.backgroundImage=`url(./background-images/${WeatherVariable()}.jpg)`
    return weatherDataObject
}

getWeatherButton.addEventListener('click', () => {getWeatherData()})
