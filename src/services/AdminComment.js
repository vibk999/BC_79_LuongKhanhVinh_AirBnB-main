import { requestApi } from "../configs/callApi";

class AdminCommentService {
  fetchAdminCommentApi() {
    return requestApi({
      url: `/binh-luan`,
      method: "GET",
    });
  }
  fetchAdminSearchCommentApi(id) {
    return requestApi({
      url: `/binh-luan/lay-binh-luan-theo-phong/${id}`,
      method: "GET",
    });
  }
  fetchAdminDeleteCommentApi(id) {
    return requestApi({
      url: `/binh-luan/${id}`,
      method: "DELETE",
    });
  }
}

export const adminCommentService = new AdminCommentService();
