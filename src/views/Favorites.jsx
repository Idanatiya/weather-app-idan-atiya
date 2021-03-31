import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import { setToast } from './../store/actions/toastAction';
import {deleteFavLocation} from './../store/actions/weatherAction';
import FavoritePreview from '../cmps/FavoritePreview';

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
      <div className="favorites-header">
        <h2>Favorite Locations</h2>
      </div>
      <section className="favorite-loc-container">
        {favorites.length > 0 ?
          favorites.map (favorite => (
            <FavoritePreview
              key={favorite.id}
              location={favorite}
              visitLocation={visitLocation}
              removeLocation={removeLocation}
            />
          )) : <div className="placeholder">No Favorites Yet...</div>}
      </section>
    </section>
  );
}

// return (
//   <div className="favorites-container flex column align-center">
//     {favorites.length > 0
//       ? <section className="favorite-list flex wrap justify-center">
//           {favorites.map ((favLocation, idx) => (
//             <FavoritePreview
//               key={idx}
//               favLocation={favLocation}
//               removeFavLocation={removeFavLocation}
//               goToLocation={goToLocation}
//             />
//           ))}
//         </section>
//       : <section>
//           <h1>🍕 No Favorites yet</h1>
//         </section>}

//   </div>
// );
// }
