import {useLocation } from 'react-router';
import DarkModeBtn from '../custom-cmps/DarkModeBtn.jsx';
import WeatherSearch from '../WeatherSearch.jsx';
import ColorPalette from  '../custom-cmps/ColorPalette.jsx';
import ToggleTempBtn from '../custom-cmps/ToggleTempBtn.jsx';
import Avatar from '../custom-cmps/Avatar.jsx';
export default function AppHeader({toggle,theme,handleLogout,toggleMobileMenu,user}) {
  const location = useLocation();
  return (
    <section className="app-header-container" style={{backgroundColor: theme }}>
      <section className="header-left">
        <Avatar username={user.username} userImg={user.userImg}/>
        <span className="btn-modal" onClick={toggle}>
          <i className="fas fa-info-circle" />
        </span>
        <span className="btn-mobile-menu" onClick={toggleMobileMenu}><i className="fas fa-bars"></i></span>
      </section>
      {location.pathname  !== '/favorites' ? <WeatherSearch /> : <div></div>}
      <section className="header-right">
        <ToggleTempBtn />
        <DarkModeBtn />
        <div className="change-theme-btn">
          <i className="fas fa-palette" />
          <ColorPalette />
        </div>
        <span className="signout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i></span>
      </section>
    </section>
  );
}
