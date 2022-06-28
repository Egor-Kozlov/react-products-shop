import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [],
  reducers: {
    addToBasket: (state, action) => {
      console.log("action: ", action);
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.count += 1;
      } else {
        state.push({
          id: action.payload.id,
          title: action.payload.title,
          brand: action.payload.brand,
          image: action.payload.image,
          prices: action.payload.prices,
          attributes: action.payload.attributes,
          selectedAttributes: action.payload.selectedAttributes,
          count: 1,
        });
      }
      // add to local storage
      localStorage.setItem("basket", JSON.stringify(state));
    },
    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item && item.count > 1) {
        item.count -= 1;
      } else if (item && item.count === 1) {
        state.splice(
          state.findIndex((item) => item.id === id),
          1
        );
      }
      // remove from local storage
      localStorage.setItem("basket", JSON.stringify(state));
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
