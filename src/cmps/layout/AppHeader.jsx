import userAvatar from '../../assets/imgs/doge.png';
import DarkModeBtn from '../DarkModeBtn.jsx';
import WeatherSearch from '../WeatherSearch.jsx';
import ColorPalette from './../ColorPalette.jsx';
import ToggleTempBtn from './../ToggleTempBtn.jsx';
import {useLocation } from 'react-router';
export default function AppHeader({toggle,theme}) {
  const location = useLocation();
  return (
    <section className="app-header-container" style={{backgroundColor: theme }}>
      <section className="header-left">
        <div className="avatar-container">
          <img className="user-img" src={userAvatar} />
        </div>
        <span className="btn-modal" onClick={toggle}>
          <i className="fas fa-info-circle" />
        </span>
      </section>
      {location.pathname  !== '/favorites' ? <WeatherSearch /> : <div></div>}
      <section className="header-right">
        <ToggleTempBtn />
        <DarkModeBtn />
        <div className="change-theme-btn">
          <i className="fas fa-palette" />
          <ColorPalette />
        </div>
      </section>
    </section>
  );
}
