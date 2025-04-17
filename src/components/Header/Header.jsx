import React, { useEffect, useState } from "react";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import HeaderProfile from "./components/HeaderProfile";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { roomService } from "../../services/Room";

export default function Header() {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [roomLocation, setRoomLocation] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const fetchRoomByLocaiton = async () => {
    const result = await roomService.fetchRoomByLocationApi();
    setRoomLocation(result.data.content);
  };
  const handleLocationChange = (_, value) => {
    if (value) {
      setSelectedLocationId(value.id);
    } else {
      setSelectedLocationId(null);
    }
  };
  useEffect(() => {
    fetchRoomByLocaiton();
  }, []);

  const handleSearchClick = () => {
    if (selectedLocationId && userState) {
      navigate(`/room-by-city/${selectedLocationId}`);
      setShowLocationDropdown(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 border-b w-full bg-white z-20">
      <div className="container mx-auto px-2 sm:px-10 py-5 max-sm:py-10 flex  justify-between items-center">
        <NavLink
          to="/"
          className="hidden sm:flex flex-wrap items-center text-rose-500 z-20 active header-search"
          style={{ flex: "1 1 25%" }}
        >
          <div className="hidden md:block">
            <svg
              width={102}
              height={32}
              fill="green"
              style={{ display: "block" }}
            >
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z" />
            </svg>
          </div>
          <div className="block md:hidden">
            <svg width={30} height={32} fill="pink" className="block">
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z" />
            </svg>
          </div>
        </NavLink>
        <div
          className="flex flex-wrap justify-center items-center relative z-20 "
          style={{ flex: "1 1 45%" }}
        >
          <div
            className={`flex flex-wrap justify-center items-center 
          ${showLocationDropdown ? "" : "hidden"}`}
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <Link href="/" className="mx-2 active">
              Chỗ ở
            </Link>
            <Link href="/" className="mx-2 active">
              Trải nghiệm
            </Link>
            <Link href="/" className="mx-2">
              Trải nghiệm trực tuyến
            </Link>
          </div>
          <div
            className={`absolute flex flex-wrap px-3 py-1.5 rounded-full shadow-lg border bg-white justify-center items-center cursor-pointer z-20 ${
              showLocationDropdown ? "hidden" : ""
            } `}
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <div className="font-medium border-r pr-2">Địa điểm bất kỳ</div>
            <div className="font-medium border-r pr-2 pl-2">Tuần bất kỳ</div>
            <div className="font-normal pr-2 pl-2">Thêm khách</div>
            <div className="inline-flex w-8 h-8 justify-center items-center bg-rose-500 rounded-full text-white">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  fill: "none",
                  height: 12,
                  width: 12,
                  stroke: "currentcolor",
                  strokeWidth: "5.33333",
                  overflow: "visible",
                }}
              >
                <g fill="none">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                </g>
                <g fill="none">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div
          className={`top-0 left-0 w-screen bg-white transition-all  absolute  duration-300 pb-3 z-10  shadow-lg ${
            showLocationDropdown
              ? "transition-slide-down active"
              : "transition-slide-down"
          }`}
          style={{ paddingTop: "4.4rem" }}
        >
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex  items-center relative  transition-all duration-300 h-16 rounded-full border search-location">
              <div className="hover:bg-gray-300 overflow-hidden rounded-full h-full flex flex-wrap justify-center items-center">
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: 300 }}
                  options={roomLocation}
                  autoHighlight
                  getOptionLabel={(option) => option.tenViTri}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                      key={option.id}
                    >
                      <img
                        loading="lazy"
                        width="40"
                        src={option.hinhAnh}
                        alt="..."
                      />
                      {option.tenViTri}, {option.tinhThanh}, {option.quocGia}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Địa Điểm"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                  onChange={handleLocationChange}
                />
              </div>
              <div className="hidden md:block py-2 px-5 hover:bg-gray-300  h-full">
                <label
                  htmlFor="checkInDate"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nhận phòng
                </label>
                <input
                  name="checkIn"
                  type="date"
                  id="checkInDate"
                  className="bg-transparent outline-none"
                  placeholder="Thêm ngày"
                />
              </div>
              <div className="hidden md:block py-2 px-5 hover:bg-gray-300  h-full">
                <label
                  htmlFor="checkOutDate"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Trả phòng
                </label>
                <input
                  name="checkOut"
                  type="date"
                  id="checkOutDate"
                  className="bg-transparent outline-none"
                  placeholder="Thêm ngày"
                />
              </div>
              <div className="hidden md:block py-2 pl-7 pr-5 hover:bg-gray-300 rounded-full h-full">
                <label
                  htmlFor="guest"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Khách
                </label>
                <input
                  name="guest"
                  type="number"
                  id="guest"
                  className="bg-transparent outline-none"
                  placeholder="Thêm khách"
                />
              </div>
              <button
                onClick={handleSearchClick}
                className="text-white bg-blue-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 absolute right-0"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <div
          className="hidden sm:block flex-initial col-end-6 z-20"
          style={{ flex: "1 1 25%" }}
        >
          <div className="relative flex items-center justify-end">
            <div className="mr-4 flex items-center z-10">
              <a
                className="inline-block rounded-full py-2 px-3 hover:bg-gray-200"
                href=""
              >
                <div className="hidden relative lg:flex cursor-pointer items-center whitespace-nowrap">
                  Trở thành chủ nhà
                </div>
              </a>
              <div className="hidden relative lg:block">
                <button className="relative inline-block rounded-full py-2 px-3 hover:bg-gray-200">
                  <div className="flex h-5 items-center">
                    <LanguageIcon />
                  </div>
                </button>
              </div>
              <HeaderProfile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
