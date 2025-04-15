import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { pink } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../store/reducers/userReducer";
import { IconButton, Menu, MenuItem, ListItemText } from "@mui/material";

export default function HeaderProfile() {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfo(null));
    navigate("/");
    handleMenuClose();
  };

  const renderButtonLogin = () => {
    if (!userState.userInfo) {
      return [
        <MenuItem key="register" onClick={handleMenuClose}>
          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: pink[500],
              fontWeight: "semibold",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Đăng Ký
          </NavLink>
        </MenuItem>,
        <MenuItem key="login" onClick={handleMenuClose}>
          <NavLink
            to="/login"
            style={{
              textDecoration: "none",
              color: pink[500],
              fontWeight: "semibold",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Đăng Nhập
          </NavLink>
        </MenuItem>,

        <MenuItem key="host" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Cho thuê nhà
          </a>
        </MenuItem>,
        <MenuItem key="experience" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Tổ chức trải nghiệm
          </a>
        </MenuItem>,
        <MenuItem key="help" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Trợ giúp
          </a>
        </MenuItem>,
      ];
    } else {
      return [
        <MenuItem key="trips" onClick={handleMenuClose}>
          <NavLink
            to="/ticket-by-user"
            style={{
              textDecoration: "none",
              color: pink[500],
              fontWeight: "semibold",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Chuyến đi
          </NavLink>
        </MenuItem>,
        <MenuItem key="profile" onClick={handleMenuClose}>
          <NavLink
            to="/personal-info"
            style={{
              textDecoration: "none",
              color: pink[500],
              fontWeight: "semibold",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Thông tin cá nhân
          </NavLink>
        </MenuItem>,
        <MenuItem key="admin" onClick={handleMenuClose}>
          <NavLink
            to={"/admin"}
            style={{
              textDecoration: "none",
              color: pink[500],
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Vào trang admin
          </NavLink>
        </MenuItem>,
        <MenuItem key="host" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Cho thuê nhà
          </a>
        </MenuItem>,
        <MenuItem key="experience" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Tổ chức trải nghiệm
          </a>
        </MenuItem>,
        <MenuItem key="help" onClick={handleMenuClose}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "8px 16px",
            }}
            activeClassName="bg-gray-100"
          >
            Trợ giúp
          </a>
        </MenuItem>,
        <MenuItem key="logout" onClick={handleLogout}>
          <ListItemText
            primaryTypographyProps={{
              style: { color: pink[500], fontWeight: "semibold" },
            }}
          >
            Đăng xuất
          </ListItemText>
        </MenuItem>,
      ];
    }
  };

  return (
    <div>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          borderRadius: "full",
          bgcolor: "white",
          p: 1,
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            bgcolor: "grey.50",
          },
        }}
      >
        <DehazeIcon />
        <AccountCircleIcon
          sx={{ color: pink[500], ml: 1 }}
          aria-hidden="true"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {renderButtonLogin()}
      </Menu>
    </div>
  );
}
