import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const ProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (storedUserData) {
        setUserData(storedUserData);
        setEditedData(storedUserData);
      } else {
        setError("No user data found in local storage");
      }
    } catch (err) {
      setError("Error parsing user data from local storage");
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { accountId, email, avatar, firstName, lastName } = userData;

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log(editedData);

    const payload = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/api/Account/${accountId}`,
        payload,
        {
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(editedData);
      console.log("Account updated successfully:", response.data);
      localStorage.setItem("userData", JSON.stringify(editedData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={
                avatar ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              }
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 cursor-pointer"
              onClick={handleAvatarClick}
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
              <FaUser className="text-white" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              First Name
            </h2>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-600">{firstName}</p>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Last Name
            </h2>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-600">{lastName}</p>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Email</h2>

            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl max-h-2xl">
            <img
              src={
                avatar ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              }
              alt="User Avatar"
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
