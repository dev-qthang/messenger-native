import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    avatar: "https://i.redd.it/i3peg3rqksa51.png",
    wallpaper:
      "https://i.pinimg.com/736x/f4/f9/1c/f4f91c394261080ff096d7c7843eb4c7.jpg",
    name: "Nguyen Quyet Thang",
    bio: "Dang code native",
    schools: {
      schoolName: "",
      branch: "",
      graduated: false,
    },
    workPlaces: {
      workPlaceName: "",
      position: "",
      currentlyWorking: false,
    },
    lives: "",
    address: "",
    instagram: "",
    github: "",
    gender: "Male",
    dateOfBirth: "13/10/2001",
  },
  reducers: {
    editAttributeUser(state, action) {
      return { ...state, [action.payload.type]: action.payload.data };
    },

    removeAttributeUser(state, action) {
      delete state[action.payload];
    },
  },
});

const { actions, reducer } = userSlice;
export const { editAttributeUser, removeAttributeUser } = actions;
export default reducer;
