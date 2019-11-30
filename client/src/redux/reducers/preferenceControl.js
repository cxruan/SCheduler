const initialState = {
  early: {
    time: 480,
    weight: 50
  },
  late: {
    time: 480,
    weight: 50
  },
  breaks: {
    time: 10,
    weight: 50
  },
  reserved: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_TIME': {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          time: action.time
        }
      };
    }
    case 'SET_WEIGHT': {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          weight: action.weight
        }
      };
    }
    case 'ADD_NEW_RESERVED': {
      return {
        ...state,
        reserved: [...state.reserved, action.newReserved]
      };
    }
    case 'CLEAR_RESERVED': {
      return {
        ...state,
        reserved: []
      };
    }
    default:
      return state;
  }
}
