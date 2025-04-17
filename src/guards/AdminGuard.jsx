import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserType } from "../enums/api";
import Swal from "sweetalert2";

export default function AdminGuard(props) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userInfo) {
      Swal.fire({
        title: "Bạn chưa đăng nhập",
        icon: "warning",
      });
      navigate("/login");
    } else if (userInfo.user.role !== UserType.ADMIN) {
      Swal.fire({
        title: "Bạn không có quyền truy cập",
        icon: "warning",
      });
      navigate("/");
    }
  }, []);

  return <>{props.children}</>;
}
