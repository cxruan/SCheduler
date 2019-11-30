const initialState = 
{
  data: [
    {
      id: 'CSCI-201',
      penalized: true,
      type: 'adult'
    },
    {
      id: '29959R',
      class_type: 'Lecture',
      time: '10:00-11:50am',
      days: 'Mon, Wed',
      instructor: 'Olivera Grujic',
      location: 'GFS116',
      penalized: true,
      type: 'child',
      parentId: 'CSCI-201'
    },
    {
      id: '29960R',
      class_type: 'Lecture',
      time: '2:00-3:50pm',
      days: 'Mon, Wed',
      instructor: 'Olivera Grujic',
      location: 'MHP101',
      penalized: true,
      type: 'child',
      parentId: 'CSCI-201'
    },
    {
      id: '29929R',
      class_type: 'Lab',
      time: '3:30-5:20pm',
      days: 'Tuesday',
      instructor: 'Olivera Grujic',
      location: 'SAL109',
      penalized: true,
      type: 'child',
      parentId: 'CSCI-201'
    }
  ]
}
;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
