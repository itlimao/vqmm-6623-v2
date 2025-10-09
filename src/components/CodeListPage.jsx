import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  InputNumber,
} from "antd";
import { getToken } from "../utils/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { createApiUrl, API_ENDPOINTS } from "../config/api";

export default function CodeListPage() {
  const [data, setData] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rewardValue = Form.useWatch("reward", form);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) {
        if (!isNaN(search) && search.trim() !== "") {
          params.point = parseInt(search);
        } else {
          params.code = search;
        }
      }

      const res = await axios.get(createApiUrl(API_ENDPOINTS.ADMIN_CODES), {
        headers: { Authorization: `Bearer ${getToken()}` },
        params,
      });
      setData(res.data);
    } catch {
      message.error("Lỗi khi tải danh sách mã");
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const res = await axios.get(createApiUrl(API_ENDPOINTS.ADMIN_REWARDS), {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRewards(res.data);
    } catch {
      message.error("Không tải được danh sách phần thưởng");
    }
  };

  useEffect(() => {
    fetchData();
    fetchRewards();
  }, [search]);

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `GK88-REWARD-${random}`;
  };

  const handleSubmit = async ({ quantity, point, reward }) => {
    try {
      const payload = Array.from({ length: quantity }, () => ({
        code: generateCode(),
        point: reward === "code" ? point : 0,
        reward,
      }));

      await Promise.all(
        payload.map((item) =>
          axios.post(createApiUrl(API_ENDPOINTS.ADMIN_CODES), item, {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
        )
      );

      message.success("Đã tạo mã thành công");
      setOpen(false);
      form.resetFields();
      fetchData();
    } catch {
      message.error("Lỗi khi tạo mã");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(createApiUrl(`${API_ENDPOINTS.ADMIN_CODES}/${id}`), {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      message.success("Đã xoá");
      fetchData();
    } catch {
      message.error("Lỗi khi xoá");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một mã để xoá");
      return;
    }

    try {
      await Promise.all(
        selectedRowKeys.map((id) =>
          axios.delete(createApiUrl(`${API_ENDPOINTS.ADMIN_CODES}/${id}`), {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
        )
      );
      message.success(`Đã xoá ${selectedRowKeys.length} mã thành công`);
      setSelectedRowKeys([]);
      fetchData();
    } catch {
      message.error("Lỗi khi xoá hàng loạt");
    }
  };

  const handleCopy = async () => {
    await fetchData();
    const codesToCopy =
      selectedRowKeys.length > 0
        ? data.filter((item) => selectedRowKeys.includes(item.id))
        : data.filter((item) => !item.used);

    if (codesToCopy.length === 0) {
      message.warning(
        selectedRowKeys.length > 0
          ? "Không có mã nào được chọn"
          : "Không có mã nào chưa sử dụng"
      );
      return;
    }

    const text = codesToCopy
      .map((item) => item.code + "\t" + item.reward + "\t" + item.point)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      message.success(
        selectedRowKeys.length > 0
          ? `Đã copy ${codesToCopy.length} mã đã chọn`
          : "Đã copy tất cả code chưa dùng"
      );
    } catch {
      message.error("Không thể copy vào clipboard");
    }
  };

  const handleExportExcel = async () => {
    await fetchData();
    const codesToExport =
      selectedRowKeys.length > 0
        ? data.filter((item) => selectedRowKeys.includes(item.id))
        : data;

    if (codesToExport.length === 0) {
      message.warning(
        selectedRowKeys.length > 0
          ? "Không có mã nào được chọn"
          : "Không có dữ liệu để export"
      );
      return;
    }

    const ws = XLSX.utils.json_to_sheet(codesToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      selectedRowKeys.length > 0 ? "Selected Codes" : "Codes"
    );
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(
      blob,
      selectedRowKeys.length > 0 ? "selected_codes.xlsx" : "codes.xlsx"
    );
    message.success(
      selectedRowKeys.length > 0
        ? `Export ${codesToExport.length} mã đã chọn thành công`
        : "Export data thành công"
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm mã code hoặc số điểm"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
          allowClear
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Tạo code
        </Button>
        <Button onClick={handleCopy}>
          {selectedRowKeys.length > 0
            ? `Copy đã chọn (${selectedRowKeys.length})`
            : "Copy code chưa dùng"}
        </Button>
        <Button onClick={handleExportExcel}>
          {selectedRowKeys.length > 0
            ? `Export đã chọn (${selectedRowKeys.length})`
            : "Export Excel"}
        </Button>
        {selectedRowKeys.length > 0 && (
          <Popconfirm
            title="Xác nhận xoá"
            description={`Bạn có chắc muốn xoá ${selectedRowKeys.length} mã đã chọn?`}
            onConfirm={handleBulkDelete}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá đã chọn ({selectedRowKeys.length})</Button>
          </Popconfirm>
        )}
      </Space>
      <div style={{ minHeight: 650 }}>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={[
            { title: "Code", dataIndex: "code" },
            { title: "Poin", dataIndex: "point" },
            { title: "Reward", dataIndex: "reward" },
            {
              title: "Created",
              dataIndex: "createdAt",
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
              title: "Action",
              render: (_, record) => (
                <Space>
                  <Button danger onClick={() => handleDelete(record.id)}>
                    Xoá
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </div>

      <Modal
        title="Tạo mã ngẫu nhiên"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="quantity"
            label="Số lượng mã"
            rules={[{ required: true, message: "Vui lòng nhập số lượng mã" }]}
            getValueFromEvent={(e) =>
              typeof e === "number" ? e : Number(e?.target?.value)
            }
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          {rewardValue === "code" && (
            <Form.Item
              name="point"
              label="Số điểm"
              rules={[{ required: true, message: "Vui lòng nhập số điểm" }]}
              getValueFromEvent={(e) =>
                typeof e === "number" ? e : Number(e?.target?.value)
              }
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item
            name="reward"
            label="Phần thưởng"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn phần thưởng">
              {rewards.map((r) => (
                <Select.Option key={r.reward} value={r.reward}>
                  {r.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
