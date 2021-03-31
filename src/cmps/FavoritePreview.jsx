import React from 'react';
import { useSelector } from 'react-redux';


export default function FavoritePreview({location, removeLocation,visitLocation}) {
  const {isToggled} = useSelector(state => state.prefReducer)
  const temperature = isToggled ? location.cTemp : location.fTemp
  const tempUnit = isToggled ? <>&#8451;</> : <>&#8457;</>
  return (
    <section className="favorite-preview">
      <h2>{location.name}</h2>
      <h3>{temperature}{tempUnit}</h3>
      <span onClick={() => removeLocation(location)} className="btn-remove"><i className="fas fa-heart-broken"></i></span>
      <button onClick={() => visitLocation(location)} className="btn-location">Visit {location.name}</button>
    </section>
  );
}

