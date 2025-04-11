import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CarouselSearch.scss";

import { Navigation } from "swiper/modules";
import { NavLink } from "react-router-dom";

const image1 = [
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/bãi biển.jpg",
    name: "Bãi biển",
  },
  {
    url: "./images/cabin.jpg",
    name: "Cabin",
  },
  {
    url: "./images/Chơi golf.jpg",
    name: "Chơi golf",
  },
  {
    url: "./images/công viên quốc gia.jpg",
    name: "Công viên quốc gia",
  },
  {
    url: "./images/Đảo.jpg",
    name: "Đảo",
  },
  {
    url: "./images/hang động.jpg",
    name: "Hang động",
  },
  {
    url: "./images/hồ bơi tuyệt vời.jpg",
    name: "Hồ bơi tuyệt vời",
  },
  {
    url: "./images/khung cảnh tuyệt vời.jpg",
    name: "Khung cảnh tuyệt vời",
  },
  {
    url: "./images/lướt sóng.jpg",
    name: "Lướt sóng",
  },
  {
    url: "./images/nhà chung.jpg",
    name: "Nhà chung",
  },
  {
    url: "./images/nhà dưới lòng đất.jpg",
    name: "Nhà dưới lòng đất",
  },
  {
    url: "./images/nhà nhỏ.jpg",
    name: "Nhà nhỏ",
  },
  {
    url: "./images/nhiệt đới.jpg",
    name: "Nhiệt đới",
  },
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/Phục vụ bữa sáng.jpg",
    name: "Phục vụ bữa sáng",
  },
  {
    url: "./images/thật ấn tượng.jpg",
    name: "Thật ấn tượng",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/ven hồ.jpg",
    name: "Ven hồ",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/bietthu.jpg",
    name: "Biệt thự",
  },
  {
    url: "./images/khucamtrai.jpg",
    name: "Khu cắm trại",
  },
  {
    url: "./images/nhakhungchua.jpg",
    name: "Nhà khung chữ A",
  },
  {
    url: "./images/laudai.jpg",
    name: "Lâu đài",
  },
];
export default function CarouselSearch() {
  return (
    <div className="flex item-swiper">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        slidesPerView={8}
        spaceBetween={10}
        className="mySwiper"
        modules={[Navigation]}
        navigation={true}
      >
        {image1.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <NavLink to={"/"} key={index} className="font-medium ">
                <span className="flex flex-col items-center slick-item slick-item-img ">
                  <img src={item.url} alt={item.name} className="w-6 " />
                  <span className="text-xs hover:text-black ">{item.name}</span>
                </span>
              </NavLink>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className=" flex items-center ml-2 ">
        <Button
          className="flex items-center button-filter border rounded-md text-base "
          sx={{
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            fontSize: "1rem",
            padding: "6px 12px",
            "&:hover": {
              borderColor: "#40a9ff",
            },
          }}
        >
          <TuneIcon fontSize="small" className="mr-2" />
          <span className="filter">Bộ lọc</span>
        </Button>
      </div>
    </div>
  );
}
