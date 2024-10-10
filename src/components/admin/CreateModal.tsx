import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const CRUDModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: [],
  });
  const [errors, setErrors] = useState({});

  const roles = ["Admin", "User", "Editor"];
  const statusOptions = ["Active", "Inactive", "Pending"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const openModal = (operation) => {
    setMode(operation);
    setIsOpen(true);
    if (operation === "read" || operation === "update") {
      // Simulating data fetching
      setFormData({
        name: "John Doe",
        email: "john@example.com",
        role: "User",
        status: ["Active"],
      });
    } else {
      setFormData({ name: "", email: "", role: "", status: [] });
    }
    setErrors({});
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, status: [...formData.status, value] });
    } else {
      setFormData({
        ...formData,
        status: formData.status.filter((status) => status !== value),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.role) newErrors.role = "Role is required";
    if (formData.status.length === 0) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulating API call
      console.log("Form submitted:", formData);
      closeModal();
    }
  };

  const handleDelete = () => {
    // Simulating delete operation
    console.log("Deleting:", formData);
    closeModal();
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => openModal("create")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
        >
          <FiPlus className="mr-2" /> Create
        </button>
        <button
          onClick={() => openModal("read")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
        >
          <FiEdit className="mr-2" /> Read/Update
        </button>
        <button
          onClick={() => openModal("delete")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
        >
          <FiTrash2 className="mr-2" /> Delete
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              <FiX className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={mode === "read" || mode === "delete"}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={mode === "read" || mode === "delete"}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={mode === "read" || mode === "delete"}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors.role ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.role}
                  </p>
                )}
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </span>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.status.includes(option)}
                        onChange={handleCheckboxChange}
                        disabled={mode === "read" || mode === "delete"}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.status}
                  </p>
                )}
              </div>
              {mode !== "read" && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  {mode === "delete" ? (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center"
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out flex items-center"
                    >
                      <FiCheck className="mr-2" /> Submit
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDModal;
