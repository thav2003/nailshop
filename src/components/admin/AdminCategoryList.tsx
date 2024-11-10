import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Select
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  childCategories: Category[];
}

const AdminCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5197/api/Category/children');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  const fetchParentCategories = async () => {
    try {
      const response = await fetch('http://localhost:5197/api/Category/parents');
      const data = await response.json();
      setParentCategories(data);
    } catch (error) {
      message.error('Failed to fetch parent categories');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    setEditingId(record.categoryId);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5197/api/Category/${id}`, {
        method: 'DELETE',
      });
      message.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        // Update
        await fetch(`http://localhost:5197/api/Category/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        message.success('Category updated successfully');
      } else {
        // Create
        await fetch('http://localhost:5197/api/Category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        message.success('Category created successfully');
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error('Failed to save category');
    }
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.categoryId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: '16px' }}
      >
        Add Category
      </Button>

      <Table columns={columns} dataSource={categories} rowKey="categoryId" />

      <Modal
        title={editingId ? 'Edit Category' : 'Add Category'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="parentCategoryId" label="Parent Category">
            <Select allowClear>
              {parentCategories.map(category => (
                <Option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategoryList;
