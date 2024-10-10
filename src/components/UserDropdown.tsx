import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const userData = localStorage.getItem("userData");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const items = [
    { id: "profile", label: "Profile" },
    { id: "order-history", label: "Order History" },
    { id: "logout", label: "Logout" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!userData) {
      navigate("/login"); // Nếu không có userData, điều hướng đến trang login
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown();
    }
  };
  const handleItemClick = (item) => {
    if (item.id === "logout") {
      localStorage.clear();
      navigate("/login");
    } else {
      navigate(`/${item.id}`);
    }
  };
  return (
    <div className="relative mx-auto" ref={dropdownRef}>
      <button
        className="inline-flex items-center text-left"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer hover:opacity-80 transition duration-300"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.2059 7.16667C10.2059 5.84058 10.7637 4.56881 11.7565 3.63113C12.7493 2.69345 14.0959 2.16667 15.5 2.16667C16.9041 2.16667 18.2507 2.69345 19.2435 3.63113C20.2363 4.56881 20.7941 5.84058 20.7941 7.16667C20.7941 8.49275 20.2363 9.76452 19.2435 10.7022C18.2507 11.6399 16.9041 12.1667 15.5 12.1667C14.0959 12.1667 12.7493 11.6399 11.7565 10.7022C10.7637 9.76452 10.2059 8.49275 10.2059 7.16667ZM15.5 0.5C13.6279 0.5 11.8324 1.20238 10.5087 2.45262C9.18487 3.70286 8.44118 5.39856 8.44118 7.16667C8.44118 8.93478 9.18487 10.6305 10.5087 11.8807C11.8324 13.131 13.6279 13.8333 15.5 13.8333C17.3721 13.8333 19.1676 13.131 20.4913 11.8807C21.8151 10.6305 22.5588 8.93478 22.5588 7.16667C22.5588 5.39856 21.8151 3.70286 20.4913 2.45262C19.1676 1.20238 17.3721 0.5 15.5 0.5ZM25.3471 20.75C27.3235 22.1167 28.5765 24.4833 28.7176 28.8333H2.28235C2.42353 24.5 3.67647 22.1167 5.63529 20.75C7.84118 19.25 11.0882 18.8333 15.5 18.8333C19.9118 18.8333 23.1765 19.2667 25.3471 20.75ZM15.5 17.1667C11.0882 17.1667 7.29412 17.5667 4.61176 19.4167C1.85882 21.3 0.5 24.55 0.5 29.6667V30.5H30.5V29.6667C30.5 24.55 29.1412 21.3 26.3882 19.4167C23.7059 17.5833 19.9118 17.1667 15.5 17.1667Z"
            fill="#F0A0AD"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 right-0 w-40 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-6">
              {items.map((item) => (
                <button
                  onClick={() => handleItemClick(item)} // Gọi hàm khi nhấn nút
                  key={item.id}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full text-sm"
                  aria-label={`Select ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
