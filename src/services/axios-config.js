import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
};

const $axios = axios.create(config);

export default $axios;
