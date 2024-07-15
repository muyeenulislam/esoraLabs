import axios from "axios";
import { message } from "antd";
import { navigate } from "@/utils/navigate";

// const apiUrl = "https://api.esoralabs.com/api/v1";
const apiUrl = "http://localhost:8000/api/v1";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("user");
    if (token) {
      config.headers = {
        ...config?.headers,
        authorization: JSON.parse(localStorage.getItem("user"))?.jwt,
        portal: "admin",
      };
      return config;
    } else {
      config.headers = {
        ...config?.headers,
        portal: "admin",
      };
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default class ApiCaller {
  static Get = async (endPoint = "", body = {}, headers = {}) => {
    try {
      const response = await axios.get(`${apiUrl}${endPoint}`, body, {
        headers,
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      message.error(e?.response?.data?.message);
    }
  };

  static Post = async (endPoint = "", body = {}, headers = {}) => {
    try {
      const response = await axios.post(`${apiUrl}${endPoint}`, body, {
        headers,
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      message.error(e?.response?.data?.message);
    }
  };
  static Put = async (endPoint = "", body = {}, headers = {}) => {
    try {
      const response = await axios.put(`${apiUrl}${endPoint}`, body, {
        headers,
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      message.error(e?.response?.data?.message);
    }
  };
  static Delete = async (endPoint = "", body = {}, headers = {}) => {
    try {
      const response = await axios.delete(`${apiUrl}${endPoint}`, body, {
        headers,
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      message.error(e?.response?.data?.message);
    }
  };
}
