import { API_ROUTES } from "../../utils/constants";
// import { unauthorizedError } from "../../utils/helpers";
import { AxiosBase } from "./index";

export default class UserManagementService extends AxiosBase {
    addOrganization = async (body) => {
      try {
        const response = await this.requests.post(
          `${API_ROUTES.ORGANIZATION.ORG}`,
          body
        );
        return response;
      } catch (err) {
        throw err;
      }
    };

  // Get all users filter
  getAllUserManagementData = async (page, limit, email, role, navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.USERMANAGEMENT.GET_USERS}?page=${page}&limit=${limit}&email=${email}&role=${role}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  getAllUserManagement = async ({
    page,
    limit,
    navigate,
    filterValue,
    searchQuery,
    sortKey,
    sortDirection,
  }) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.USERMANAGEMENT.GET_USERS}?page=${page}&limit=${limit}&status=${filterValue}&searchQuery=${searchQuery}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };
  // get all roles
  getAllRoles = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.USERMANAGEMENT.GET_ROLES}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  // get all roles
  getAllPermissions = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.USERMANAGEMENT.GET_ALL_PERMISSIONS}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  // get all roles
  deleteUser = async (id, page, limit, navigate, filterValue) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.USERMANAGEMENT.DELETE_USER.replace(":id", id)}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  // send email verification reminder
  sendReminderEmail = async (id, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.USERMANAGEMENT.SEND_REMINDER_EMAIL.replace(":id", id)}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  addNewUser = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.USERMANAGEMENT.ADD_NEW_USER}`,
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

  updateUser = async (id, data, navigate) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.USERMANAGEMENT.UPDATE_USER.replace(":id", id)}`,
        data
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        // unauthorizedError(navigate);
      }
      throw err;
    }
  };

  //   removeOrganization = async (id) => {
  //     try {
  //       const response = await this.requests.delete(
  //         `${API_ROUTES.ORGANIZATION.ORG}/${id}`
  //       );
  //       return response;
  //     } catch (err) {
  //       throw err;
  //     }
  //   };
  //   editOrganization = async (id, body) => {
  //     try {
  //       const response = await this.requests.put(
  //         `${API_ROUTES.ORGANIZATION.ORG}/${id}`,
  //         body
  //       );
  //       return response;
  //     } catch (err) {
  //       throw err;
  //     }
  //   };
}
