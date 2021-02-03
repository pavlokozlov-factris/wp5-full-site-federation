import { SET_USERNAME_ACTION } from './actionConsts';

const reducer = (state = { username: '' }, action) => {
  let newState = state;
  switch (action.type) {
    case SET_USERNAME_ACTION: {
      newState = {
        ...newState,
        username: action.payload
      }
      break;
    }
    default:;
  }
  return newState;
}

export { reducer };