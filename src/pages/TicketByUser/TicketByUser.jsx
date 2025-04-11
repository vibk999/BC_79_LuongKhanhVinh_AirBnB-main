import React, { useContext } from 'react'
import KitchenIcon from '@mui/icons-material/Kitchen';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { roomService } from '../../services/Room';
import { useSelector } from 'react-redux';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IronIcon from '@mui/icons-material/Iron';
import CountertopsIcon from '@mui/icons-material/Countertops';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import moment from 'moment';
import { LoadingContext } from '../../contexts/Loading/Loading';

export default function TicketByUser() {

  const stateUser = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [roomTicket, setRoomTicket] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);
  const [roomTicketDetail, setRoomTicketDetail] = useState([]);

  const fectchRoomTicket = async () => {
    if (stateUser.userInfo) {
      setLoadingState({ isLoading: true });
      const roomTicketData = await roomService.fetchRoomTicketApi(stateUser.userInfo.user.id);
      const roomTickets = roomTicketData.data.content;
      const roomDetails = [];
      for (const room of roomTickets) {
        const roomTicketDetail = await roomService.fetchRoomDetailApi(room.maPhong);
        roomDetails.push(roomTicketDetail.data.content);
      }
      setRoomTicket(roomTickets);
      setRoomTicketDetail(roomDetails);
      setLoadingState({ isLoading: false });
    } else {
      navigate("/login");
    }
  }
  const totalCost = roomTicket.reduce((acc, ticket, index) => {
    const ngayDen = moment(ticket.ngayDen);
    const ngayDi = moment(ticket.ngayDi);
    const numberOfDays = ngayDi.diff(ngayDen, 'days') + 1; // Số ngày thuê

    const roomCost = roomTicketDetail[index].giaTien * numberOfDays;
    return acc + roomCost;
  }, 0);

  useEffect(() => {
    fectchRoomTicket();
  }, [])

  console.log(roomTicket);
  console.log(roomTicketDetail);

  if (roomTicket.length === 0) {
    return (
      <div className='container mx-auto px-10 flex items-center justify-center h-screen'>
        <h1 className="text-2xl font-semibold border-b border-gray-300 text-center uppercase">
          Bạn chưa đặt phòng nào cả
        </h1>
      </div>
    );
  } else {
    return (
      <div className='container mx-auto px-10'>
        <div className="h-28"></div>
        <div>
          <h1 className="text-2xl font-semibold border-b border-gray-300">
            <span className="flex items-center">
              <MeetingRoomIcon className="mr-2 text-gray-500" />
              <span className="text-gray-700">Phòng Đã Đặt</span>
            </span>
          </h1>

          <div className='flex'>
            <div className='flex flex-col mt-4 md:pr-5 lg:w-2/3'>
              {roomTicket.map((ticket, index) => (
                <div key={ticket.id} className='border mb-4 rounded-lg hover:shadow-xl duration-200 flex cursor-pointer'>
                  <div className="w-1/4">
                    <img src={roomTicketDetail[index].hinhAnh} alt={roomTicketDetail[index].tenPhong} className="h-full w-full object-cover rounded-l-lg" />
                  </div>
                  <div className='w-3/4 px-4 py-2'>
                    <div className='flex justify-between items-center md:border-b pb-2'>
                      <div className="text-center md:text-left">
                        <h3 className="font-semibold text-xl md:text-xl uppercase">{roomTicketDetail[index].tenPhong}</h3>
                        <span className="text-gray-600 text-xs md:text-sm md:ml-2">
                          <span className="text-xs md:text-sm text-gray-500">
                            {moment(ticket.ngayDen).format('DD-MM-YYYY')}
                          </span>
                          <span className="mx-2">-</span>
                          <span className="text-xs md:text-sm text-gray-500">
                            {moment(ticket.ngayDi).format('DD-MM-YYYY')}
                          </span>
                        </span>

                      </div>
                      <div>
                        <span className="font-semibold text-sm md:text-xl">${roomTicketDetail[index].giaTien}
                          <span className="font-medium text-gray-600 text-xs md:text-sm">/ngày</span>
                        </span>
                      </div>
                    </div>
                    <div className='hidden md:block'>
                      <h3 className="font-semibold text-sm md:text-lg text-gray-800">Tiện ích</h3>
                      <div className='flex items-center'>
                        <div className='flex items-center'>
                          {roomTicketDetail[index].mayGiat && (
                            <div>
                              <KitchenIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].banLa && (
                            <div>
                              <IronIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].dieuHoa && (
                            <div>
                              <AcUnitIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].bep && (
                            <div>
                              <CountertopsIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].doXe && (
                            <div>
                              <DirectionsCarIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].tivi && (
                            <div>
                              <TvIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                          {roomTicketDetail[index].wifi && (
                            <div>
                              <WifiIcon className='inline text-gray-500 ml-2' />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='hidden md:block md:w-1/3'>
              <div className='w-full sticky top-32 border mt-4 rounded-lg shadow-lg p-4'>
                <h3 className="font-semibold text-2xl mb-3">Khám phá các địa điểm thú vị</h3>
                <p className="text-gray-600 text-base">Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo của bạn rồi</p>
                <NavLink className="inline-block w-auto my-4 border border-black font-semibold hover:bg-gray-200 duration-200 px-5 py-3 rounded-lg" to="/">Bắt đầu tìm kiếm</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
