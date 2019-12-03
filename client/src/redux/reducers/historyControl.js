const initialState = {
  schedules: [],
  selectedScheduleID: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_HISTORY_SELECTED_ID': {
      return {
        ...state,
        selectedScheduleID: action.selectedScheduleID
      };
    }
    case 'GET_HISTORY_SCHEDULES': {
      return { ...state, schedules: action.schedules };
    }
    default:
      return state;
  }
}
