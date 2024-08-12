
import { API_ROUTES } from "../../utils/constants";
import { unauthorizedError } from "../../utils/helpers";
import { AxiosBase } from "./index";

export default class TrainAndContentService extends AxiosBase {
  uploadPDF = async (body, id, filenameType, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.TRAINFROMECONTENT.UPLOAD_PDF_DATA}/${id}/${filenameType}`,
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

  removePDF = async ({ id, navigate }) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.TRAINFROMECONTENT.DELETE_PDF}/${id}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };

  uploadText = async (body, id, filenameType, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.TRAINFROMECONTENT.UPLOAD_Text_DATA}/${id}/${filenameType}`,
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

  uploadURL = async (body, content, filenameType, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.TRAINFROMECONTENT.UPLOAD_URL_DATA}/${content}/${filenameType}`,
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

  getAllDocuments = async (page, limit, type, navigate, searchQuery) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.TRAINFROMECONTENT.GET_UPLOADED_DOCUMENT}?page=${page}&limit=${limit}&type=${type}&searchQuery=${searchQuery}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };

  getAllDocumentsProfile = async (page, limit, navigate, searchQuery) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.TRAINFROMECONTENT.GET_UPLOADED_DOCUMENT}?page=${page}&limit=${limit}&searchQuery=${searchQuery}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };

  getAllCustomData = async (page, limit, navigate, searchQuery) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.TRAINFROMECONTENT.GET_CUSTOM_API}?page=${page}&limit=${limit}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };

  removeCustomData = async (body, userId, navigate) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.TRAINFROMECONTENT.CUSTOM_API}/${userId}`,
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

  updateCustomData = async ({ id, body, navigate }) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.TRAINFROMECONTENT.CUSTOM_API}/${id}`,
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

  createCustomData = async (body, navigate) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.TRAINFROMECONTENT.CUSTOM_API}`,
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

  getSingleData = async (id, navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.TRAINFROMECONTENT.GET_SINGLE_DATA}/${id}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        unauthorizedError(navigate);
      }
      throw err;
    }
  };
  getCustomAction = async (navigate, searchQuery) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.TRAINFROMECONTENT.GET_CUSTOM_ACTION_API}?searchQuery=${searchQuery}`
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
