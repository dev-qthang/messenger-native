import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import axios from "axios";
import { SERVER_URL } from "@env";

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

export const upload = (file, type, token) => async (dispatch) => {
  const formData = new FormData();
  console.log(type, file);
  formData.append("image", {
    name: "image",
    uri: file,
    type: "image/jpg",
  });
  try {
    const response = await axios.post(
      `${SERVER_URL}upload/${type.toLowerCase()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );

    console.log(response);
    return response.data.url;
  } catch (err) {
    console.log(err);
  }
};

const { actions, reducer } = userSlice;
export const { getInfo, editAttributeUser, removeAttributeUser } = actions;

export default reducer;
