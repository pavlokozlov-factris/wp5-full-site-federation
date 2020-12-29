import { SEARCH_ACTION } from './actionConsts';

const reducer = (state = { searchData: '' }, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_ACTION: {
      newState = {
        ...newState,
        searchData: action.payload
      }
      break;
    }
    default:;
  }
  return newState;
}

export { reducer };