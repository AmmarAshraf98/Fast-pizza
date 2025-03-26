import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
    // {
    //   pizzaId: 6,
    //   name: "Vegetale",
    //   quantity: 1,
    //   unitPrice: 13,
    //   totalPrice: 13,
    // },
  ],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cartItems.push(action.payload);
    },

    deleteItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.pizzaId !== action.payload
      );
    },

    increaseITemQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload
      );

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseITemQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload
      );
      //doesn't work
      // if (item.quantity < 1) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        // didn't work for some reasons
        // cartSlice.caseReducers.deleteItem(state, action);

        state.cartItems = state.cartItems.filter(
          (item) => item.pizzaId !== action.payload
        );
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartSlice = slice.reducer;

export const {
  addItem,
  deleteItem,
  increaseITemQuantity,
  decreaseITemQuantity,
  clearCart,
} = slice.actions;

export const getCart = (state) => state.cart.cartItems;

export const getPizzaQuantity = (state) =>
  state.cart.cartItems.reduce((sum, pizza) => (sum += pizza.quantity), 0);

export const getTotalPrice = (state) => {
  return state.cart.cartItems.reduce((sum, pizza) => {
    return (sum += pizza.totalPrice);
  }, 0);
};

export const getPizzaQuantityById = (id) => (state) =>
  state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export const getItemById = (id) => (state) =>
//   state.cart.cartItems.find((item) => item.pizzaId === id);
