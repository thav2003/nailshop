import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaAngleDown,
  FaAngleUp,
  FaSort,
  FaShippingFast,
  FaCreditCard,
  FaBoxOpen,
} from "react-icons/fa";

const OrderHistory = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accountId = userData.accountId;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("orderDate");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/Order/account/${accountId}`
      );
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch order history. Please try again later.");
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortCriteria] < b[sortCriteria])
      return sortDirection === "asc" ? -1 : 1;
    if (a[sortCriteria] > b[sortCriteria])
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-red-100 p-4 rounded-lg">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Order History
      </h1>
      <div className="mb-6 flex justify-end space-x-4">
        <button
          onClick={() => handleSort("orderDate")}
          className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out"
          aria-label="Sort by order date"
        >
          Sort by Date <FaSort className="ml-2" />
        </button>
        <button
          onClick={() => handleSort("totalAmount")}
          className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out"
          aria-label="Sort by total amount"
        >
          Sort by Amount <FaSort className="ml-2" />
        </button>
      </div>
      {sortedOrders.map((order) => (
        <div
          key={order.orderId}
          className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
        >
          <div
            className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50"
            onClick={() => toggleOrderExpansion(order.orderId)}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Order #{order.orderId}
              </h2>
              <p className="text-gray-600">
                {new Date(order.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center">
              <span className="mr-4 font-bold text-2xl text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount)}
              </span>
              {expandedOrder === order.orderId ? (
                <FaAngleUp className="text-gray-600 text-2xl" />
              ) : (
                <FaAngleDown className="text-gray-600 text-2xl" />
              )}
            </div>
          </div>
          {expandedOrder === order.orderId && (
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center">
                  <FaCreditCard className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-700">
                      Payment Method:
                    </p>
                    <p className="text-gray-600">{order.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaShippingFast className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-700">
                      Shipping Method:
                    </p>
                    <p className="text-gray-600">{order.shippingMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaBoxOpen className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-700">Order Status:</p>
                    <p className="text-gray-600">{order.orderStatus}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Order Items:
              </h3>
              <ul className="space-y-4">
                {order.cartItems.map((item) => (
                  <li key={item.productId} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        {item.customization && (
                          <p className="text-gray-600 italic">
                            Customization: {item.customization}
                          </p>
                        )}
                      </div>
                      <p className="font-bold text-xl text-blue-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.totalPrice)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
