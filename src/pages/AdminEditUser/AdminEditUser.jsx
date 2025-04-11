import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminUsersService } from "../../services/AdminUser";
import dayjs from "dayjs";
import { DatePicker, notification } from "antd";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Form, ErrorMessage, Field, Formik } from "formik";

const validationSchema = Yup.object({
  name: Yup.string().required("(*) Tên Người Dùng là bắt buộc"),
  email: Yup.string()
    .email("(*) Email không hợp lệ")
    .required("(*) Email là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "(*) Số Điện Thoại không hợp lệ")
    .required("(*) Số Điện Thoại là bắt buộc"),
  birthday: Yup.date().required("(*) Ngày Sinh là bắt buộc"),
});

export default function AdminEditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [imgUser, setImgUser] = useState("");
  const [userImgFile, setUserImgFile] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
    avatar: {},
  });

  const fetchAdminDetailApi = async () => {
    const result = await adminUsersService.fetchAdminDetailApi(params.userId);
    setUserInfo({
      ...result.data.content,
      birthday: result.data.content.birthday
        ? dayjs(result.data.content.birthday)
        : "",
    });
    if (result.data.content) {
      notification.warning({
        message: "CHÚ Ý: KHÔNG THỂ CẬP NHẬT HÌNH ẢNH CHO ACCOUNT KHÁC !!!",
        placement: "topRight",
      });
    }
  };

  useEffect(() => {
    fetchAdminDetailApi();
  }, []);
  const handChangeImgUser = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgUser(event.target.result);
    };
    setUserImgFile(file);
  };

  const handleChangeUserInfo = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday
        ? dayjs(values.birthday).format("DD-MM-YYYY")
        : null,
    };
    try {
      const result = await adminUsersService.fetchAdminUpdateApi(
        params.userId,
        formattedValues
      );
      if (userImgFile !== null) {
        let formData = new FormData();
        formData.append("formFile", userImgFile, userImgFile.name);
        await adminUsersService.fetchAdminImgApi(formData);
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật User thành công !",
      });
      fetchAdminDetailApi();
      if (result.data.content) {
        navigate(`/admin/user`);
      }
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
      resetForm();
    }
  };
  return (
    <div className="container mx-auto py-5 ml-5">
      <Formik
        enableReinitialize
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={handleChangeUserInfo}
      >
        <Form>
          <div className="mb-4 ">
            <div className="md:block text-center text-3xl text-blue-800">
              <h1>Cập Nhật Tài Khoản</h1>
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Người Dùng :
            </label>
            <Field
              type="text"
              name="name"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="form-label text-red-600"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Email :
            </label>
            <Field
              type="text"
              name="email"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="form-label text-red-600"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Password :
            </label>
            <Field
              placeholder="*********"
              type="password"
              name="password"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phone Number :
            </label>
            <Field
              type="text"
              name="phone"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="form-label text-red-600"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Birthday :
            </label>
            <Field name="birthday">
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  format="DD/MM/YYYY"
                  className="border text-sm rounded-md w-1/3 p-2"
                  onChange={(value) => form.setFieldValue("birthday", value)}
                />
              )}
            </Field>
            <ErrorMessage
              name="birthday"
              component="div"
              className="form-label text-red-600"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Gender :
            </label>
            <Field
              as="select"
              name="gender"
              className="border text-sm rounded-md w-1/3 p-2"
            >
              <option value="true">MALE</option>
              <option value="false">FEMALE</option>
            </Field>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              TYPE USER :
            </label>
            <Field
              as="select"
              name="role"
              className="border text-sm rounded-md w-1/3 p-2"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </Field>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              AVATAR :
            </label>
            <input name="avatar" type="File" onChange={handChangeImgUser} />
            <br />
            <img
              className="mt-3"
              style={{ width: 150, height: 150 }}
              src={imgUser === "" ? userInfo.avatar : imgUser}
              alt="..."
            />
          </div>

          <div className="col-span-2 mt-3 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
