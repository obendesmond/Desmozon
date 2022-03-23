import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      const product = action.payload;

      state.items = [...state.items, product];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        basketItem => basketItem.id === action.payload.id
      );

      const newBasket = [...state.items];

      if (index >= 0) newBasket.splice(index, 1);

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = state => state.basket.items;
export const selectTotal = state =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
