import { useEffect, useState } from "react";
import RefundRequestTable from "../../components/admin/RefundRequestTable";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";

const AdminRefundPage = () => {
  const [refundRequests, setRefundRequests] = useState([]);

  const handleRefundUpdated = (refundOrderId, newStatus) => {
    setRefundRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.refundOrderId === refundOrderId
          ? { ...request, refundStatus: newStatus }
          : request
      )
    );
  };
  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const response = await axios.get(
          "https://personailize.store/api/Refund"
        );
        setRefundRequests(response.data);
      } catch (error) {
        console.error("Error fetching refund requests:", error);
      }
    };

    fetchRefundRequests();
  }, []);
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <RefundRequestTable
          refundRequests={refundRequests}
          onRefundUpdated={handleRefundUpdated}
        />
      </Sidebar>
    </div>
  );
};

export default AdminRefundPage;
