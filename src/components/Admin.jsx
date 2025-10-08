import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  Link,
  useLocation,
  NavLink,
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { getToken, removeToken } from "../utils/auth";
import CodeListPage from "./CodeListPage";
import HistoryPage from "./HistoryPage";

const { Header, Content, Sider } = Layout;

export default function Admin() {
  const token = getToken();
  const navigate = useNavigate();
  const location = useLocation();

  if (!token) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    removeToken();
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        background: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 1200,
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <Header
          style={{
            background: "#fff",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            borderBottom: "1px solid #f0f0f0",
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>
            Admin Panel
          </h2>
          <div>
            <NavLink
              to="/admin/codes"
              className={({ isActive }) =>
                isActive ? "admin-tab active" : "admin-tab"
              }
            >
              Quản lý mã
            </NavLink>
            <NavLink
              to="/admin/history"
              className={({ isActive }) =>
                isActive ? "admin-tab active" : "admin-tab"
              }
            >
              Lịch sử nhập mã
            </NavLink>
            <Button danger style={{ marginLeft: 12 }} tabIndex={-1} onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            overflow: "auto",
            flex: 1, // chiếm phần còn lại
          }}
        >
          <Routes>
            <Route path="codes" element={<CodeListPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="codes" replace />} />
          </Routes>
          <Outlet />
        </Content>
      </div>
    </div>
  );
}
