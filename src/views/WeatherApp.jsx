/*IF THE APP HAS CORS ISSUES PLEASE MAKE ANOTHER API KEY AT: 
https://developer.accuweather.com/
****/

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {setToast} from './../store/actions/toastAction';
import { loadDefaultLocation, addLocationToFav,loadCurrLocation,loadCurrForecast } from '../store/actions/weatherAction.js';
import useGeoLocation from '../custom-hooks/useGeoLocation.js';
import FeaturedLocation from '../cmps/FeaturedLocation.jsx';
import ForecastList from '../cmps/ForecastList.jsx';
import Loader from '../cmps/Loader.jsx';

export default function WeatherApp () {
  const dispatch = useDispatch ();
  const {currLocation, forecast, favorites,loading} = useSelector (state => state.weatherReducer)
  const {locationKey, locationName} = useParams ();
  const {location, isLoading} = useGeoLocation ();
  
  //deal with geolocation if user not accpet load telaviv
  useEffect(() => {
    if(location && !isLoading && !locationKey && !locationName) dispatch(loadDefaultLocation(location))
  },[location,isLoading]);
  
    useEffect (
      () => {
        const location = {
          Key: locationKey,
          LocalizedName: locationName,
        };
        if(!locationKey || !locationName) return;
        dispatch (loadCurrLocation (location));
        dispatch (loadCurrForecast (location));
      },
      [locationKey, locationName,loading]
    );

  const checkIfExists = location => {
    return favorites.find(loc => loc.id === location.locationKey)
  }

  const addToFavorites = location => {
    const {locationName} = location
    const isLocationInDB = checkIfExists(location);;
    if(isLocationInDB) {
      dispatch(setToast({msg: `${locationName} is already in favorites`, type: 'error'}))
      return;
    }
    dispatch(addLocationToFav(currLocation))
    dispatch(setToast({msg: `${locationName} has been added to favorites`, type: 'success'}))
  }
  
  return (
    <section className="dashboard-container">
      {loading && <Loader />}
      {currLocation && forecast && (
      <>
        <FeaturedLocation location={currLocation} addToFavorites={addToFavorites} />
        <ForecastList  forecast={forecast} />
      </> )}

    </section>
  );
}


