/* eslint-disable no-unused-expressions */
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.token = `Bearer ${Cookies.get("monjayToken")}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("req", error?.response);

    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location = "/login";
      Cookies.remove("monjayToken");
    } else {
      error?.code === "ERR_NETWORK" &&
      window.location.pathname !== "/SomethingWrong"
        ? (window.location = `/SomethingWrong?${error?.code}`)
        : error?.response?.status !== 400
        ? (window.location = `/SomethingWrong?${error.response.status}`)
        : null;
      return Promise.reject(error);
    }
  }
);

instance.defaults.headers.post["Accept"] = "application/json";

export default instance;
