import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI } from "../utils/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    token: "",
  },
  reducers: {
    loginSuccess(state, action) {
      const { email, password } = action.payload.user;
      const { access_token } = action.payload;
      state.token = access_token;
      state.email = email;
      state.password = password;
    },
    logoutSuccess(state, action) {
      state.email = "";
      state.password = "";
      state.token = "";
    },
  },
});

// Action
export const login = (info) => async (dispatch) => {
  try {
    const res = await postDataAPI("auth/login", info);

    if (res.data) {
      await AsyncStorage.setItem("@user_token", res.data.access_token);
    }

    dispatch(loginSuccess(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await postDataAPI("auth/logout");
    dispatch(logoutSuccess());

    await AsyncStorage.removeItem("@user_token");
  } catch (e) {
    console.log(e);
  }
};

const { actions, reducer } = authSlice;
export const { loginSuccess, logoutSuccess } = actions;
export default reducer;
