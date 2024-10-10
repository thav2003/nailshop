import Footer from "../../components/Footer";
import Dashboard from "../../components/admin/Dashboard";
import Sidebar from "../../components/admin/Sidebar";

const AdminProductPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Sidebar>
        <Dashboard />
      </Sidebar>
      {/* <main className="container mx-auto px-4">
    
      </main> */}
      <Footer />
    </div>
  );
};

export default AdminProductPage;
