import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import authSlice from "./authSlice";

const composedEnhancers = composeWithDevTools();

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
});

export default rootReducer;
