import React, { useEffect, useState } from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AiFillStar } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import KingBedIcon from "@mui/icons-material/KingBed";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";
import IronIcon from "@mui/icons-material/Iron";
import CountertopsIcon from "@mui/icons-material/Countertops";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import WavesIcon from "@mui/icons-material/Waves";
import PersonIcon from "@mui/icons-material/Person";
import airCover from "../../assets/img/AirCover.png";
import "./RoomDetails.scss";
import { useParams } from "react-router-dom";
import { roomService } from "../../services/Room";
import FeedbackRoom from "./components/FeedbackRoom/FeedbackRoom";
import BookingRoom from "./components/FeedbackRoom/BookingRoom/BookingRoom";
import { useDispatch } from "react-redux";
import { setRoomInfo } from "../../store/reducers/roomReducer";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/Loading/Loading";

export default function RoomDetails() {
  const param = useParams();
  const [_, setLoadingState] = useContext(LoadingContext);
  const dispatch = useDispatch();
  const [feedBackRoom, setFeedBackRoom] = useState([]);
  const [roomDetail, setRoomDetail] = useState({});
  const [roomDetailLocation, setRoomDetailLocation] = useState({});
  const [description, setDesCription] = useState([]);
  const regex = /[\r\n]+/;
  const fecthFeedBack = async () => {
    const result = await roomService.fetchCommentRoomApi(param.roomId);
    setFeedBackRoom(result.data.content);
  };
  const fetchRoomDetail = async () => {
    setLoadingState({ isLoading: true });
    const roomDetailResult = await roomService.fetchRoomDetailApi(param.roomId);
    const maViTri = roomDetailResult.data.content.maViTri;
    if (maViTri > 0) {
      const roomLocationResult = await roomService.fetchRoomLocationDetailApi(
        maViTri
      );
      setRoomDetail(roomDetailResult.data.content);
      dispatch(setRoomInfo(roomDetailResult.data.content));
      setRoomDetailLocation(roomLocationResult.data.content);
    } else {
      setRoomDetail(roomDetailResult.data.content);
      dispatch(setRoomInfo(roomDetailResult.data.content));
    }
    const motaArray = roomDetailResult.data.content.moTa.split(regex);
    setDesCription(motaArray);
    setLoadingState({ isLoading: false });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRoomDetail();
    fecthFeedBack();
  }, []);

  return (
    <div>
      <div>
        <div className="h-28"></div>
        <div className="container mx-auto px-20 room-details">
          <div>
            <p className="mb-2">
              <button className="mr-3">
                {" "}
                <GTranslateIcon />
              </button>
              <span className="font-semibold text-xl sm:text-3xl tracking-widest leading-relaxed text-gray-900">
                {roomDetail.tenPhong}
              </span>
            </p>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center">
                <span className="flex items-center text-sm font-normal tracking-widest">
                  {" "}
                  <span className="text-rose-500 mr-1">
                    <AiFillStar />
                  </span>
                  4
                </span>
                <span className="underline text-sm font-normal tracking-widest mx-2">
                  {feedBackRoom.length} đánh giá
                </span>
                <span className="text-sm font-normal tracking-widest mx-2 flex items-center">
                  {" "}
                  <span className="text-rose-500 mr-1">
                    <FaAward />
                  </span>{" "}
                  Chủ nhà siêu cấp .
                </span>
                <span className="underline text-sm font-normal tracking-widest mx-2">
                  <span className="mr-2">{roomDetailLocation?.tenViTri} </span>
                  <span className="mr-2">{roomDetailLocation?.tinhThanh} </span>
                  <span>{roomDetailLocation?.quocGia}</span>
                </span>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                <button className="px-2 py-1 hover:bg-gray-100 rounded-md transition-all duration-150 flex justify-center items-center font-semibold text-sm text-gray-700">
                  <ShareIcon />
                  <span className="ml-2">Chia sẻ</span>
                </button>
                <button className="px-2 py-1 rounded-md transition-all duration-150 flex justify-center items-center font-semibold text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-500">
                  <FavoriteBorderIcon />
                  <span className="ml-2">Yêu thích</span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-5">
            <div className="rounded-xl overflow-hidden">
              <img
                style={{ imageRendering: "pixelated" }}
                className="w-full object-contain rounded-l-xl overflow-hidden"
                src={roomDetail.hinhAnh}
                alt=".."
              />
            </div>
          </div>
          <div className="w-full flex sm:flex-row flex-col mt-10 border-b pb-5">
            <div className="w-full sm:w-1/2 lg:w-3/5">
              <div className="flex flex-wrap justify-between items-center pb-5 border-b">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <span className="text-gray-800">{description[0]},</span>
                    <span className="text-gray-800 ml-2">{description[2]}</span>
                  </h2>

                  <div className="flex flex-wrap items-center">
                    <span className="font-semibold text-gray-600 mr-2 ">
                      Sức chứa:
                    </span>
                    {roomDetail?.khach > 0 && roomDetail?.khach <= 8 && (
                      <span className="flex mr-2 border-r pr-2">
                        {[...Array(roomDetail.khach)].map((_, index) => (
                          <PersonIcon
                            fontSize="small"
                            key={index}
                            className="inline text-gray-500"
                          />
                        ))}
                      </span>
                    )}
                    <span className="font-semibold text-gray-600 mr-2 ">
                      Giường:
                    </span>
                    {roomDetail?.giuong > 0 && roomDetail?.giuong <= 8 && (
                      <span className="flex mr-2 border-r pr-2">
                        {[...Array(roomDetail.giuong)].map((_, index) => (
                          <KingBedIcon
                            fontSize="small"
                            key={index}
                            className="inline text-gray-500"
                          />
                        ))}
                      </span>
                    )}
                    <span className="font-semibold text-gray-600 mr-2 ">
                      Phòng tắm:
                    </span>
                    {roomDetail?.phongTam > 0 && roomDetail?.phongTam <= 8 && (
                      <span className="flex mr-2 border-r pr-2">
                        {[...Array(roomDetail.phongTam)].map((_, index) => (
                          <ShowerIcon
                            fontSize="small"
                            key={index}
                            className="inline text-gray-500"
                          />
                        ))}
                      </span>
                    )}
                    <div className="w-12 h-12 relative ml-auto">
                      <span className="text-gray-500">
                        {" "}
                        <PersonPinIcon fontSize="large" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pb-5 border-b">
                <div className="flex w-full ">
                  <div className="pt-2">
                    <span className="text-gray-500 icon-Home">
                      <MapsHomeWorkIcon />
                    </span>
                  </div>
                  <div className="ml-4">
                    {description[2] ? (
                      <>
                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                          {description[2]}
                        </h3>
                        <p className="tracking-wider text-gray-500">
                          {description[3]}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                          Chủ nhà siêu cấp
                        </h3>
                        <p className="tracking-wider text-gray-500">
                          Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được
                          đánh giá cao và là những người cam kết mang lại quãng
                          thời gian ở tuyệt vời cho khách.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex mt-5">
                  {description[4] && (
                    <div className="pt-2">
                      <span className="text-gray-500">
                        <LocationOnIcon />
                      </span>
                    </div>
                  )}
                  <div className={description[4] ? "ml-4" : ""}>
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                      {description[4]}
                    </h3>
                    <p className="tracking-wider text-gray-500">
                      {description[5]}
                    </p>
                  </div>
                </div>
                <div className="flex mt-5 items-center">
                  <div className="pt-2">
                    <span className="text-gray-500">
                      <EditCalendarIcon />
                    </span>
                  </div>
                  <h3 className="ml-4 font-semibold text-gray-800  text-base sm:text-lg">
                    Miễn phí hủy trong 48 giờ.
                  </h3>
                </div>
              </div>
              <div className="mt-5 pb-5 border-b">
                <h2>
                  <img className="h-7 mb-4" src={airCover} alt="..." />
                </h2>
                <p className="text-base tracking-wider text-gray-800 mb-2">
                  Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ
                  nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những
                  vấn đề khác như sự cố trong quá trình nhận phòng.
                </p>
                <button className="font-semibold underline text-base text-gray-800 tracking-wider">
                  Tìm hiểu thêm
                </button>
              </div>
              <div className="mt-5 pb-5">
                <div>
                  <h2 className="font-semibold text-gray-800 text-xl pb-4">
                    Nơi này có những gì cho bạn
                  </h2>
                </div>
                <div className="grid grid-cols-2">
                  {roomDetail.dieuHoa && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <AcUnitIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Điều Hòa
                      </div>
                    </div>
                  )}

                  {roomDetail.banUi && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <IronIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Bàn ủi
                      </div>
                    </div>
                  )}

                  {roomDetail.bep && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <CountertopsIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Bếp
                      </div>
                    </div>
                  )}
                  {roomDetail.doXe && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <DirectionsCarIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Đỗ xe
                      </div>
                    </div>
                  )}
                  {roomDetail.hoBoi && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <WavesIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Hồ bơi
                      </div>
                    </div>
                  )}
                  {roomDetail.tivi && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <TvIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        TV
                      </div>
                    </div>
                  )}
                  {roomDetail.wifi && (
                    <div className="flex items-center pb-4">
                      <div>
                        <span className="icon-kitchen">
                          <WifiIcon className="inline text-gray-500 ml-2" />
                        </span>
                      </div>
                      <div className="ml-4 text-base tracking-wider text-gray-800">
                        Wifi
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <button className="btn-convenient border border-gray-900 hover:bg-gray-100 duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider uppercase">
                    Hiển thị tất cả tiện nghi
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/5">
              <div className="sticky top-28">
                <div className="bg-white shadow-xl border rounded-xl p-6 w-full lg:w-5/6 mx-auto">
                  <div className="relative w-full">
                    <div className="hidden md:flex justify-between items-center mb-4">
                      <div>
                        <span>$ </span>
                        <span className="text-xl font-semibold">
                          {roomDetail.giaTien}
                        </span>
                        <span className="text-base">/đêm</span>
                      </div>
                      <div>
                        <span className="text-sm font-normal mr-1">
                          <i className="fa fa-star text-rose-500"></i> 4.
                        </span>
                        <span className="underline text-sm font-normal tracking-widest mx-1">
                          {feedBackRoom.length} đánh giá
                        </span>
                      </div>
                    </div>
                    <div>
                      <BookingRoom />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pb-5 border-b">
            <FeedbackRoom feedBack={roomDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
