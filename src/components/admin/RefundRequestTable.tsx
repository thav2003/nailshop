import React from "react";

const RefundRequestTable = ({ refundRequests }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Order Number</th>
          <th className="py-2 px-4 border-b">Reason</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {refundRequests.map((request, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{request.orderNumber}</td>
            <td className="py-2 px-4 border-b">{request.reason}</td>
            <td className="py-2 px-4 border-b">{request.description}</td>
            <td className="py-2 px-4 border-b">{request.email}</td>
            <td className="py-2 px-4 border-b">
              <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                Approve
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RefundRequestTable;
