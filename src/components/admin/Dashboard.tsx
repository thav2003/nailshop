import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://personailize.store/api/Dashboard/summary"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to PureCode AI Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data?.totalOrders}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(data?.revenue)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {data?.pendingOrders}
          </p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-3">Order ID</th>
              <th className="text-left pb-3">Customer</th>
              <th className="text-left pb-3">Status</th>
              <th className="text-left pb-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentOrders?.map((e) => (
              <tr id={e.orderId}>
                <td className="py-2">{e?.orderId}</td>
                <td className="py-2">{e?.customer}</td>
                <td className="py-2">
                  <span>{e?.status}</span>
                </td>
                <td className="py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(e?.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
