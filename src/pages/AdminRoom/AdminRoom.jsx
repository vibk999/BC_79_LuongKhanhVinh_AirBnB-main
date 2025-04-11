import React, { Fragment, useEffect, useState } from "react";
import { Table } from "antd";
import { adminRoomService } from "../../services/AdminRoom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./AdminRoom.scss";
export default function AdminRoom() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imgRoom, setImgRoom] = useState([]);
  const [idRoom, setIdRoom] = useState("");
  const [fileImg, setFileImg] = useState({});
  const [stateRoom, setStateRoom] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    fetchAdminRoomApi();
  }, []);
  const fetchAdminRoomApi = async () => {
    const result = await adminRoomService.fetchAdminRoomApi();
    setStateRoom(result.data.content);
  };

  const data = stateRoom;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tên Phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      sorter: (a, b) => {
        let tenPhongA = a.tenPhong.toLowerCase().trim();
        let tenPhongB = b.tenPhong.toLowerCase().trim();
        if (tenPhongA > tenPhongB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === "tenPhong" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, room) => {
        return (
          <Fragment>
            <img src={room.hinhAnh} alt="..." width={200} height={200} />
          </Fragment>
        );
      },
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      render: (text, room) => {
        return (
          <Fragment>
            {room.moTa.length > 50
              ? room.moTa.substr(0, 50) + "...."
              : room.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, room) => {
        return (
          <Fragment>
            <button
              onClick={() => navigate(`/admin/editRoom/${room.id}`)}
              className="btnRoom-edit m-2 "
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <button
              onClick={() => handleDelete(room.id)}
              className="btnRoom-delete m-2"
            >
              <i className="fa-solid fa-trash" />
            </button>
            <button
              onClick={() => {
                openModal(room.id);
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
  const handleDelete = async (id) => {
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
        const result = await adminRoomService.fetchAdminDeleteApi(id);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Xóa Phòng thành công !",
        });
        if (result.data.statusCode === 200) {
          fetchAdminRoomApi();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.content}`,
      });
    }
  };
  const openModal = (id) => {
    setShowModal(!showModal);
    setIdRoom(id);
  };
  const handleUploadImg = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgRoom(event.target.result);
    };
    setFileImg(file);
  };
  const handleUpload = async () => {
    let formData = new FormData();
    formData.append("formFile", fileImg, fileImg.name);
    try {
      const result = await adminRoomService.fetchAdminUploadImgApi(
        idRoom,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật hình thành công !",
      });
      if (result.data.content) {
        fetchAdminRoomApi();
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
        <h1 className="title-admin">Admin Room</h1>
        <button onClick={() => navigate("/admin/addRoom")} className="btn-add">
          ADD ROOM
        </button>
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
                    onChange={handleUploadImg}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpload}
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
