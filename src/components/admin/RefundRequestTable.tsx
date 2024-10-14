import React from "react";

const RefundRequestTable = ({ refundRequests }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">Order ID</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Amount</th>
          <th className="py-3 px-6 text-left">Date</th>
          <th className="py-3 px-6 text-left">Reason</th>
          <th className="py-3 px-6 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {refundRequests.map((request) => (
          <tr
            key={request.refundOrderId}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {request.refundOrderId}
            </td>
            <td className="py-3 px-6 text-left">{request.orderId}</td>
            <td className="py-3 px-6 text-left">{request.contactEmail}</td>
            <td className="py-3 px-6 text-left">
              ${request.refundAmount.toFixed(2)}
            </td>
            <td className="py-3 px-6 text-left">
              {new Date(request.refundDate).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 text-left">{request.refundReason}</td>
            <td className="py-3 px-6 text-left">{request.refundStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RefundRequestTable;
