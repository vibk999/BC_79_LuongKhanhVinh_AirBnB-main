import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import security from "../../assets/img/security.png";
import { userService } from "../../services/UserBooking";
import { LoadingContext } from "../../contexts/Loading/Loading";
import ImagePersonal from "./ImagePersonal/ImagePersonal";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("(*) Họ tên không được để trống"),
  birthday: Yup.string().required("(*) Ngày sinh không được để trống"),
  email: Yup.string()
    .email("(*) Email không hợp lệ")
    .required("(*) Email không được để trống"),
  phone: Yup.string()
    .required("(*) Số điện thoại không được để trống")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  gender: Yup.string().required("(*) Giới tính không được để trống"),
});

export default function PersonaInfo() {
  const { userInfo: userFromStore } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [fieldErrors, setFieldErrors] = useState("");
  const [, setLoadingState] = useContext(LoadingContext);

  const getUserInfo = async () => {
    setLoadingState({ isLoading: true });
    try {
      const res = await userService.userInfoApi(userFromStore.user.id);
      const { name, birthday, email, phone, gender } = res.data.content;
      setUserInfo({
        name,
        birthday: birthday ? dayjs(birthday) : "",
        email,
        phone,
        gender: gender === true ? "true" : "false",
      });
    } catch (err) {
      console.error("Error fetching user info", err);
    }
    setLoadingState({ isLoading: false });
  };

  const handleChangeUserInfo = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday
        ? dayjs(values.birthday).format("MM-DD-YYYY")
        : null,
      gender: values.gender === "true",
    };
    try {
      await userService.updateUserInfoApi(
        userFromStore.user.id,
        formattedValues
      );
      await getUserInfo();
      setFieldErrors("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Bạn đã cập nhật thành công",
      });
      resetForm();
    } catch (error) {
      const errorMsg = error.response?.data?.content || "Lỗi không xác định";
      setFieldErrors(errorMsg);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container mx-auto px-10 personal-info mb-20">
      <div className="h-28"></div>
      <div className="flex flex-wrap">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 max-md:mb-2">
          <div className="w-full sticky top-32 border rounded-lg p-5">
            <ImagePersonal />
            <div className="mt-2">
              <div className="flex items-center">
                <img src={security} className="text-green-600 w-7" alt=".." />
                <span className="ml-2 font-semibold text-lg">
                  Xác minh danh tính
                </span>
              </div>
              <p className="text-gray-600 py-1 text-base">
                Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
              </p>
              <button className="border px-5 py-2.5 rounded-lg hover:bg-gray-200 duration-200 font-semibold text-gray-800 my-1">
                Nhận Huy Hiệu
              </button>
              <div className="mt-2 border-t py-2">
                <div className="font-semibold text-lg text-gray-800">
                  Đã xác nhận
                </div>
                <div className="mt-2">
                  <i className="fa-solid fa-check"></i>
                  <span className="ml-2 text-sm italic">Địa chỉ email</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-3/4 lg:w-3/5">
          <div className="px-10">
            <Formik
              enableReinitialize
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={handleChangeUserInfo}
            >
              {({ setFieldValue }) => (
                <Form className="grid gap-y-6">
                  {/* Name */}
                  <Field name="name">
                    {({ field, meta }) => (
                      <TextField
                        label="Họ tên"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>

                  {/* Birthday */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Ngày sinh
                    </label>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={userInfo.birthday || null}
                      className="w-full rounded-md border p-2"
                      onChange={(value) => setFieldValue("birthday", value)}
                    />
                    <ErrorMessage
                      name="birthday"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Email */}
                  <Field name="email">
                    {({ field, meta }) => (
                      <TextField
                        label="Email"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  {fieldErrors && (
                    <div className="text-red-600 text-sm">
                      (*) {fieldErrors}
                    </div>
                  )}

                  {/* Phone */}
                  <Field name="phone">
                    {({ field, meta }) => (
                      <TextField
                        label="Số điện thoại"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>

                  {/* Gender */}
                  <FormControl fullWidth>
                    <InputLabel>Giới tính</InputLabel>
                    <Field name="gender">
                      {({ field }) => (
                        <Select {...field} label="Giới tính">
                          <MenuItem value="true">Nam</MenuItem>
                          <MenuItem value="false">Nữ</MenuItem>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </FormControl>

                  {/* Submit */}
                  <div className="text-center mt-6">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="w-1/2 rounded-full !bg-red-500 hover:!bg-red-700"
                    >
                      CẬP NHẬT
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
