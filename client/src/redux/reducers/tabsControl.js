const initialState = {
  tabId: 0,
  tabName: 'Course Bin',
  openDrawer: true
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
    default:
      return state;
  }
}
