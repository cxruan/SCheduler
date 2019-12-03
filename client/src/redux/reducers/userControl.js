const initialState = {
  status: false,
  username: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {
        status: true,
        username: action.username
      };
    }
    case 'USER_LOGOUT': {
      return {
        status: false,
        username: ''
      };
    }
    default:
      return state;
  }
}
