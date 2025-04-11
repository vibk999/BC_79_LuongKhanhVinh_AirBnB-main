import { requestApi } from "../configs/callApi";

class AdminLocationService {
  fetchAdminLocationApi() {
    return requestApi({
      url: `/vi-tri`,
      method: "GET",
    });
  }
  fetchAdminAddLocationApi(data) {
    return requestApi({
      url: `/vi-tri`,
      method: "POST",
      data,
    });
  }
  fetchAdminDetailLocationApi(id) {
    return requestApi({
      url: `/vi-tri/${id}`,
      method: "GET",
    });
  }

  fetchAdminDeleteLocationApi(id) {
    return requestApi({
      url: `/vi-tri/${id}`,
      method: "DELETE",
    });
  }
  fetchAdminEditLocationApi(id, data) {
    return requestApi({
      url: `/vi-tri/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminImgLocationApi(id, data) {
    return requestApi({
      url: `/vi-tri/upload-hinh-vitri?maViTri=${id}`,
      method: "POST",
      data,
    });
  }
}

export const adminLocalService = new AdminLocationService();
