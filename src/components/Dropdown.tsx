import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:7220/api/Category/parents"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data); // Set the fetched categories in state
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories(); // Call the fetch function

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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown();
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
        <span>Shop</span>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 ml-2" />
        ) : (
          <FiChevronDown className="w-5 h-5 ml-2" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-[43rem] mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {categories.map((category) => (
                <button
                  onClick={() =>
                    navigate(`/shop?categoryId=${category.categoryId}`)
                  }
                  key={category.categoryId}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full text-sm"
                  aria-label={`Select ${category.categoryName} category`}
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
