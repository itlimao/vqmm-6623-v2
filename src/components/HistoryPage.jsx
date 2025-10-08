import { useEffect, useState } from "react";
import { Table, Input, Space, message, Button } from "antd";
import axios from "axios";
import { getToken } from "../utils/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { createApiUrl, API_ENDPOINTS } from "../config/api";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(createApiUrl(API_ENDPOINTS.ADMIN_HISTORY), {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: search ? { account: search, code: search } : {},
      });
      setData(res.data);
    } catch (err) {
      message.error("Lỗi tải lịch sử");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleExportExcel = async () => {
    await fetchData();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "history.xlsx");
    message.success("Export data thành công");
  };

  const handleAction = async (code) => {
    try {
      await axios.post(
        createApiUrl(API_ENDPOINTS.ADMIN_REVERT_CODE),
        { code },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      message.success("Revert code thành công");
      fetchData();
    } catch (err) {
      message.error("Lỗi revert code");
      console.log(err);
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo tài khoản hoặc mã code"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
          allowClear
        />
        <Button onClick={handleExportExcel}>Export Excel</Button>
      </Space>
      <div style={{ minHeight: 650 }}>
        <Table
          rowKey={(r) => r.id || r.updatedAt}
          columns={[
            { title: "Tài khoản", dataIndex: "account" },
            { title: "Mã code", dataIndex: "code" },
            { title: "Điểm", dataIndex: "point" },
            {
              title: "Thời gian",
              dataIndex: "updatedAt",
              render: (date) => {
                if (!date) return "-";
                return new Date(date).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
            {
              title: "Hoạt động",
              dataIndex: "action",
              render: (_, record) =>
                record.point > 0 &&
                !record.account && (
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleAction(record.code)}
                    loading={loading}
                  >
                    Revert Code
                  </Button>
                ),
            },
          ]}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}
