import {NavLink} from 'react-router-dom';

export default function Sidebar ({theme}) {
  return (
    <section className="sidebar-container" style={{backgroundColor: theme}}>
      <section className="sidebar-info">
        <h2>Main Dashboard</h2>
        <h3>
          <div className="active-icon"></div>
          <span>Mr.Doge</span>

        </h3>
      </section>
      <div className="sidebar-links">
        <NavLink exact className="sidebar-link" to="/">
        <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="sidebar-link" to="/favorites">
          <i className="far fa-star" />
          <span>Favorites</span>
        </NavLink>
        <div className="sidebar-link">Link 2</div>
        <div className="sidebar-link">Link 3</div>
        <div className="sidebar-link">Link 4</div>
      </div>
    </section>
  );
}
