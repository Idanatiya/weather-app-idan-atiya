

const INITIAL_STATE = {
  options: [],
  currLocation: null,
  forecast: null,
  favorites: localStorage.favoriteDB ? JSON.parse(localStorage.favoriteDB) : [],
  loading: true

};

export function weatherReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AUTOCOMPLETE_OPTIONS':
      return {
        ...state,
        options: action.options
      };
    case 'SET_CURR_LOCATION':
      return {
        ...state,
        currLocation: action.location
      }
    case 'SET_CURR_FORECAST':
      return {
        ...state,
        forecast: action.forecast,
        loading: false
      }
    case 'ADD_LOCATION_TO_FAV':
      return {
        ...state,
        favorites: [...state.favorites,action.favLocation]
      }
    case 'DELETE_LOCATION_FROM_FAV':
      return {
        ...state,
        favorites: state.favorites.filter(favLocation => favLocation.id !== action.locationId)
      }
    default:
      return state;
  }
}
