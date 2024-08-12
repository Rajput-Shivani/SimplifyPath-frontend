import { API_ROUTES } from "../../utils/constants";
// import { unauthorizedError } from "../../utils/helpers";
import { AxiosBase } from "./index";

export default class IntegrationService extends AxiosBase {
  getIntegrationData = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.INTEGRATION.INTEGRATION}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  getOrgIntegrationData = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.INTEGRATION.GET_ORG_INTEGRATION}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  removeIntegration = async (name, navigate) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.INTEGRATION.REMOVE_INTEGRATION}/${name}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  updateIntegration = async (body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.INTEGRATION.UPDATE_INTEGRATION}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  sendKekaIntegration = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.INTEGRATION.KEKA_INTEGRATION}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  sendDBFIntegration = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.INTEGRATION.DBF_INTEGRATION}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  sendTelegramIntegration = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.INTEGRATION.TELEGRAM_INTEGRATION}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  activateIntegration = async (body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.INTEGRATION.ACTIVATE_INTEGRATION}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  activateIntegrationTelegram = async (body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.INTEGRATION.ACTIVATE_INTEGRATION_TELEGRAM}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };

  getDawrwinBoxApi = async (employeeId, body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.INTEGRATION.DARWINBOX}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
}
