import { createSlice } from "@reduxjs/toolkit";

const currentCategorySlice = createSlice({
  name: "currency",
  initialState: {
    categoryName: "",
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      console.log("action: ", action);
      state.categoryName = action.payload;
    },
  },
});

export const { setCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;
