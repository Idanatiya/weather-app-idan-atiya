import { storageService } from '../../services/storage-service';


const INITIAL_STATE = {
  user:  storageService.loadFromStorage('loggedUser') || null,
  errMsg: null
};

export function userReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
      case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
      };
    case 'LOGIN_ERROR': 
      return {
        ...state,
        errMsg: action.msg
      }
    default:
      return state;
  }
}
