import { API_ROUTES } from "../../utils/constants";
import { unauthorizedError } from "../../utils/helpers";
import AppSecureStorage from "../secureStorage"
import { AxiosBase } from "./index";

const storage = new AppSecureStorage();
export default class AnalyticsService extends AxiosBase {
  getAnalyticsData = async ({ startDate, endDate, navigate }) => {
    try {
      const response = await this.requests.get(
        `${
          API_ROUTES.ANALYTICS.GET_ANALYTICS_DATA
        }?startDate=${startDate}&endDate=${endDate}&orgId=${storage.get(
          "orgId"
        )}`
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
