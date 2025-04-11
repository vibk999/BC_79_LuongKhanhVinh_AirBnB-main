import { DatePicker, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminBookRoomService } from "../../../services/AdminBookRoom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function AdminBookRoomDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [bookRoomDetail, setBookRoomDetail] = useState({
    maPhong: "",
    soLuongKhach: "",
    maNguoiDung: "",
    ngayDen: "",
    ngayDi: "",
  });
  useEffect(() => {
    detaiBookRoomApi();
  }, []);
  const detaiBookRoomApi = async () => {
    const result = await adminBookRoomService.fetchAdminDetailBookRoomListApi(
      params.idRoom
    );
    setBookRoomDetail(result.data.content);
  };
  const handleChange = (event) => {
    setBookRoomDetail({
      ...bookRoomDetail,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeDateNgayDen = (value) => {
    const ngay = dayjs(value);
    setBookRoomDetail({
      ...bookRoomDetail,
      ngayDen: ngay,
    });
  };
  const handleChangeDateNgayDi = (value) => {
    const ngay = dayjs(value);
    setBookRoomDetail({
      ...bookRoomDetail,
      ngayDi: ngay,
    });
  };

  const valicationNumber = (value, mes) => {
    if (/^[0-9]+$/.test(value)) {
      return true;
    }
    notification.warning({
      message: mes,
      placement: "topLeft",
    });
    return false;
  };
  const handleSubmit = async () => {
    let isValid = true;
    isValid &= valicationNumber(bookRoomDetail.maPhong, "Nhập Số Mã Phòng !!!");

    isValid &= valicationNumber(
      bookRoomDetail.maNguoiDung,
      "Vui Lòng Nhập Số Cho Mã Người Dùng"
    );

    isValid &= valicationNumber(
      bookRoomDetail.soLuongKhach,
      "Vui Lòng Nhập Số Khách!!!"
    );

    if (isValid) {
      try {
        const result = await adminBookRoomService.fetchAdminEditBookRoomListApi(
          params.idRoom,
          bookRoomDetail
        );
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Cập nhật thành công !",
        });
        if (result.data.content) {
          navigate(`/admin/`);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.content}`,
        });
      }
    }
  };
  return (
    <div className="container mx-auto py-5">
      <div className="md:block text-center text-3xl text-blue-800 mb-5">
        <h1>CẬP NHẬT LẠI PHÒNG THUÊ</h1>
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 1000,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Mã Phòng">
          <input
            value={bookRoomDetail.maPhong}
            onChange={handleChange}
            name="maPhong"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Mã Người Dùng">
          <input
            value={bookRoomDetail.maNguoiDung}
            onChange={handleChange}
            name="maNguoiDung"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Số Lượng Khách">
          <input
            value={bookRoomDetail.soLuongKhach}
            onChange={handleChange}
            name="soLuongKhach"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>

        <Form.Item label="Ngày Đến">
          <DatePicker
            onChange={handleChangeDateNgayDen}
            value={dayjs(bookRoomDetail.ngayDen)}
            name="ngayDen"
            format={"DD/MM/YYYY"}
            className="border text-sm rounded-md w-1/3 p-2 "
          />
        </Form.Item>
        <Form.Item label="Ngày Đi">
          <DatePicker
            onChange={handleChangeDateNgayDi}
            value={dayjs(bookRoomDetail.ngayDi)}
            name="ngayDi"
            format={"DD/MM/YYYY"}
            className="border text-sm rounded-md w-1/3 p-2 "
          />
        </Form.Item>
        <Form.Item label="Button">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Cập Nhật
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
