import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setToast} from './../store/actions/toastAction';
import {loadAutoOptions,loadCurrForecast,loadCurrLocation} from '../store/actions/weatherAction.js';

export default function WeatherSearch() {
  const inputRef = useRef ();
  const wrapperRef = useRef()
  const dispatch = useDispatch ();
  const options = useSelector(state => state.weatherReducer.options);
  var timeoutId;
  const [isVisible, setIsVisible] = useState (false);

  useEffect (() => {
    inputRef.current.focus ();
  }, []);

  useEffect(() => {
     document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[isVisible])


  useEffect(() => {
    if(options.length === 0) {
      console.log('no options, setting visible to fale');
      setIsVisible(false);
    }
  },[options])


  const handleClickOutside = e => {
    const {current: inputWrapper} = wrapperRef;
    if(!isVisible) return;
    if(inputWrapper && !inputWrapper.contains(e.target)) {
      setIsVisible(false)
    }
  }

  const handleChange = e => {
    console.log(e);
    const inputVal = inputRef.current.value.trim()
    const isValid = /^(?:[A-Za-z]+|\d+)$/.test (inputVal);
    if (!isValid && inputVal !== '') {
      dispatch ( setToast ({msg: 'Only English letters allowed!', type: 'error'}));
      return;
    }
    if (timeoutId)  clearTimeout (timeoutId);
    timeoutId = setTimeout (() => {
        setIsVisible(true)
        dispatch(loadAutoOptions(inputVal))
    }, 1500);
  };



  const handleSelectOption = selectedOption => {
    inputRef.current.value = selectedOption.LocalizedName;
    setIsVisible (false);
     dispatch(loadCurrLocation(selectedOption));
     dispatch(loadCurrForecast(selectedOption));
  };


  return (
    <>
    <section ref={wrapperRef} className="header-search">
      <span className="search-icon"><i className="fas fa-search" /></span>
      <input
        type="text"
        placeholder="Search Location..."
        ref={inputRef}
        onChange={handleChange}
        autoComplete="off"
      />
    {isVisible && <section className="auto-container">
    {options.length > 0 && options.map(option => {
      return (
        <section className="option" key={option.Key} onClick={() => handleSelectOption(option) }>
          <i className="fas fa-map-marker-alt"></i>
          <span className="location-name">{option.LocalizedName}</span>
        </section>
      )
    })}
    </section>}
    </section>

    </>
  );
}
