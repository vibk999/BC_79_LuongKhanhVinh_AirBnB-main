import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/store/reducers/userReducer.js";
import roomReducer from "../src/store/reducers/roomReducer.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
