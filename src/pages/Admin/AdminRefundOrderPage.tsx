import { useState } from "react";
import Footer from "../../components/Footer";
import ProductTable from "../../components/admin/AdminProductList";
import CRUDModal from "../../components/admin/CreateModal";
import RefundRequestTable from "../../components/admin/RefundRequestTable";
import Sidebar from "../../components/admin/Sidebar";

const AdminRefundPage = () => {
  const mockRefundRequests = [
    {
      id: 1,
      orderNumber: "ORD-001",
      reason: "Wrong item received",
      description: "I ordered red nail polish but received blue.",
      email: "customer1@example.com",
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      reason: "Item is defective",
      description: "The nail file broke after first use.",
      email: "customer2@example.com",
      status: "Pending",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      reason: "Not satisfied with the product",
      description: "The nail polish color doesn't match the website image.",
      email: "customer3@example.com",
      status: "Pending",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      reason: "Other",
      description: "I changed my mind and no longer need this product.",
      email: "customer4@example.com",
      status: "Pending",
    },
    {
      id: 5,
      orderNumber: "ORD-005",
      reason: "Wrong item received",
      description: "I received nail stickers instead of nail polish remover.",
      email: "customer5@example.com",
      status: "Pending",
    },
  ];
  const [refundRequests, setRefundRequests] = useState(mockRefundRequests);

  // useEffect(() => {
  //   // Fetch refund requests from your API
  //   fetchRefundRequests();
  // }, []);
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <RefundRequestTable refundRequests={refundRequests} />
      </Sidebar>
    </div>
  );
};

export default AdminRefundPage;
