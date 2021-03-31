import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import useModal from './custom-hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react'
import {
  setToast
 } from './store/actions/toastAction.js';
import AppHeader from './cmps/layout/AppHeader.jsx';
import Toast from './cmps/Toast.jsx';
import WeatherApp from './views/WeatherApp.jsx';
import Favorites from './views/Favorites.jsx';
import Modal from './cmps/Modal.jsx';
import Sidebar from './cmps/layout/Sidebar.jsx';



function App () {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toastReducer.toast);
  const {theme,mode} = useSelector(state => state.prefReducer);
  const {showModal,toggle} = useModal()
  useEffect (() => {
    if(toast.msg) {
      var timeoutId = setTimeout (() => {
        dispatch(setToast({msg: '', type: ''}))
      },3000)
    }
    return () => {
        clearTimeout(timeoutId)
    }
  },[toast.msg,toast.type]);

  return (
    <>
    {toast.msg && <Toast toast={toast} />}
    <Modal showModal={showModal} hide={toggle}>
    </Modal>
    <Router>
      <div className="app-container">
        <AppHeader toggle={toggle} theme={theme} />
        <Sidebar theme={theme} />
        <main className={`app-content ${mode}`}>
          <Switch>
            <Route  path="/favorites" component={Favorites} />
            <Route exact path="/:locationKey?/:locationName?" component={WeatherApp} />
          </Switch>
        </main>
      </div>
    </Router>
    </>
  );
}

export default App;
