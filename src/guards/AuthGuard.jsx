import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AuthGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/login");
      Swal.fire({
        title: "hãy đăng nhập rùi mới coi nha",
        icon: "warning",
      });
    }
  }, []);

  return <>{props.children}</>;
}
