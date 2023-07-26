import axios from "axios";

const instance = axios.create({
  baseURL: "http://31.129.101.248:3001",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
