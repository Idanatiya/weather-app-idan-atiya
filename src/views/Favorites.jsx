import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import { setToast } from './../store/actions/toastAction';
import {deleteFavLocation} from './../store/actions/weatherAction';
import FavoritePreview from '../cmps/FavoritePreview';
import dogeIcon from '../assets/imgs/doge.png'

export default function Favorites () {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const favorites = useSelector (state => state.weatherReducer.favorites);


  const visitLocation = location => {
    const {name, id} = location;
    history.push (`/${id}/${name}`);
  };

  const removeLocation = location => {
    const {id,name} = location;
    dispatch (deleteFavLocation (id));
    dispatch(setToast({msg: `${name} has been deleted`, type: 'success'}))
  };

  return (
    <section className="favorites-container">
      <section className="favorites-header">
        <h2>Favorite Locations</h2>
      </section>
      <section className="favorite-loc-container">
        {favorites.length > 0 ?
          favorites.map (favorite => (
            <FavoritePreview
              key={favorite.id}
              location={favorite}
              visitLocation={visitLocation}
              removeLocation={removeLocation}
            />
          )) : <div className="placeholder">Not having any favorites <img className="doge-icon" src={dogeIcon} alt="" /></div>}
      </section>
    </section>
  );
}

