import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
export default function Sidebar ({theme,user}) {
  const {favorites} = useSelector(state => state.weatherReducer)
  return (
    <section className="sidebar-container" style={{backgroundColor: theme}}>
      <section className="sidebar-info">
        <h2>Main Dashboard</h2>
        <h3>
          <div className="active-icon"></div>
          <span>{user.username}</span>
        </h3>
      </section>
      <div className="sidebar-links">
        <NavLink exact className="sidebar-link" to="/">
        <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="sidebar-link" to="/favorites">
          <i className="far fa-star" />
          <span>Favorites <span className="pill">{favorites.length === 0 ? 0 : favorites.length}</span></span>
        </NavLink>
      </div>
    </section>
  );
}
