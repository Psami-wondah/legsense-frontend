import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

const AxiosInstance = axios.create({
  baseURL: BASE_API_URL + "/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error.response?.data?.message);
  }
);

export default AxiosInstance;
