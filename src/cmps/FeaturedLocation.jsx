
import { useSelector } from 'react-redux';

export default function FeaturedLocation({location,addToFavorites}) {
  const {isToggled} = useSelector(state => state.prefReducer);
  const dayTime = location.isDayTime ? 'Day' : 'Night';
  const locationIcon = location.weatherIcon < 10
    ? `0${location.weatherIcon}`
    : location.weatherIcon;

    const convertFarhernheitToCelcius = temp => {
      return Math.round(((temp - 32 ) * (5 / 9)).toFixed(0));  
  }
  const cTemp = isToggled ? convertFarhernheitToCelcius(location.temperature.Imperial.Value) : location.temperature.Imperial.Value;
  const tempUnit = isToggled ? <>&#8451;</> : <>&#8457;</>;
  return (
    <>
        <div className="location-title flex flex-start">
          <h2>Weather Results For {location.locationName}</h2>
        </div>
    <section className="location-container">
      <section className="location-header flex align-center">
        <img
        className="location-img"
          src={`https://developer.accuweather.com/sites/default/files/${locationIcon}-s.png`}
          alt={`${location.weatherIcon}-icon`}
        />
        <h3 className="temperature">{cTemp}{tempUnit} at {location.locationName}</h3>
        <span onClick={() => addToFavorites(location)} className="btn-heart"><i className="fas fa-heart"></i></span>
      </section>
      <section className="general-info flex column">
        <span>Humidity: {location.humidity}%</span>
        <span>Visibility: {location.visibility.Metric.Value}%</span>
        <span>Cloud Cover: {location.cloudCover}%</span>
        <span>Status: {location.weatherText}</span>
        <span>Night/Day: {dayTime}</span>
      </section>
    </section>
    </>
  );
}
