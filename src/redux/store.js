import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import authSlice from "./authSlice";
import storySlice from "./storySlice";

const composedEnhancers = composeWithDevTools();

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
  story: storySlice,
});

const store = configureStore({
  reducer: rootReducer,
  composedEnhancers,
});

export default store;
