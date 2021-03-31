import ForecastPreview from './ForcastPreview';

export default function ForecastList({forecast} ) {
  return (
    <section className="forecast-container">
      {forecast && forecast.dailyForecasts.map((dailyForecast,idx) => <ForecastPreview key={idx} dailyForecast={dailyForecast} />)}
    </section>
  );
}

