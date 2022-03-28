import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";

// const reducer = combineReducers({
//   todos,
// });

const composedEnhancers = composeWithDevTools();

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
  composedEnhancers,
});

export default store;
