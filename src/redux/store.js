import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import authSlice from "./authSlice";
import uploadSlice from "./uploadSlice";
import messageSlice from "./messageSlice";
import conversationSlice from "./conversationSlice";

const composedEnhancers = composeWithDevTools();

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
  upload: uploadSlice,
  message: messageSlice,
  conversation: conversationSlice,
});

const store = configureStore({
  reducer: rootReducer,
  composedEnhancers,
});

export default store;
