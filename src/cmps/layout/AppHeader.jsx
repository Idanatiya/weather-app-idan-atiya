import {useLocation } from 'react-router';
import DarkModeBtn from '../DarkModeBtn.jsx';
import WeatherSearch from '../WeatherSearch.jsx';
import ColorPalette from './../ColorPalette.jsx';
import ToggleTempBtn from './../ToggleTempBtn.jsx';
import Avatar from '../Avatar.jsx';
export default function AppHeader({toggle,theme,handleLogout,user}) {
  const location = useLocation();
  return (
    <section className="app-header-container" style={{backgroundColor: theme }}>
      <section className="header-left">
        <Avatar username={user.username} userImg={user.userImg}/>
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
        <span onClick={handleLogout}><i className="fas fa-sign-out-alt"></i></span>
      </section>
    </section>
  );
}
