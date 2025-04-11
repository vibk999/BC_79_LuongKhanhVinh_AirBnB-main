import React, { useEffect, useState } from 'react'
import userUpload from "../../../assets/img/user_upload.png";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import "./ImagePersonal.scss"
import { userService } from '../../../services/UserBooking';
import { useSelector } from 'react-redux';


export default function ImagePersonal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const stateUser = useSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState();
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
  };

  const getUserInfo = async () => {
    const result = await userService.userInfoApi(stateUser.userInfo.user.id);
    setAvatar(result.data.content.avatar)
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  const uploadImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('formFile', selectedFile);
      try {
        await userService.uploadAvatarApi(formData);
        closeModal();
        getUserInfo();
      } catch (error) {
        console.error('Error while uploading image', error);
      }
    }
  };
  return (
    <div>
      {avatar ? (
        <img
          className="mx-auto rounded-full personal-img"
          src={avatar}
          alt="Avatar from API"
        />
      ) : (
        <img
          className="mx-auto rounded-full personal-img"
          src={userUpload}
          alt="User Uploaded Avatar"
        />
      )}
      <button onClick={openModal} className="text-center text-sm text-gray-600 underline hover:text-black duration-150 block mx-auto">
        Cập nhật ảnh
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <div className="flex  justify-between mb-5 border-b mb-3">
              <h2 className="text-gray-800 font-semibold text-lg pb-2">Cập nhật ảnh</h2>
              <span className="modal-close text-gray-500 cursor-pointer hover:text-red-500" onClick={closeModal}>
                <CancelIcon />
              </span>
            </div>
            <label className="relative mt-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="bg-white border border-gray-300 rounded-md p-2 w-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
                {selectedFile ? <FileUploadIcon /> : <AddCircleIcon />}

                <span className="ml-1 text-gray-600">
                  {selectedFile ? selectedFile.name : 'Chọn tệp ảnh'}
                </span>
              </div>
            </label>
            <button onClick={uploadImage} className="border-t mt-5 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-md float-right">
              Cập nhật
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
