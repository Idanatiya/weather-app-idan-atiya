import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {setToast} from '../store/actions/toastAction';
import { setAppMode } from './../store/actions/prefAction';


export default function DarkModeBtn () {
  const dispatch = useDispatch();
  const [mode, setMode] = useState (localStorage.getItem ('mode') || 'dark');
  const switchTheme = () => {

    if(mode === 'dark')  {
      setMode('light')
      dispatch(setAppMode('light'))
    }
    else  {
      setMode('dark')
      dispatch(setAppMode('dark'))
    }
    dispatch(setToast({
      msg: `${mode === 'light' ? 'Dark Mode' : 'Light Mode '} is enabled`,
      type: 'success',
    }))
  

  }

  return (
    <div className="flex column align-center">
      <span className="toggle-btn" onClick={switchTheme}>
        <span style={{color: mode === 'dark' ? 'yellow' : "white"}}><i className="far fa-lightbulb"></i></span>
      </span>
    </div>
  );
}
