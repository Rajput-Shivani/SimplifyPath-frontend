import { API_ROUTES } from "../../utils/constants";
import { AxiosBase } from "./index";

export default class AuthService extends AxiosBase {
  login = async (body) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.AUTHENTICATION.LOGIN_AUTH}`,
        body
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  logout = async (body) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.AUTHENTICATION.LOGOUT_AUTH}`,
        body
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
