import React from "react";
import Swal from "sweetalert2";
import { adminLocalService } from "../../services/AdminLocation";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  tenViTri: Yup.string().required("(*) Không để trống tên Vị Trí"),
  tinhThanh: Yup.string().required("(*) Không để trống tên Tỉnh Thành"),
  quocGia: Yup.string().required("(*) Không để trống tên Quốc Gia"),
});

export default function AdminAddLocation() {
  const navigate = useNavigate();
  const initialValues = {
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await adminLocalService.fetchAdminAddLocationApi(values);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Thêm vị trí thành công !",
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
