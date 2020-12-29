const checkoutReducer = (state = { items: [] }, { type, payload }) => {
  switch (type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};

const rootReducer = {
  checkout: checkoutReducer
};

export default rootReducer;