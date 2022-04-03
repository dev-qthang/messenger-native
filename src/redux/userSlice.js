import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getInfo(state, action) {
      return action.payload;
    },
    editAttributeUser(state, action) {
      return { ...state, [action.payload.type]: action.payload.data };
    },

    removeAttributeUser(state, action) {
      delete state[action.payload];
    },
  },
});

export const getUserInfo = (auth) => async (dispatch) => {
  try {
    const res = await getDataAPI("user", auth);

    dispatch(getInfo(res.data));
  } catch (e) {
    console.log(e);
  }
};

const { actions, reducer } = userSlice;
export const { getInfo, editAttributeUser, removeAttributeUser } = actions;

export default reducer;
