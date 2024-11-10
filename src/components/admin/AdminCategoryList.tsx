import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { s } from "framer-motion/client";

const { Option } = Select;

interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  parentCategoryId?: string;
  childCategories: Category[];
}

const AdminCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://personailize.store/api/Category/children"
      );
      const data = await response.json();
      setCategories(data);
      if (selectedCategory !== null) {
        setSelectedCategory(
          data.find(
            (category: Category) =>
              category.categoryId === selectedCategory.categoryId
          )
        );
      }
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  const fetchParentCategories = async () => {
    try {
      const response = await fetch(
        "https://personailize.store/api/Category/parents"
      );
      const data = await response.json();
      setParentCategories(data);
    } catch (error) {
      message.error("Failed to fetch parent categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
  }, []);

  // const handleAdd = () => {
  //   setEditingId(null);
  //   form.resetFields();
  //   setIsModalVisible(true);
  // };
  const handleAdd = (parentId?: number) => {
    setEditingId(null);
    form.resetFields();
    console.log(parentId);
    if (parentId) {
      form.setFieldsValue({ parentCategoryId: parentId });
    }
    setIsModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    setEditingId(record.categoryId);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://personailize.store/api/Category/${id}`, {
        method: "DELETE",
      });
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category");
    }
  };
  const handleView = (record: Category) => {
    setSelectedCategory(record);
    setIsViewModalVisible(true);
  };
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        // Update
        values.categoryId = editingId;
        await fetch(`https://personailize.store/api/Category/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        message.success("Category updated successfully");
      } else {
        // Create
        await fetch("https://personailize.store/api/Category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        message.success("Category created successfully");
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error("Failed to save category");
    }
  };
  const childColumns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
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
  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <Space>
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
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
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAdd()}
        style={{ marginBottom: "16px" }}
      >
        Add Category
      </Button>

      <Table columns={columns} dataSource={categories} rowKey="categoryId" />

      <Modal
        title="View Children Category"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        width={800}
        footer={null}
      >
        {selectedCategory && (
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAdd(selectedCategory?.categoryId)}
              style={{ marginBottom: "16px" }}
            >
              Add Child Category
            </Button>
            <Table
              columns={childColumns}
              dataSource={selectedCategory.childCategories}
              rowKey="categoryId"
              pagination={false}
            />
          </div>
        )}
      </Modal>

      <Modal
        title={editingId ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        zIndex={1001}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="parentCategoryId"
            label="Parent Category"
            hidden={
              editingId !== null && !form.getFieldValue("parentCategoryId")
            }
          >
            <Select allowClear disabled={editingId === null}>
              {parentCategories.map((category) => (
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
