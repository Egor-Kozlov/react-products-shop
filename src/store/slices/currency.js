import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    label: "USD",
    symbol: "$",
  },
  reducers: {
    setCurrency: (state, action) => {
      console.log("action: ", action);
      state.label = action.payload.label;
      state.symbol = action.payload.symbol;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
