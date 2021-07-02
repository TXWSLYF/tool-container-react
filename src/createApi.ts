import axios from "axios";

const baseURLs = {
  development: "http://127.0.0.1:7001",
  production: "http://127.0.0.1:7001",
};

const createApi = (mode: keyof typeof baseURLs) =>
  axios.create({
    baseURL: baseURLs[mode],
    timeout: 5000,
  });

export default createApi;
