import NailProductCatalog from "../components/NailProductCatalog";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ShopPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 flex-grow">
        <NailProductCatalog />
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
