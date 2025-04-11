import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userService } from "../../services/UserBooking";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/reducers/userReducer";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("(*) Email không hợp lệ")
      .required("(*) Vui lòng nhập email"),
    password: Yup.string().required("(*) Vui lòng nhập mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await userService.loginApi(values);
        dispatch(setUserInfo(result.data.content));
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Bạn đã đăng nhập thành công",
        });
        localStorage.setItem("USER_INFO", JSON.stringify(result.data.content));
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `${error.response?.data?.content || "Đăng nhập thất bại"}`,
          text: "Vui lòng kiểm tra lại thông tin",
        });
      }
      resetForm();
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 5, width: "100%", borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng Nhập
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={formik.isSubmitting}
          >
            Đăng Nhập
          </Button>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Bạn chưa có tài khoản?{" "}
              <NavLink to="/register" style={{ color: "#1976d2" }}>
                Đăng ký
              </NavLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
