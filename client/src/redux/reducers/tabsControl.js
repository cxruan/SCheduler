const initialState = {
  tabId: 0,
  tabName: 'Course Bin',
  openDrawer: true,
  openLogin: false,
  openRegister: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_TAB': {
      return {
        ...state,
        tabId: action.tabId,
        tabName: action.tabName
      };
    }
    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        openDrawer: action.openDrawer
      };
    }
    case 'TOGGLE_LOGIN': {
      return {
        ...state,
        openLogin: action.openLogin
      };
    }
    case 'TOGGLE_REGISTER': {
      return {
        ...state,
        openRegister: action.openRegister
      };
    }
    default:
      return state;
  }
}
