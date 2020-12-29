import { HOME_ACTION } from './actionConsts';

const reducer = (state = { data: '' }, action) => {
  const newState = state;
  switch (action.type) {
    case HOME_ACTION: {
      newState = {
        ...newState,
        data: action.payload
      }
      break;
    }
    default:;
  }
  return newState;
}

export { reducer };