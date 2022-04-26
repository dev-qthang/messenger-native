import axios from "axios";
import { SERVER_URL } from "@env";

// Cái đống này là chạy ở máy tôi nhé :v các ông pull về mà thấy thì cứ cmt vào
import { url } from "../../env";
const instance = axios.create({
  baseURL: "http://192.168.1.142:5000/api/",
});
/////////////////////////////////////

export const getDataAPI = async (url, token) => {
  const res = await instance.get(url, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  console.log("Server url: ", SERVER_URL);

  const res = await instance.post(url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await instance.put(url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await instance.patch(url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await instance.delete(url, {
    headers: { Authorization: token },
  });
  return res;
};
