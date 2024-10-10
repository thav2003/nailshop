import Footer from "../../components/Footer";
import ProductTable from "../../components/admin/AdminProductList";
import CRUDModal from "../../components/admin/CreateModal";
import Sidebar from "../../components/admin/Sidebar";

const AdminProductPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <CRUDModal />
        <ProductTable />
      </Sidebar>
      {/* <main className="container mx-auto px-4">
    
      </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default AdminProductPage;
