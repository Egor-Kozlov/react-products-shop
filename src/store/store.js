import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketSlice from "./slices/basket";
import currencySlice from "./slices/currency";
import currentCategorySlice from "./slices/currentCategory";

const rootReducer = combineReducers({
  basketReducer: basketSlice,
  currencyReducer: currencySlice,
  categoryReducer: currentCategorySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
