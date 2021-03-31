const INITIAL_STATE = {
  theme: localStorage.getItem ('theme') || '#2f3136',
  mode: localStorage.getItem('mode') || '#36393f',
  isToggled: localStorage.getItem('isToggled') || false
};

export function prefReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_APP_THEME':
      localStorage.setItem ('theme', action.theme);
      return {
        ...state,
        theme: action.theme,
      };
    case 'SET_APP_MODE_THEME':
        localStorage.setItem('mode',action.mode)
        console.log('changin mode...',action.mode);
        return {
            ...state,
            mode: action.mode
        }
    case 'SET_TEMP_TOGGLE':
      localStorage.setItem('isToggled',!state.isToggled);
      return {
        ...state,
        isToggled: !state.isToggled

      }
    default:
      return state;
  }
}
