import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserType } from "../enums/api";

export default function AdminGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!userState.userInfo) {
      notification.warning({
        message: "Bạn chưa đăng nhập",
        placement: "bottomLeft",
      });
      navigate("/login");
    } else if (userState.userInfo.user.role !== UserType.ADMIN) {
      notification.warning({
        message: "Bạn không có quyền truy cập",
        placement: "bottomLeft",
      });
      navigate("/");
    }
  }, []);

  return <>{props.children}</>;
}
