import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { SERVER_URL } from "@env";

const userSlice = createSlice({
  name: "user",
  initialState: {
    search: "",
    story: [],
    profiles: [],
    currentUser: {},
  },
  reducers: {
    searchUsers(state, action) {
      state.search = action.payload;
    },
    getInfo(state, action) {
      state.currentUser = action.payload;
    },
    editAttributeUser(state, action) {
      return action.payload;
    },

    removeAttributeUser(state, action) {
      delete state[action.payload];
    },
  },
});

export const getUserInfo = (auth) => async (dispatch) => {
  try {
    const res = await getDataAPI(`user`, auth);

    dispatch(getInfo(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const upload = (uri, type, token) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("image", {
      uri: uri,
      type: "image/jpg",
      name: "new_file",
    });
    const response = await fetch(`${SERVER_URL}upload/${type.toLowerCase()}`, {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: token,
      },
    });

    let resJson = await response.json();
    console.log("Url: ", resJson.url);
    return resJson.url;
  } catch (err) {
    console.log(err);
  }
};

const { actions, reducer } = userSlice;
export const { searchUsers, getInfo, editAttributeUser, removeAttributeUser } =
  actions;

export default reducer;
