import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from './../store/actions/toastAction';

const useGeoLocation = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState (null);
  const [isLoading, setIsLoading] = useState (true);

  useEffect (() => {
    navigator.geolocation.getCurrentPosition (handleSuccess, HandleError);
  }, []);

  const handleSuccess = position => {
    const {latitude, longitude} = position.coords;
    setLocation ({
      latitude,
      longitude,
    });
    setIsLoading (false);
  };

  const HandleError = error => {
    dispatch(setToast({msg: error.message, type: 'error'}))
    setLocation ({latitude: 32.0853, longitude: 34.7818});
    setIsLoading (false);
  };
  return {isLoading, location};
};

export default useGeoLocation;
