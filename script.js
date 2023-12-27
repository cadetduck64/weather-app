const getWeatherButton = document.querySelector('#getWeatherButton')


const getWeatherData = async () => {
    const weatherSearch = document.querySelector('#weatherSearch')
    const country = document.querySelector('#country')
    const region = document.querySelector('#region')
    const location = document.querySelector('#location')
    const condition = document.querySelector('#condition')

    const rawWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=cb8b7a44a6504d7cb11210749231612&q=${weatherSearch.value}`, {mode: 'cors'})
    const realWeatherData = await rawWeatherData.json()
    // console.log(realWeatherData)
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


    console.log(weatherDataObject.country)
    return weatherDataObject
}

getWeatherButton.addEventListener('click', () => {getWeatherData()})
