import Footer from "../../components/Footer";
import AdminCategoryList from "../../components/admin/AdminCategoryList";
import ProductTable from "../../components/admin/AdminProductList";
import AdminUserList from "../../components/admin/AdminUserList";
import CRUDModal from "../../components/admin/CreateModal";
import Sidebar from "../../components/admin/Sidebar";

const AdminUserPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <AdminUserList />
      </Sidebar>
      {/* <main className="container mx-auto px-4">
    
      </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default AdminUserPage;