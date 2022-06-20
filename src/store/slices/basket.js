import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
    total: 0,
  },
  reducers: {
    addToBasket: (state, action) => {
      const { id, name, price } = action.payload;
      const item = state.basket.find((item) => item.id === id);
      if (item) {
        item.count += 1;
      } else {
        state.basket.push({
          id,
          name,
          price,
          count: 1,
        });
      }
      state.total += price;
    },
  },
});

export const { addToBasket } = basketSlice.actions;
export default basketSlice.reducer;
