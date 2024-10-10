import Footer from "../../components/Footer";
import Sidebar from "../../components/admin/Sidebar";
import UserOrderTable from "../../components/admin/UserOrderTable";

const OrderPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <UserOrderTable />
      </Sidebar>
      {/* <main className="container mx-auto px-4">
    
      </main> */}
      <Footer />
    </div>
  );
};

export default OrderPage;
