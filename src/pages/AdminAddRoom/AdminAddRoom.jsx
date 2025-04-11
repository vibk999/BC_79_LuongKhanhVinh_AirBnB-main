import React from "react";
import "./AdminAddRoom.scss";
import { adminRoomService } from "../../services/AdminRoom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  tenPhong: Yup.string().required("(*) Tên Phòng là bắt buộc"),
  khach: Yup.string()
    .required("(*) Số Khách bị trống")
    .matches(/^[0-9]/, "(*) Số Khách phải là số"),
  phongNgu: Yup.string()
    .required("(*) Số Phòng Ngủ bị trống")
    .matches(/^[0-9]/, "(*) Số Phòng Ngủ phải là số"),
  giuong: Yup.string()
    .required("(*) Số Giường bị trống")
    .matches(/^[0-9]/, "(*) Số Giường phải là số"),
  phongTam: Yup.string()
    .required("(*) Số Phòng Tắm bị trống")
    .matches(/^[0-9]/, "(*) Số Phòng Tắm phải là số"),
  moTa: Yup.string().required("(*) Không có Mô Tả nào sao ?"),
  giaTien: Yup.string()
    .required("(*) Số Tiền bị trống")
    .matches(/^[0-9]/, "(*) Số Tiền phải là số"),
  maViTri: Yup.string().required("(*) Mã vị trí bị trống"),
});

export default function AdminAddRoom() {
  const navigate = useNavigate();

  const initialValues = {
    tenPhong: "",
    khach: "",
    phongNgu: "",
    giuong: "",
    phongTam: "",
    moTa: "",
    giaTien: "",
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: "",
    hinhAnh: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await adminRoomService.fetchAdminAddRoomApi(values);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Thêm phòng thành công !",
      });
      resetForm();
      if (result.data.content) {
        navigate("/admin/phongthue");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };
  return (
    <div className="container mx-auto py-5 ml-5">
      <div className="md:block text-center text-3xl text-blue-800">
        <h1>Thêm Phòng Thuê</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Phòng :
            </label>
            <Field
              id="tenPhong"
              type="text"
              name="tenPhong"
              className="border text-sm rounded-md w-1/3 p-2 mb-2"
            />
            <ErrorMessage
              name="tenPhong"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Số khách :
            </label>
            <Field
              id="khach"
              type="text"
              name="khach"
              className="border text-sm rounded-md w-0.5/3 p-2 "
            />
            <ErrorMessage
              name="khach"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phòng ngủ :
            </label>
            <Field
              id="phongNgu"
              type="text"
              name="phongNgu"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
            <ErrorMessage
              name="phongNgu"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Giường :
            </label>
            <Field
              id="giuong"
              type="text"
              name="giuong"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
            <ErrorMessage
              name="giuong"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phòng Tắm :
            </label>
            <Field
              id="phongTam"
              type="text"
              name="phongTam"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <ErrorMessage
            name="phongTam"
            component="div"
            className="text-red-500"
          />
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Mã vị trí :
            </label>
            <Field
              id="maViTri"
              type="text"
              name="maViTri"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <ErrorMessage
            name="maViTri"
            component="div"
            className="text-red-500"
          />
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Mô tả :
            </label>
            <Field
              id="moTa"
              type="text"
              name="moTa"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
            <ErrorMessage
              name="moTa"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Giá tiền :
            </label>
            <Field
              id="giaTien"
              type="text"
              name="giaTien"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <ErrorMessage
            name="giaTien"
            component="div"
            className="text-red-500"
          />
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Máy giặt :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="mayGiat"
                id="mayGiat"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bàn là :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="banLa"
                id="banLa"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Tivi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="tivi"
                id="tivi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Điều hòa :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="dieuHoa"
                id="dieuHoa"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Wifi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="wifi"
                id="wifi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">Bếp :</label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="bep"
                id="bep"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bãi đõ xe :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="doXe"
                id="doXe"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Hồ bơi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="hoBoi"
                id="hoBoi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bàn Ủi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="banUi"
                id="banUi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Thêm
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
