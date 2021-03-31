import axios from 'axios';
import {storageService} from './storage-service';
const API_KEY = '0NTNKr3nOntuWUfHInkH08Y0lfAVFL7c';
var gFavLocations = storageService.loadFromStorage('favoriteDB') || [];

export function addLocation (location) {
  console.log('location in service:',location);
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


async function getCities (searchTerm) {
  try {
    // const locations = JSON.parse (localStorage.getItem ('locations'));
    // if (locations) return locations;
    const res = await axios.get (
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`
    );
    console.log('res data', res.data);
    // localStorage.setItem ('locations', JSON.stringify (res.data));
    return res.data;
  } catch (err) {
      return err.message

  }
}

export async function getCurrentWeather (location) {
  const {Key : locationKey,LocalizedName:locationName} = location
  try {
    // const locationWeather =  JSON.parse(localStorage.getItem('locationWeather'))
    // if(locationWeather) return locationWeather
    const res = await axios.get (
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
    );

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
      locationName
    };
    return location;
  } catch (err) {
    return err.message
  }
}

export async function getForecast (location) {
  const {Key} = location;
  try {
    const res = await axios.get (
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${API_KEY}`
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
    return err.message;
  }
}

export async function getDefaultLocation(location) {
    const {latitude,longitude} = location;
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`);
        return res.data
    } catch (err) {
        return err.message;
    }
}

export const weatherService = {
  getCities: getCities,
  getCurrWeather: getCurrentWeather,
  getForecast,
  addLocation,
  deleteLocation,
  getDefaultLocation
};
