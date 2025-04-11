import { createSlice } from "@reduxjs/toolkit";

// Lấy dữ liệu room từ localStorage (nếu có)
const savedRoom = localStorage.getItem("ROOM_INFO");
const initialRoom = savedRoom ? JSON.parse(savedRoom) : "";

const initialState = {
  roomInfo: initialRoom,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
      localStorage.setItem("ROOM_INFO", JSON.stringify(action.payload)); // lưu lại vào localStorage
    },
  },
});
export const { setRoomInfo } = roomSlice.actions;
export default roomSlice.reducer;
