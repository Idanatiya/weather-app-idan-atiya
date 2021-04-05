import {weatherService} from '../../services/weather.service';
import {setToast} from './toastAction';

export function loadAutoOptions (searchTerm) {
  return async dispatch => {
    try {
      const options = await weatherService.getCities (searchTerm);
      dispatch ({type: 'SET_AUTOCOMPLETE_OPTIONS', options});
    } catch (err) {
        console.log ('in weather action:', err.message);
        dispatch ({type: 'SET_AUTOCOMPLETE_OPTIONS', options: []});
        dispatch (setToast ({msg: err.message, type: 'error'}));
    }
  };
}
export function loadCurrLocation (currLocation) {
  return async dispatch => { 
      try {
          const location = await weatherService.getCurrWeather (currLocation);
          dispatch ({type: 'SET_CURR_LOCATION', location});
      } catch (err) {
        console.log('caught in lodadcurrloc');
        dispatch (setToast ({msg: err.message, type: 'error'}));
      }
  };
}

export function loadCurrForecast (currLocation) {
  return async dispatch => {
      try {
          const forecast = await weatherService.getForecast (currLocation);
          dispatch ({type: 'SET_CURR_FORECAST', forecast});
      } catch (err) {
        dispatch (setToast ({msg: err.message, type: 'error'}));
      }
  };
}

export function loadDefaultLocation (userLocation) {
  return async dispatch => {
      try {
          const defaultLocation = await weatherService.getDefaultLocation (
            userLocation
          );
          const location = await weatherService.getCurrWeather (defaultLocation);
          const forecast = await weatherService.getForecast (defaultLocation);
          dispatch ({type: 'SET_CURR_LOCATION', location});
          dispatch ({type: 'SET_CURR_FORECAST', forecast});
      } catch (err) {
        dispatch (setToast ({msg: err.message, type: 'error'}));
      }
  };
}

export function addLocationToFav (location) {
    const favLocation = weatherService.addLocation (location);
    return {
        type: 'ADD_LOCATION_TO_FAV',
        favLocation
    }
}

export function deleteFavLocation (locationId) {
    weatherService.deleteLocation (locationId);
    return {
        type: 'DELETE_LOCATION_FROM_FAV', 
        locationId
    }
}
