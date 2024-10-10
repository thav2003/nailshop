import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

const ShopPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <Cart />
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
