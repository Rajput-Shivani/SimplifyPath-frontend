
import { API_ROUTES } from "../../utils/constants";
import { unauthorizedError } from "../../utils/helpers";
import { AxiosBase } from "./index";

export default class ProfileService extends AxiosBase {
  getProfileDetailsData = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.PROFILE.GET_PROFILE_DETAILS}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };
  updateProfileDetailsData = async (body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.PROFILE.UPDATE_PROFILE_DETAILS}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };
}
