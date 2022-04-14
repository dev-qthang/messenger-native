import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { SERVER_URL } from "@env";

const messageSlice = createSlice({
  name: "upload",
  initialState: {
    conversations: [],
    current_conversation: {},
    members: [],
  },
  reducers: {
    getConversations(state) {
      return state.conversations;
    },
    setConversations(state, action) {
      state.conversations = action.payload;
    },

    getCurrentConversation(state) {
      return state.current_conversation;
    },
    setCurrentConversation(state, action) {
      state.current_conversation = action.payload;
    },

    getMembers(state) {
      return state.members;
    },
    setMembers(state, action) {
      state.members = action.payload;
    },
  },
});

export const fetchConversations = (idUser, token) => async (dispatch) => {
  try {
    let conversations = await getDataAPI(
      `${SERVER_URL}conversation/${idUser}`,
      token
    );
    dispatch(setConversations(conversations));
  } catch (err) {
    console.log(err);
  }
};

export const fetchMembers = (idConversation, token) => async (dispatch) => {
  try {
    let members = await getDataAPI(
      `${SERVER_URL}conversation/members/${idConversation}`,
      token
    );
    dispatch(setMembers(members));
  } catch (err) {
    console.log(err);
  }
};

const { actions, reducer } = messageSlice;

export const {
  getConversations,
  setConversations,
  getCurrentConversation,
  setCurrentConversation,
  getMembers,
  setMembers,
} = actions;

export default reducer;
