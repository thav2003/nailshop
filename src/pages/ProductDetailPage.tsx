import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

const ProductDetailPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <ProductDetail />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
