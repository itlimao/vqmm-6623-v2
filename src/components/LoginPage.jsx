import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import { setToken } from "../utils/auth";
import axios from "axios";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { username, password } = values;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:2352/api/admin/6623-reward/login",
        { username, password }
      );
      setToken(res.data.token);
      message.success("Đăng nhập thành công");
      navigate("/admin/codes");
    } catch (err) {
      if (err.response?.status === 401) {
        message.error("Sai tài khoản hoặc mật khẩu");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Đăng nhập Admin" style={{ width: 300 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="username"
            label="Tài khoản"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
