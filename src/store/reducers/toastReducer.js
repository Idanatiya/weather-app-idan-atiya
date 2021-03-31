const INITIAL_STATE = {
  toast: {
    msg: '',
    type: '',
  },
};

export function toastReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TOAST':
      return {
        ...state,
        toast: action.toast,
      };
    default:
      return state;
  }
}
