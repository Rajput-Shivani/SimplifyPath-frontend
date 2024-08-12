// import { unauthorizedError } from "../../utils/helpers";
import { API_ROUTES } from "../../utils/constants";
import { AxiosBase } from "./index";

export default class UserRoleService extends AxiosBase {
  getRolesData = async ({
    page,
    limit,
    searchQuery,
    sortKey,
    sortDirection,
    navigate,
  }) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.USER_ROLES.GET_ROLES}?page=${page}&limit=${limit}&searchQuery=${searchQuery}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };
  addNewRole = async (body, page, limit, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.USER_ROLES.Add_NEW_Role}?page=${page}&limit=${limit}`,
        body
      );
      return response;
    } catch (err) {
      // if (err?.status === 401) {
      //   unauthorizedError(navigate);
      // }
      throw err;
    }
  };

  editRole = async ({ body, id, page, limit, navigate }) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.USER_ROLES.Edit_NEW_Role}/${id}?page=${page}&limit=${limit}`,
        body
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };
}
