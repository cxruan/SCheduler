const initialState = {
  schedules: [],
  selectedScheduleID: 1,
  openDialog: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ID': {
      return {
        ...state,
        selectedScheduleID: action.selectedScheduleID
      };
    }
    case 'GEN_SCHEDULES': {
      return { ...state, schedules: action.schedules };
    }
    case 'TOGGLE_SAVE_TO_HISTORY': {
      return {
        ...state,
        openDialog: action.openDialog
      };
    }
    default:
      return state;
  }
}
