import {BrowserRouter as Router, Route, Switch,Redirect, useHistory} from 'react-router-dom';
import useModal from './custom-hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react'
import {
  setToast
 } from './store/actions/toastAction.js';
 import {logout} from './store/actions/userAction';
import AppHeader from './cmps/layout/AppHeader.jsx';
import Toast from './cmps/Toast.jsx';
import WeatherApp from './views/WeatherApp.jsx';
import Favorites from './views/Favorites.jsx';
import Signup from './views/Signup.jsx'
import Modal from './cmps/Modal.jsx';
import Sidebar from './cmps/layout/Sidebar.jsx';
import NoMatch from './views/NoMatch';
import { render } from '@testing-library/react';



function App () {
  const dispatch = useDispatch();
  const history =  useHistory()
  const toast = useSelector(state => state.toastReducer.toast);
  const {theme,mode} = useSelector(state => state.prefReducer);
  const {user} = useSelector(state => state.userReducer)
  const {showModal,toggle} = useModal()
  var timeoutId;
  useEffect (() => {
    timeoutId = setTimeout (() => {
        dispatch(setToast(null))
      },3000)
    return () => {
      console.log('timeout:',timeoutId);
        clearTimeout(timeoutId)
    }
  },[toast]);


  const handleLogout = () => {
    dispatch(logout())
    dispatch(setToast({msg: 'You have been logged out', type: 'success'}))
  }

  //ask about it
  // function PrivateRoute({children,...rest}) {
  //   return (
  //     <Route {...rest} render={() => {
  //       return user ? children : <Redirect to="/signup" />
  //     }} />
  //   )
  // }

  return (
    <>
    {toast && <Toast toast={toast} />}
    <Modal showModal={showModal} hide={toggle}></Modal>
    <Router>
      <div className="app-container">
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
      {!user ? (
        <Redirect to="/signup" />
      ) : (
        <>
        <AppHeader toggle={toggle} theme={theme} user={user} handleLogout={handleLogout}/>
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
