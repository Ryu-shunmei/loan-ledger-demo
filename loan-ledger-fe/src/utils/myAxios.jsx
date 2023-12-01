import axios from "axios";

const instance = axios.create({
  baseURL: "http://0.0.0.0:8080",
  timeout: 5 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token", null);
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return [res.status, res.data];
  },
  (err) => {
    console.log(err)
    return [err.status, err.response.data];
  }
);

export default instance;
