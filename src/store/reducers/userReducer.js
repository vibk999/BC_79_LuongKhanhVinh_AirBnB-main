import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("USER_INFO");
const initialUser = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  userInfo: initialUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("USER_INFO", JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("USER_INFO");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
