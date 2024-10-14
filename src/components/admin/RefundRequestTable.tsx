import axios from "axios";
import React from "react";

const RefundRequestTable = ({ refundRequests, onRefundUpdated }) => {
  const updateRefundStatus = async (refundOrderId, newStatus) => {
    try {
      const refundToUpdate = refundRequests.find(
        (r) => r.refundOrderId === refundOrderId
      );
      const response = await axios.put(
        `https://personailize.store/api/Refund/${refundOrderId}`,
        {
          refundOrderId: refundOrderId,
          orderId: refundToUpdate.orderId,
          refundAmount: refundToUpdate.refundAmount,
          refundDate: refundToUpdate.refundDate,
          refundReason: refundToUpdate.refundReason,
          refundStatus: newStatus,
          contactEmail: refundToUpdate.contactEmail,
        }
      );
      onRefundUpdated(refundOrderId, newStatus);
    } catch (error) {
      console.error("Error updating refund status:", error);
    }
  };
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
            <td className="py-3 px-6 text-left">
              <select
                value={request.refundStatus}
                onChange={(e) =>
                  updateRefundStatus(request.refundOrderId, e.target.value)
                }
                className="bg-white border border-gray-300 rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RefundRequestTable;
