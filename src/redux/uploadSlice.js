import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { SERVER_URL } from "@env";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    image: "",
    video: "",
  },
  reducers: {
    getImageUrl(state) {
      return state.image;
    },
    setImageUrl(state, action) {
      state.image = action.payload;
    },
    getVideoUrl(state) {
      return state.video;
    },
    setVideoUrl(state, action) {
      state.video = action.payload;
    },
  },
});

export const uploadFile = (uri, type, token) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("image", {
      uri: uri,
      type: type == "image" ? "image/jpg" : "video/mp4",
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

    console.log(resJson);

    const newFileUrl = resJson.url;

    //  TODO: lưu ảnh/video vừa upload vào database

    if (type == "image") {
      dispatch(setImageUrl(newFileUrl));
    } else {
      dispatch(setVideoUrl(newFileUrl));
    }
  } catch (err) {
    console.log(err);
  }
};

const { actions, reducer } = uploadSlice;

export const { getImageUrl, setImageUrl, getVideoUrl, setVideoUrl } = actions;

export default reducer;
