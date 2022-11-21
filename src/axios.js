import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("monjayToken")}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      Navigate("/login");
      Cookies.remove("monjayToken");
    } else {
      return Promise.reject(error);
    }
  }
);

instance.defaults.headers.post["Accept"] = "application/json";

export default instance;
