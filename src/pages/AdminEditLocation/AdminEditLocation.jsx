import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { adminLocalService } from "../../services/AdminLocation";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  tenViTri: Yup.string().required("(*) Không để trống tên Vị Trí"),
  tinhThanh: Yup.string().required("(*) Không để trống tên Tỉnh Thành"),
  quocGia: Yup.string().required("(*) Không để trống tên Quốc Gia"),
});
export default function AdminAddLocation() {
  const params = useParams();
  const navigate = useNavigate();
  const [imgLocation, setImgLocation] = useState("");
  const [imgFileUpload, setImgFileUpload] = useState(null);
  const [editLocation, setEditLocation] = useState({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: {},
  });

  useEffect(() => {
    fetchLocationDetail();
  }, []);
  const fetchLocationDetail = async () => {
    const result = await adminLocalService.fetchAdminDetailLocationApi(
      params.locationId
    );
    setEditLocation(result.data.content);
  };
  const handleChangeImg = (event) => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgLocation(event.target.result);
    };
    setImgFileUpload(file);
  };
  const validateRequired = (value, ref, mes) => {
    if (value !== "") {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };
  const handleSubmitEdit = async (values, { resetForm }) => {
    try {
      const result = await adminLocalService.fetchAdminEditLocationApi(
        params.locationId,
        values
      );
      if (imgFileUpload !== null) {
        let formData = new FormData();
        formData.append("formFile", imgFileUpload, imgFileUpload.name);
        const resultUpload = await adminLocalService.fetchAdminImgLocationApi(
          params.locationId,
          formData
        );
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật vị trí thành công !",
      });
      resetForm();
      if (result.data.content) {
        navigate(`/admin/location`);
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
        <h1>Thêm Vị Trí</h1>
      </div>

      <Formik
        enableReinitialize
        initialValues={editLocation}
        validationSchema={validationSchema}
        onSubmit={handleSubmitEdit}
      >
        <Form>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Vị trí :
            </label>
            <Field
              type="text"
              id="tenViTri"
              name="tenViTri"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="tenViTri"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Tỉnh Thành :
            </label>
            <Field
              type="text"
              id="tinhThanh"
              name="tinhThanh"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="tinhThanh"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Quốc Gia:
            </label>
            <Field
              type="text"
              id="quocGia"
              name="quocGia"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <ErrorMessage
            name="quocGia"
            component="div"
            className="text-red-500"
          />
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Hình ảnh:
            </label>
            <input
              name="hinhAnh"
              type="File"
              onChange={handleChangeImg}
              className="mb-2"
            />
            <br />
            <img
              style={{ width: 150, height: 150 }}
              src={imgLocation === "" ? editLocation.hinhAnh : imgLocation}
              alt="..."
            />
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Cập Nhật
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
