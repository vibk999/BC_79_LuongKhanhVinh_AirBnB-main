import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { roomService } from "../../../../services/Room";
import "./FeedBackRoom.scss";
import { formatDate } from "../../../../utils/formatDate";
import Rating from "react-rating-stars-component";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import TotalRating from "../TotalRating/TotalRating";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentSchema = Yup.object().shape({
  noiDung: Yup.string().required("Nội dung bình luận không được trống"),
  saoBinhLuan: Yup.number().required("Điểm đánh giá không được trống"),
});

export default function FeedbackRoom(props) {
  const userState = useSelector((state) => state.user);
  const [feedBackRoom, setFeedBackRoom] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [rating, setRating] = useState(0);
  const initialValues = {
    noiDung: "",
    saoBinhLuan: rating,
    ngayBinhLuan: moment().format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
    maPhong: props.feedBack.id,
    maNguoiBinhLuan: userState.userInfo ? userState.userInfo.user.id : "",
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const fecthFeedBack = async () => {
    if (props.feedBack.id) {
      const result = await roomService.fetchCommentRoomApi(props.feedBack.id);
      setFeedBackRoom(result.data.content);
    }
  };
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };
  const toggleCommentForm = () => {
    setIsCommenting(!isCommenting);
  };
  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-500" : "text-gray-400"}
      >
        ★
      </span>
    ));
  };

  const onSubmitComment = async (values, { resetForm }) => {
    const dataSubmit = { ...values, saoBinhLuan: rating };
    await roomService.sendCommentApi(dataSubmit);
    fecthFeedBack();
    resetForm();
    setIsCommenting(false);
    setRating(0);
  };
  const renderFeedBack = () => {
    if (showAllComments) {
      return feedBackRoom.map((element) => (
        <div
          key={element.id}
          className="mb-5 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div>
              <img
                src={element.avatar}
                className="w-12 h-12 rounded-full object-cover"
                alt="Avatar"
              />
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-lg text-gray-900">
                {element.tenNguoiBinhLuan}
              </h4>
              <span className="text-sm text-gray-500">
                {element.ngayBinhLuan}
              </span>
            </div>
          </div>
          <div className="text-gray-800 tracking-wider mt-4">
            <p>{element.noiDung}</p>
          </div>
          <div className="flex items-center">
            {renderStarRating(Number(element.saoBinhLuan))}
          </div>
        </div>
      ));
    } else {
      return feedBackRoom.slice(0, 4).map((element) => (
        <div
          key={element.id}
          className="mb-5 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div>
              <img
                src={element.avatar}
                className="w-12 h-12 rounded-full object-cover"
                alt="Avatar"
              />
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-lg text-gray-900">
                {element.tenNguoiBinhLuan}
              </h4>
              <span className="text-sm text-gray-500">
                {formatDate(element.ngayBinhLuan)}
              </span>
            </div>
          </div>
          <div className="text-gray-800 tracking-wider mt-4">
            <p className="font-bold text-sm text-gray-800">{element.noiDung}</p>
          </div>
          <div className="flex items-center">
            {renderStarRating(Number(element.saoBinhLuan))}
          </div>
        </div>
      ));
    }
  };

  useEffect(() => {
    fecthFeedBack();
  }, [props.feedBack.id]);

  return (
    <>
      <div>
        <h2 className="font-semibold text-gray-800 text-xl pb-4 flex items-center">
          <div className="flex items-center">
            <span className="text-rose-500">
              <AiFillStar />
            </span>
          </div>
          <div className="ml-2">Hiện có </div>
          <div className="ml-2">{feedBackRoom.length} đánh giá</div>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <TotalRating />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-4 sm:w-4/5 mt-5">
        {renderFeedBack()}
        <div className="sm:col-span-2 ">
          {feedBackRoom.length > 4 && (
            <button
              className="border border-solid border-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider uppercase mr-2"
              onClick={toggleShowAllComments}
            >
              {showAllComments ? "Ẩn bình luận" : "Hiển thị thêm bình luận"}
            </button>
          )}
          <button
            className="max-md:mt-2 border border-solid border-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider uppercase "
            onClick={toggleCommentForm}
          >
            Bình luận của bạn
          </button>
        </div>
      </div>
      {isCommenting && (
        <div className="mb-4 mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={CommentSchema}
            onSubmit={onSubmitComment}
          >
            <Form>
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Bình luận
              </label>
              <Field
                as="textarea"
                id="comment"
                name="noiDung"
                className="border border-solid border-gray-300 p-2 rounded-md w-full"
                placeholder="Nhập bình luận của bạn..."
              />
              <ErrorMessage
                name="noiDung"
                component="div"
                className="text-red-500"
              />
              <label
                htmlFor="saoBinhLuan"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Đánh giá (1-5 sao)
              </label>
              <Rating
                value={rating}
                count={5}
                onChange={handleRatingChange}
                size={100}
                color2={"#ffd700"} // Màu sao đã chọn
                half={false}
              />
              <ErrorMessage
                name="saoBinhLuan"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                className="mt-2 bg-rose-500 text-white rounded-md p-2 hover:bg-pink-600 transition duration-200 ease-in-out"
              >
                Gửi Bình luận
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
}
