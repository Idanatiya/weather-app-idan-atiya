

import {weatherService} from '../../services/weather.service'

export function loadAutoOptions(searchTerm) {
    return async dispatch => {
        const options = await weatherService.getCities(searchTerm);;
        dispatch({type: 'SET_AUTOCOMPLETE_OPTIONS', options})
    }
}
export function loadCurrLocation(currLocation) {
    return async dispatch => {
            const location = await weatherService.getCurrWeather(currLocation);
            dispatch({type: 'SET_CURR_LOCATION', location});
    }
}

export function loadCurrForecast(currLocation) {
    return async dispatch => {
        const forecast = await weatherService.getForecast(currLocation);
        console.log('getting forecast:',forecast);
        dispatch({type: 'SET_CURR_FORECAST', forecast});
    }
}

export function loadDefaultLocation(userLocation) {
    return async dispatch => {
        const defaultLocation = await weatherService.getDefaultLocation(userLocation);
        const location = await weatherService.getCurrWeather(defaultLocation);
        const forecast = await weatherService.getForecast(defaultLocation);
        dispatch({type: 'SET_CURR_LOCATION', location});
        dispatch({type: 'SET_CURR_FORECAST', forecast});
    }
}

export function addLocationToFav(location) {
    return dispatch => {
        const favLocation = weatherService.addLocation(location);
        dispatch({type: 'ADD_LOCATION_TO_FAV', favLocation});
    }
}


export function deleteFavLocation(locationId) {
    return dispatch => {
         weatherService.deleteLocation(locationId);
        dispatch({type: 'DELETE_LOCATION_FROM_FAV', locationId});
    }
}
