import { requestApi } from "../configs/callApi";

class AdminBookRoomService {
  fetchAdminBookRoomListApi() {
    return requestApi({
      url: `/dat-phong`,
      method: "GET",
    });
  }
  fetchAdminDetailBookRoomListApi(id) {
    return requestApi({
      url: `/dat-phong/${id}`,
      method: "GET",
    });
  }
  fetchAdminEditBookRoomListApi(id, data) {
    return requestApi({
      url: `/dat-phong/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminDeleteBookRoomListApi(id) {
    return requestApi({
      url: `/dat-phong/${id}`,
      method: "DELETE",
    });
  }
  fetchAdminSearchBookRoomApi(value) {
    return requestApi({
      url: `/dat-phong/lay-theo-nguoi-dung/${value}`,
      method: "GET",
    });
  }
}

export const adminBookRoomService = new AdminBookRoomService();
