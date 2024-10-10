import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkout from "../components/Checkout";

const CheckoutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <Checkout />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
