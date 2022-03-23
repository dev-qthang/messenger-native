import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./userSlice";

// const reducer = combineReducers({
//   todos,
// });

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
