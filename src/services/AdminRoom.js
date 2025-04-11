import { requestApi } from "../configs/callApi";

class AdminRoomService {
  fetchAdminRoomApi() {
    return requestApi({
      url: `/phong-thue`,
      method: "GET",
    });
  }
  fetchAdminAddRoomApi(data) {
    return requestApi({
      url: `/phong-thue`,
      method: "POST",
      data,
    });
  }
  fetchAdminUploadImgApi(id, data) {
    return requestApi({
      url: `/phong-thue/upload-hinh-phong?maPhong=${id}`,
      method: "POST",
      data,
    });
  }
  fetchAdminDetailRoomApi(id) {
    return requestApi({
      url: `/phong-thue/${id}`,
      method: "GET",
    });
  }
  fetchAdminEditRoomApi(id, data) {
    return requestApi({
      url: `/phong-thue/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminDeleteApi(idRoom) {
    return requestApi({
      url: `/phong-thue/${idRoom}`,
      method: "DELETE",
    });
  }
}

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4ODMiLCJlbWFpbCI6Inp4emN4ekBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2OTc1OTM4OTQsImV4cCI6MTY5ODE5ODY5NH0.dq9xdj71fPQcBgsgFuG9Y8MP_p4uoND0b-mJbTl4SLo"

export const adminRoomService = new AdminRoomService();
