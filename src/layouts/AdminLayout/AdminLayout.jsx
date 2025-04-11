import React from "react";
import Siderbar from "../../components/Siderbar/Siderbar";
import { Outlet } from "react-router-dom";

import "./AdminLayout.scss";
export default function AdminLayout() {
  return (
    <div className="container-admin">
      <Siderbar />
      <Outlet />
    </div> 
  );
}
