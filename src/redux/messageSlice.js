import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { SERVER_URL } from "@env";

const messageSlice = createSlice({
  name: "upload",
  initialState: {
    messages: [],
  },
  reducers: {
    getMessages(state) {
      return state.messages;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const fetchMessages = (idConversation, token) => async (dispatch) => {
  try {
    let messages = await getDataAPI(
      `${SERVER_URL}message/${idConversation}`,
      token
    );
    dispatch(setMessages(messages));
  } catch (err) {
    console.log(err);
  }
};

const { actions, reducer } = messageSlice;

export const { getMessages, setMessages } = actions;

export default reducer;
