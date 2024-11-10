import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface Account {
  accountId: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  creationDate: string;
}

const AdminUserList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [form] = Form.useForm();

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://personailize.store/api/Account");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      message.error("Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setEditingAccount(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Account) => {
    setEditingAccount(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (accountId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this account?",
      onOk: async () => {
        try {
          const response = await fetch(
            `https://personailize.store/api/Account/${accountId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            message.success("Account deleted successfully");
            fetchAccounts();
          } else {
            message.error("Failed to delete account");
          }
        } catch (error) {
          message.error("Error deleting account");
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const url = "https://personailize.store/api/Account";
      const method = editingAccount ? "PUT" : "POST";
      const endpoint = editingAccount
        ? `${url}/${editingAccount.accountId}`
        : url;

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(
          `Account ${editingAccount ? "updated" : "created"} successfully`
        );
        form.resetFields();
        setIsModalVisible(false);
        fetchAccounts();
      } else {
        message.error("Operation failed");
      }
    } catch (error) {
      message.error("Please check your input");
    }
  };

  const columns: ColumnsType<Account> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img
          src={avatar === "default.png" ? "/images/default.png" : avatar}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.accountId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>User Management</h1>
        <Button type="primary" onClick={handleAdd}>
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={accounts}
        loading={loading}
        rowKey="accountId"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingAccount ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Customer">Customer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserList;
