import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketSlice from "./slices/basket";
import currencySlice from "./slices/currency";

const rootReducer = combineReducers({
  basketReducer: basketSlice,
  currencyReducer: currencySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
