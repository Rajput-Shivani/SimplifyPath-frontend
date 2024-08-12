import { API_ROUTES } from "../../utils/constants";
import { AxiosBase } from "./index";

export default class ChatService extends AxiosBase {
  getChatData = async (navigate) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.CHAT.GET_CHAT_DATA}`
      );
      return response;
    } catch (err) {
      if (err?.status === 401) {
        //unauthorizedError(navigate);
      }
      throw err;
    }
  };
  feedback = async (body, navigate, id) => {
    try {
      const response = await this.requests.post(
        `/chat/${id}${API_ROUTES.CHAT.FEEDBACK}`,
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
