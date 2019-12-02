const initialState = {
  schedules: [
    {
      id: 1,
      scheduleName: 'abc',
      inDatabase: false,
      sections: [
        {
          name: 'MATH-407',
          ID: '39981R',
          type: 'Lecture',
          instructor: 'Jason Fulman',
          location: 'THH114',
          time: {
            start: 780,
            end: 890
          },
          days: [1, 3, 5],
          include: true,
          penalize: true
        }
      ]
    },
    {
      id: 2,
      scheduleName: 'abcd',
      inDatabase: false,
      sections: [
        {
          name: 'MATH-407',
          ID: '39981R',
          type: 'Lecture',
          instructor: 'Jason Fulman',
          location: 'THH114',
          time: {
            start: 780,
            end: 830
          },
          days: [2, 4],
          include: true,
          penalize: true
        }
      ]
    }
  ],
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
