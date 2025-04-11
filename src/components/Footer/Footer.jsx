import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, mt: 5, pt: 5, bgcolor: "grey.100" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={6} sm={4} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="semibold">
                Hỗ trợ
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="text.secondary" underline="hover">
                  Trung tâm trợ giúp
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  AirCover
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Thông tin an toàn
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Hỗ trợ người khuyết tật
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Các tùy chọn hủy
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Báo cáo lo ngại của hàng xóm
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="semibold">
                Cộng Đồng
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="text.secondary" underline="hover">
                  Cho thuê nhà trên Airbnb
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Diễn đàn cộng đồng
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Hỗ trợ dân tị nạn Afghanistan
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Chống phân biệt đối xử
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="semibold">
                Đón tiếp khách
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="text.secondary" underline="hover">
                  Thử đón tiếp khách
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  AirCover cho Chủ nhà
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Truy cập diễn đàn cộng đồng
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Đón tiếp khách có trách nhiệm
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="semibold">
                Airbnb
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="text.secondary" underline="hover">
                  Trang tin tức
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Tìm hiểu các tính năng mới
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Thư ngỏ từ các nhà sáng lập
                </Link>
                <Link href="/" color="text.secondary" underline="hover">
                  Nhà đầu tư
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Box
        sx={{
          bgcolor: "grey.50",
          py: 2,
          display: { xs: "none", md: "block" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "grey.500",
            }}
          >
            <Typography variant="body2">© 2023 Airbnb, Inc.</Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" sx={{ px: 1 }}>
                Quyền riêng tư
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ px: 1 }}>
                Điều khoản
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ px: 1 }}>
                Sơ đồ trang web
              </Link>
            </Box>
            <Box
              sx={{ color: "grey.700", display: "flex", alignItems: "center" }}
            >
              <LanguageIcon />
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ px: 1, fontWeight: "medium" }}
              >
                Tiếng Việt(VN)
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ px: 1, fontWeight: "medium" }}
              >
                <AttachMoneyIcon />
                VNĐ
              </Link>
              <Link href="#" color="inherit" sx={{ px: 0.5 }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ px: 0.5 }}>
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ px: 0.5 }}>
                <TwitterIcon />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
