import axios from "axios";
import { navigate } from "@/utils/navigate";

const apiUrl = "https://api.esoralabs.com/api/v1";

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    return response;
  },
  ({ response }) => {
    if (response.status === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    return response;
  }
);

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("user");
    if (token) {
      config.headers = {
        ...config?.headers,
        authorization: JSON.parse(localStorage.getItem("user"))?.jwt,
      };
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default class ApiCaller {
  static Get = async (endPoint = "", body = {}, headers = {}) => {
    const response = await axios.get(`${apiUrl}${endPoint}`, body, {
      headers,
    });
    return response;
  };

  static Post = async (endPoint = "", body = {}, headers = {}) => {
    const response = await axios.post(`${apiUrl}${endPoint}`, body, {
      headers,
    });
    return response;
  };
  static Put = async (endPoint = "", body = {}, headers = {}) => {
    const response = await axios.put(`${apiUrl}${endPoint}`, body, {
      headers,
    });
    return response;
  };
  static Delete = async (endPoint = "", body = {}, headers = {}) => {
    const response = await axios.delete(`${apiUrl}${endPoint}`, body, {
      headers,
    });
    return response;
  };
}
