import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderHistory from "../components/OrderHistory";

const OrderHistoryPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <OrderHistory />
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
