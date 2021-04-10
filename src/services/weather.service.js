import axios from 'axios';
import {storageService} from './storage-service';
let cancelToken;
const API_KEY = '3LxGFGyVNFTk82rsvzUSyWq2a5a7zibC';
var gFavLocations = storageService.loadFromStorage('favoriteDB') || [];

export function addLocation (location) {
    const favLocation = {
        id: location.locationKey,
        name: location.locationName,
        cTemp: location.temperature.Metric.Value,
        fTemp: location.temperature.Imperial.Value,
    };
    gFavLocations.push (favLocation);
    storageService.saveToStorage('favoriteDB', gFavLocations)
    return favLocation;
}

export async function deleteLocation(locationId) {
    const favLocationIdx = gFavLocations.findIndex(favLocation => favLocation.id === locationId);
    if(favLocationIdx === -1) return;
    gFavLocations.splice(favLocationIdx,1)
    storageService.saveToStorage('favoriteDB',gFavLocations);
}


const filteredOptions = options => {
  const mySet = new Set( options.map(option => option.LocalizedName));
  const noDuplicates = options.map(option => {
    if(mySet.has(option.LocalizedName)) {
      return option;
    }
  })
  console.log('set?:',mySet)
  console.log('deps',noDuplicates);
  // options.forEach(option => {
  //   if(!mySet.has(option.LocalizedName)) {
  //     mySet.add(option)
  //   }
  // })
  // console.log(mySet);
  // return [...mySet];
}


async function getCities (searchTerm) {
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  cancelToken = axios.CancelToken.source();

  try {
    const res = await axios.get (
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`, {
        cancelToken: cancelToken.token
      }
    );
    const options = res.data;
    if(options.length === 0){
      throw Error(`No options Available for ${searchTerm}`);
    } 
    console.log('filtered',filteredOptions(options));
    return options;
    
  } catch (err) {
     throw err
  }

  
}

export async function getCurrWeather (location) {
  console.log('location',location);
  const {Key : locationKey,LocalizedName:locationName} = location
  const {LocalizedName : adminstrativeName} = location.AdministrativeArea
  const {LocalizedName: countryName} = location.Country
  try {
    const res = await axios.get (
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
    );
    console.log(res.data);
    const {
      CloudCover : cloudCover,
      IsDayTime: isDayTime,
      WeatherIcon: weatherIcon,
      WeatherText: weatherText,
      Temperature: temperature,
      RelativeHumidity: humidity,
      Visibility: visibility,
      Wind: wind
    } = res.data[0];
    const location = {
      cloudCover,
      isDayTime,
      weatherText,
      weatherIcon,
      temperature,
      humidity,
      visibility,
      wind,
      locationKey,
      locationName,
      adminstrativeName,
      countryName
    };
    return location;
  } catch (err) {
    throw err
  }
}

export async function getForecast (location) {
  const {Key} = location;
  try {
    const res = await axios.get (
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${API_KEY}`
    );

    const {Headline,DailyForecasts: dailyForecasts} = res.data;
    const {Text: text,Severity: sevirity,EffectiveDate: effectiveDate} = Headline;
    return {
      text,
      sevirity,
      effectiveDate,
      dailyForecasts
    }
  } catch (err) {
    throw err;
  }
}

export async function getDefaultLocation(location) {
    const {latitude,longitude} = location;
    try {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`);
        return res.data
    } catch (err) {
        throw err
    }
}

export const weatherService = {
  getCities,
  getCurrWeather,
  getForecast,
  addLocation,
  deleteLocation,
  getDefaultLocation
};


