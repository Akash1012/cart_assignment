export const cartReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [{ ...action.payload }, ...state.cart],
      };

    case "SHOW_PRODUCT_DETAILS":
      return {
        ...state,
        details: action.payload,
      };

    case "CLEAR_PRODUCT_DETAILS":
      return {
        ...state,
        details: "",
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) => {
          return c.id === action.payload.id
            ? (c.qty = action.payload.qty)
            : c.qty;
        }),
      };
    default:
      break;
  }
};
