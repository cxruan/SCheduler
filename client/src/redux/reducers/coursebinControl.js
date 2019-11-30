const initialState = {
  data: [
    {
      id: 'CSCI-270',
      type: 'adult'
    },
    { id: 'CSCI-270-Lecture', parentId: 'CSCI-270' },
    { id: 'CSCI-270-Discussion', parentId: 'CSCI-270' },
    { id: 'CSCI-270-Quiz', parentId: 'CSCI-270' },
    {
      id: '29956D',
      class_type: 'Lecture',
      time: '4:30-5:50pm',
      days: 'Mon, Wed',
      instructor: 'Shahriar Shamsian',
      location: 'MHP101',
      type: 'child',
      parentId: 'CSCI-270-Lecture'
    },
    {
      id: '29957D',
      class_type: 'Lecture',
      time: '6:00-7:30pm',
      days: 'Mon, Wed',
      instructor: 'Shahriar Shamsian',
      location: 'MHP101',
      type: 'child',
      parentId: 'CSCI-270-Lecture'
    },
    {
      id: '29958D',
      class_type: 'Lecture',
      time: '3:30-5:00pm',
      days: 'Tue, Thu',
      instructor: 'Shahriar Shamsian',
      location: 'THH210',
      type: 'child',
      parentId: 'CSCI-270-Lecture'
    },
    {
      id: '30231D',
      class_type: 'Lecture',
      time: '2:00-3:20pm',
      days: 'Tue, Thu',
      instructor: 'Shahriar Shamsian',
      location: 'GFS101',
      type: 'child',
      parentId: 'CSCI-270-Lecture'
    },
    {
      id: '30267R',
      class_type: 'Discussion',
      time: '10:00-11:50am',
      days: 'Friday',
      instructor: '',
      location: 'SLH100',
      type: 'child',
      parentId: 'CSCI-270-Discussion'
    },
    {
      id: '30268R',
      class_type: 'Discussion',
      time: '12:00-1:50pm',
      days: 'Friday',
      instructor: '',
      location: 'ZHS159',
      type: 'child',
      parentId: 'CSCI-270-Discussion'
    },
    {
      id: '30269R',
      class_type: 'Discussion',
      time: '2:00-3:50pm',
      days: 'Friday',
      instructor: '',
      location: 'ZHS159',
      type: 'child',
      parentId: 'CSCI-270-Discussion'
    },
    {
      id: '30224R',
      class_type: 'Quiz',
      time: '7:00-8:50pm',
      days: 'Friday',
      instructor: '',
      location: 'TBA',
      type: 'child',
      parentId: 'CSCI-270-Quiz'
    }
  ]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COURSE': {
      return {
        ...state,
        data: [...state.data, ...action.newCourse]
      };
    }
    default:
      return state;
  }
}
