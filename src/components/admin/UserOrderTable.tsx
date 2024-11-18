import React, { useState, useEffect } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import axios from "axios";
type SortDirection = "asc" | "desc" | "none";

const UserOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");
  const [previousOrders, setPreviousOrders] = useState([]);

  const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "account.email", label: "Email" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "paymentMethod", label: "Payment Method" },
    { key: "shippingMethod", label: "Shipping Method" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "orderStatus", label: "Order Status" },
    { key: "orderDate", label: "Order Date" },
  ];
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://personailize.store/api/Order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection("none");
        setOrders(previousOrders);
        setSortColumn("");
        return;
      }
    } else {
      setPreviousOrders([...orders]);
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    console.log(`Editing order ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.orderId !== id));
    }
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (!sortColumn) return 0;

    // Handle nested properties (like account.email)
    const getValue = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const aValue = getValue(a, sortColumn);
    const bValue = getValue(b, sortColumn);

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortColumn === column.key ? (
                      sortDirection === "asc" ? (
                        <FaSortUp className="ml-1" />
                      ) : sortDirection === "desc" ? (
                        <FaSortDown className="ml-1" />
                      ) : (
                        <FaSort className="ml-1" />
                      )
                    ) : (
                      <FaSort className="ml-1" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order?.account?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalAmount)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {order.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.shippingMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.orderStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.orderStatus === "Paid"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(order.orderId)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    aria-label={`Edit order ${order.orderId}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete order ${order.orderId}`}
                  >
                    <FaTrash />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, sortedOrders.length)}
            </span>{" "}
            of <span className="font-medium">{sortedOrders.length}</span>{" "}
            results
          </p>
        </div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {Array.from({
            length: Math.ceil(sortedOrders.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === index + 1
                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UserOrderTable;
