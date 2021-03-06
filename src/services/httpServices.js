import axios from "axios";
class Services {
  axios;
  interceptors;

  constructor() {
    this.axios = axios;
    this.interceptors = null;
    // this.axios.defaults.withCredentials = false;
    // this.axios.defaults.adapter = require("axios/lib/adapters/http");
    this.axios.defaults.headers = {
      //      "Access-Control-Allow-Headers": "*",
      //    "Access-Control-Allow-Methods": "*",
      // "Access-Control-Allow-Credentials": true,
    };
  }

  attachTokenToHeader(token) {
    this.interceptors = this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  backToDefaultHeader() { }

  saveLocalStorage(data) {
    // const { token, res } = data;
    // const dataSave = {
    //   token,
    //   res,
    // };
    window.localStorage.setItem("userSPRS", JSON.stringify(data));
  }

  clearLocalStorage() {
    window.localStorage.removeItem("userSPRS");
  }

  handleResponse(response, error, isSuccess, url) {
    if (isSuccess) {
      return response;
    } else {
      console.log(error.response, "err");
      if (error.response && error.response.status === 401) {
        if ((url || "").includes("/authenticate")) {
          return error.response;
        }
        // clear token
        localStorage.removeItem("userSPRS");
        window.location.reload();
        return;
      }
      return error.response;
    }
  }
  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  async get(url, config) {
    try {
      const response = await this.axios.get(url, config);
      return this.handleResponse(response, {}, true, url);
    } catch (error) {
      return this.handleResponse({}, error, false, url);
    }
    // return this.axios.get(...arg);
  }

  async post(url, data, config) {
    try {
      const response = await this.axios.post(url, data, config);
      return this.handleResponse(response, {}, true, url);
    } catch (error) {
      return this.handleResponse({}, error, false, url);
    }
    // return this.axios.post(url, data, config);
  }

  async delete(url, config) {
    try {
      const response = await this.axios.delete(url, config);
      return this.handleResponse(response, {}, true, url);
    } catch (error) {
      return this.handleResponse({}, error, false, url);
    }
    // return this.axios.delete(url, config);
  }

  async put(url, data, config) {
    try {
      const response = await this.axios.put(url, data, config);
      return this.handleResponse(response, {}, true, url);
    } catch (error) {
      return this.handleResponse({}, error, false, url);
    }
  }
}

export default new Services();
