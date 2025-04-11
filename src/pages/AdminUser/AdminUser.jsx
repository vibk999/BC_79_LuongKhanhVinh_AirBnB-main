import React, { Fragment, useEffect, useState } from "react";
import { adminUsersService } from "../../services/AdminUser";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

import "./AdminUser.scss";
import Swal from "sweetalert2";

export default function AdminUser() {
  const navigate = useNavigate();
  const { Search } = Input;
  const [userState, setUserState] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [imgUser, setImgUser] = useState([]);
  const [imgFile, setImgFile] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = (id) => {
    setShowModal(!showModal);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        let nameA = a.name.toLowerCase().trim();
        let nameB = b.name.toLowerCase().trim();
        if (nameA > nameB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => {
        let roleA = a.role.toLowerCase().trim();
        let roleB = b.role.toLowerCase().trim();
        if (roleA > roleB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, user) => {
        return (
          <Fragment>
            <button
              onClick={() => navigate(`/admin/editUser/${user.id}`)}
              className="btnUser-edit m-2 "
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <button
              onClick={() => fetchAdminDelete(user.id)}
              className="btnUser-delete m-2"
            >
              <i className="fa-solid fa-trash" />
            </button>
            <button
              onClick={() => {
                openModal(user.id);
              }}
              className="m-2 btnRoom-Img"
            >
              <i className="fa-regular fa-image" />
            </button>
          </Fragment>
        );
      },
    },
  ];
  const data = userState;

  useEffect(() => {
    fetchAdminUserApi();
  }, []);

  const fetchAdminUserApi = async () => {
    const result = await adminUsersService.fetchAdminUserApi();
    setUserState(result.data.content);
  };
  const fetchAdminDelete = async (id) => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmationResult.isConfirmed) {
        const result = await adminUsersService.fetchAdminDeleteApi(id);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Xóa User thành công !",
        });
        fetchAdminUserApi();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };

  const onSearch = async (value, _e) => {
    if (value) {
      const result = await adminUsersService.fetchAdminSearchApi(value);
      setUserState(result.data.content);
    } else {
      fetchAdminUserApi();
    }
  };

  const handlSearch = async (event) => {
    if (event.target.value) {
      const result = await adminUsersService.fetchAdminSearchApi(
        event.target.value
      );
      setUserState(result.data.content);
    } else {
      fetchAdminUserApi();
    }
  };
  const handleUploadImgUser = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgUser(event.target.result);
    };
    setImgFile(file);
  };
  const handleUploadUser = async () => {
    let formData = new FormData();
    formData.append("formFile", imgFile, imgFile.name);
    try {
      const result = await adminUsersService.fetchAdminImgApi(formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật hình thành công !",
      });
      if (result.data.content) {
        fetchAdminUserApi();
        setShowModal(!showModal);
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
    <div className="container m-5 mx-auto adminUser-main">
      <div className="title-adminUser m-5">
        <h1 className="title-admin">User Admin</h1>
        <button onClick={() => navigate("/admin/addUser")} className="btn-add">
          ADD USER
        </button>
        <Search
          onChange={handlSearch}
          placeholder="Tìm kiếm theo tên ..."
          allowClear
          size="large"
          onSearch={onSearch}
        />
      </div>

      <hr />
      <Table
        rowKey={(record) => record.id}
        className="table-AddminUser"
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Thêm hình</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    name="hinhAnh"
                    type="File"
                    onChange={handleUploadImgUser}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUploadUser}
                  >
                    Lưu ảnh
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
