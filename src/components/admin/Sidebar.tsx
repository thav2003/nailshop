import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiRefreshCcw,
  FiMenu,
  FiInbox,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const MainPage = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname.split("/")[1]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const activeItem = location.pathname.split("/")[2];
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    {
      id: "dashboard",
      icon: FiHome,
      label: "Dashboard",
      fn: () => navigate("/admin/dashboard"),
    },
    {
      id: "users",
      icon: FiUser,
      label: "Users",
      fn: () => navigate("/admin/users"),
    },
    {
      id: "categories",
      icon: FiInbox,
      label: "Categories",
      fn: () => navigate("/admin/categories"),
    },
    {
      id: "products",
      icon: FiPackage,
      label: "Products",
      fn: () => navigate("/admin/products"),
    },
    {
      id: "orders",
      icon: FiShoppingCart,
      label: "Orders",
      fn: () => navigate("/admin/orders"),
    },
    {
      id: "refunds",
      icon: FiRefreshCcw,
      label: "Refund Orders",
      fn: () => navigate("/admin/refund"),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={hasMounted ? { x: -300 } : false}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className=" text-gray-800 h-screen w-64 flex flex-col shadow-lg"
          >
            <div className="p-4 border-b border-gray-300">
              <h1 className="text-2xl font-bold">PersonNailize</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="p-2 space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={item.fn}
                      className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors duration-200 ${
                        activeItem === item.id
                          ? "bg-[#FF7B7B] text-white"
                          : "hover:bg-[#FFA8A8]"
                      }`}
                    >
                      <span className="flex items-center">
                        <item.icon className="mr-3" />
                        {item.label}
                      </span>
                      {/* {item.id === "orders" &&
                        (expandedSection === item.id ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        ))} */}
                    </button>
                    {/* {item.id === "orders" && (
                      <AnimatePresence>
                        {expandedSection === item.id && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            <li>
                              <a
                                href="#"
                                className="block p-2 rounded-lg hover:bg-[#FFD1D1] transition-colors duration-200"
                              >
                                All Orders
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block p-2 rounded-lg hover:bg-[#FFD1D1] transition-colors duration-200"
                              >
                                Pending Orders
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block p-2 rounded-lg hover:bg-[#FFD1D1] transition-colors duration-200"
                              >
                                Completed Orders
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )} */}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-300">
              <button
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
                className="w-full bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiMenu size={24} />
            </button>
            {/* <h2 className="text-xl font-semibold text-gray-800">
              Main Content
            </h2> */}
            <div className="w-8"></div>{" "}
            {/* Placeholder for right side if needed */}
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
