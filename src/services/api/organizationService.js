import { API_ROUTES } from "../../utils/constants";
import { unauthorizedError } from "../../utils/helpers";
import { AxiosBase } from "./index";

export default class OrganisationService extends AxiosBase {
  addOrganization = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.ORGANIZATION.ORG}`,
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

  getAllOrganization = async ({
    page,
    limit,
    navigate,
    searchQuery,
    sortKey,
    sortDirection,
  }) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.ORGANIZATION.ORG}?page=${page}&limit=${limit}&searchQuery=${searchQuery}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };
  removeOrganization = async (id, navigate) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.ORGANIZATION.ORG}/${id}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };
  editOrganization = async (id, body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.ORGANIZATION.ORG}/${id}`,
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
  activateOrganization = async (id, body, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.ORGANIZATION.ORG}/${id}`,
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
