import { CHECKOUT_SET_ITEMS } from './actionConsts';

const reducer = (state = { items: [] }, { type, payload }) => {
  switch (type) {
    case CHECKOUT_SET_ITEMS:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};

export {
  reducer
}