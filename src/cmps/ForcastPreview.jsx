
import { useSelector } from 'react-redux';

export default function ForcastPreview({dailyForecast}) {
  const {isToggled} = useSelector(state => state.prefReducer);
    const convertFarhernheitToCelcius = (minTemp,maxTemp) => {
        const cMinTemp =  Math.round(((minTemp - 32 ) * (5 / 9)).toFixed(0));
        const cMaxTemp = Math.round(((maxTemp - 32 ) * (5 / 9)).toFixed(0));
        return {
          cMinTemp,
          cMaxTemp
        }
        
    }

  const {Icon : icon,IconPhrase: iconPhrase} = dailyForecast.Day
  const locationIcon = icon < 10 ? `0${icon}` : icon
  const date = dailyForecast.Date.substring (0, 10);
  const {Value : cMinTemp} = dailyForecast.Temperature.Minimum
  const {Value : cMaxTemp} = dailyForecast.Temperature.Maximum
  const celiusTemps = isToggled ? convertFarhernheitToCelcius(cMinTemp,cMaxTemp) : {cMinTemp,cMaxTemp};
  const tempUnit = isToggled ? <>&#8451;</> : <>&#8457;</>

  return (
    <div className="forecast-preview flex align-center space-between">
      <img
        src={`https://developer.accuweather.com/sites/default/files/${locationIcon}-s.png`}
        alt={iconPhrase}
      />
      <div className="forecast-info flex column align-center">
      <span>{date}</span>
      <span>{iconPhrase}</span>
      <span className="temperatures">{celiusTemps.cMinTemp}{tempUnit}/{celiusTemps.cMaxTemp}{tempUnit}</span>
      </div>

    </div>
  );
}
