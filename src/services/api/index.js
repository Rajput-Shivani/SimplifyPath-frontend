import axios from "axios";
import AppSecureStorage from "../secureStorage";
import { API_ROUTES, CONFIG } from "../../utils/constants";
const storage = new AppSecureStorage();
export class AxiosBase {
  instance = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    timeout: CONFIG.TIMEOUT,
    headers: {
      "access-control-allow-origin": "*",
      "Access-Control-Allow-Headers": "-Type, Authorization",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
      withCredentials: true,
      credentials: "same-origin",
    },
  });

  axiosInterceptor = this.instance.interceptors.request.use(function (config) {
    config.headers["Authorization"] = "Bearer " + storage.get("token");
    return config;
  });

  responseBody = (response) => {
    return response.data;
  };

  responseError = (error) => {
    throw error.response;
  };

  serializeParams = function (url, params) {
    var str = [];
    for (var p in params)
      if (
        params.hasOwnProperty(p) &&
        params[p] !== undefined &&
        params[p] !== null
      ) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
    return str.length > 0 ? `${url}?${str.join("&")}` : url;
  };

  requests = {
    get: (url) =>
      this.instance.get(url).then(this.responseBody).catch(this.responseError),
    post: (url, body) =>
      this.instance
        .post(url, body)
        .then(this.responseBody)
        .catch(this.responseError),
    put: (url, body) =>
      this.instance
        .put(url, body)
        .then(this.responseBody)
        .catch(this.responseError),
    patch: (url) =>
      this.instance
        .patch(url)
        .then(this.responseBody)
        .catch(this.responseError),
    delete: (url, body) =>
      this.instance
        .delete(url, { data: body })
        .then(this.responseBody)
        .catch(this.responseError),
  };
}
