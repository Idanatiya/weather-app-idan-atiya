import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import useToggle from './custom-hooks/useToggle';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect,useState} from 'react'
import {
  setToast
 } from './store/actions/toastAction.js';
 import {logout} from './store/actions/userAction';
import AppHeader from './cmps/layout/AppHeader.jsx';
import Toast from './cmps/custom-cmps/Toast.jsx';
import WeatherApp from './views/WeatherApp.jsx';
import Favorites from './views/Favorites.jsx';
import Signup from './views/Signup.jsx'
import Modal from './cmps/custom-cmps/Modal.jsx';
import Sidebar from './cmps/layout/Sidebar.jsx';
import NoMatch from './views/NoMatch';



function App () {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toastReducer.toast);
  const {theme,mode} = useSelector(state => state.prefReducer);
  const {user} = useSelector(state => state.userReducer)
  // const {showModal,toggle} = useModal()
  // const [showMenu, setShowMenu] = useState(false)
  const [isToggledMenu, toggleMenu] = useToggle()
  const [isToggledModal, toggleModal] = useToggle()
  var timeoutId;
  useEffect (() => {
    timeoutId = setTimeout (() => {
        dispatch(setToast(null))
      },3000)
    return () => {
        clearTimeout(timeoutId)
    }
  },[toast]);


  const toggleMobileMenu = () => toggleMenu()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setToast({msg: 'You have been logged out', type: 'success'}))
  }

  return (
    <>
    {toast && <Toast toast={toast} />}
    <Modal showModal={isToggledModal} hide={toggleModal}></Modal>
    <Router>
      <div className={`app-container ${isToggledMenu ? 'show-menu' : ''}`}>
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
      {!user ? (
        <Redirect to="/signup" />
      ) : (
        <>
        <AppHeader toggleModal={toggleModal} theme={theme} user={user} handleLogout={handleLogout} toggleMobileMenu={toggleMobileMenu}/>
        <Sidebar theme={theme} user={user} />
        <main className={`app-content ${mode}`}>
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route exact path="/:locationKey/:locationName" component={WeatherApp} />
            <Route exact path="/" component={WeatherApp} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
        </>
      )}
      </div>
    </Router>
    </>
  );
}

export default App;
