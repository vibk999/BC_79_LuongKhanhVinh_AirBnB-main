import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userService } from "../../../services/UserBooking";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PasswordIcon from "@mui/icons-material/Password";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  name: Yup.string().required("(*) Tên Người Dùng là bắt buộc"),
  email: Yup.string()
    .email("(*) Email không hợp lệ")
    .required("(*) Email là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "(*) Số Điện Thoại không hợp lệ")
    .required("(*) Số Điện Thoại là bắt buộc"),
  password: Yup.string()
    .min(6, "(*) Mật khẩu phải có ít nhất 6 ký tự")
    .required("(*) Mật khẩu là bắt buộc"),
  address: Yup.string().required("(*) Địa Chỉ là bắt buộc"),
  birthday: Yup.date().required("(*) Ngày Sinh là bắt buộc"),
  gender: Yup.string().required("(*) Giới Tính là bắt buộc"),
});

export default function FormRegister() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    address: "",
    gender: true,
  };

  const onSubmitRegister = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday
        ? dayjs(values.birthday).format("DD-MM-YYYY")
        : null,
    };

    try {
      await userService.registerApi(formattedValues);
      setFieldErrors({});
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Bạn đã đăng ký thành công",
      });
      resetForm();
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data.content;
        setFieldErrors({ email: errorData });
      }
      Swal.fire({
        icon: "error",
        title: `${error.response.data.content}`,
        text: "Vui lòng chọn email khác",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitRegister}
    >
      <Form>
        <div className="md:grid md:grid-cols-2 gap-x-4 gap-y-1">
          <div className="mb-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <PersonIcon className="w-6 h-6 text-gray-800" />
                </span>
                Tên Người Dùng
              </div>
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Điền tên vào đây ..."
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <MailOutlineIcon className="w-6 h-6 text-gray-800" />
                </span>
                Email
              </div>
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Example@gmail.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 font-semibold"
            />
            {fieldErrors.email && (
              <label className="text-red-600 font-semibold">
                (*) {fieldErrors.email}
              </label>
            )}
          </div>
          <div className="mb-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <ContactPhoneIcon className="w-6 h-6 text-gray-700" />
                </span>
                Số Điện Thoại
              </div>
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="098 6888 234"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <PasswordIcon className="w-6 h-6 text-gray-700" />
                </span>
                Mật khẩu
              </div>
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="***********"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <BusinessIcon className="w-6 h-6 text-gray-700" />
                </span>
                Địa Chỉ
              </div>
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Điền địa chỉ vào đây ..."
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="birthday"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <CalendarMonthIcon className="w-6 h-6 text-gray-700" />
                </span>
                Ngày Sinh
              </div>
            </label>
            <Field name="birthday">
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  format="DD/MM/YYYY"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(value) => form.setFieldValue("birthday", value)}
                />
              )}
            </Field>
            <ErrorMessage
              name="birthday"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <TransgenderIcon className="w-6 h-6 text-gray-700" />
                </span>
                Giới tính
              </div>
            </label>
            <Field
              as="select"
              id="gender"
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Giới tính</option>
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-600 font-semibold"
            />
          </div>
          <div></div>
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-500 hover:bg-red-800 duration-300 w-1/2"
            >
              Đăng ký
            </button>
          </div>
          <NavLink
            className="col-span-2 text-center text-rose-600 hover:text-rose-500 hover:underline underline-offset-4 tracking-wider duration-200"
            to="/login"
          >
            Đăng nhập ngay
          </NavLink>
        </div>
      </Form>
    </Formik>
  );
}
