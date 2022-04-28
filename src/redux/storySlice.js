import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";

export const getStories = createAsyncThunk(
  "user/getStories",
  async (auth, { rejectWithValue }) => {
    try {
      const response = await getDataAPI(user/suggestions, auth);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: "Could not send this request!",
      });
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    myStory: [],
    stories: [],
  },
  reducers: {
    getStory(state, action) {
      return state;
    },
    uploadStory(state, action) {
      state.myStory = [...state.myStory, action.payload];
    },
  },
  extraReducers: {
    [getStories.fulfilled]: (state, action) => {
      const resultStories = [];
      const eachStory = action.payload.map((e) => ({
        stories: e.result,
        id: e._id,
        user: e,
      }));

      eachStory.forEach((e) => resultStories.push({ ...e }));
      state.stories = resultStories;
    },
  },
});

const { actions, reducer } = storySlice;
export const { getStory, uploadStory } = actions;

export default reducer;
