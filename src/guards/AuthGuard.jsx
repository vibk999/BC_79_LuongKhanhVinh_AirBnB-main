import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/login");
      notification.warning({
        message: "Vui lòng đăng nhập để xem chi tiết",
        placement: "topRight",
      });
    }
  }, []);

  return <>{props.children}</>;
}
