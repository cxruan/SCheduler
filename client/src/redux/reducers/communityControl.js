const initialState = {
  schedules: [],
  selectedScheduleID: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMMUNITY_SELECTED_ID': {
      return {
        ...state,
        selectedScheduleID: action.selectedScheduleID
      };
    }
    case 'GET_COMMUNITY_SCHEDULES': {
      return { ...state, schedules: action.schedules };
    }
    default:
      return state;
  }
}
