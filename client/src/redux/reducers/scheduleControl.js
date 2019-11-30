const initialState = {
  schedules: [
    {
      id: 1,
      sections: [
        {
          name: 'CSCI201',
          ID: '29959R',
          type: 'Lecture',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 600,
            end: 650
          },
          days: [1, 3],
          include: true,
          penalize: true
        },
        {
          name: 'CSCI201',
          ID: '29960R',
          type: 'Lab',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 720,
            end: 830
          },
          days: [2, 4],
          include: true,
          penalize: true
        },
        {
          name: 'CSCI201',
          ID: '29929R',
          type: 'Quiz',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 720,
            end: 830
          },
          days: [5],
          include: true,
          penalize: true
        }
      ],
      score: {
        total: 470.5,
        early: 150.78,
        late: 139.08,
        interval: 111.7,
        breaks: 0
      }
    },
    {
      id: 2,
      sections: [
        {
          name: 'CSCI201',
          ID: '29959R',
          type: 'Lecture',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 600,
            end: 710
          },
          days: [1, 3],
          include: true,
          penalize: true
        },
        {
          name: 'CSCI201',
          ID: '29960R',
          type: 'Lab',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 720,
            end: 830
          },
          days: [2, 4],
          include: true,
          penalize: true
        },
        {
          name: 'CSCI201',
          ID: '29929R',
          type: 'Quiz',
          instructor: 'Olivera Grujic',
          location: 'GFS116',
          time: {
            start: 720,
            end: 830
          },
          days: [5],
          include: true,
          penalize: true
        }
      ],
      score: {
        total: 470.5,
        early: 150.78,
        late: 139.08,
        interval: 111.7,
        breaks: 0
      }
    }
  ],
  selectedScheduleID: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ID': {
      return {
        ...state,
        selectedScheduleID: action.selectedScheduleID
      };
    }
    default:
      return state;
  }
}
