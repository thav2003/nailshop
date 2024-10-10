import Header from "../components/Header";
import Footer from "../components/Footer";
import Blog from "../components/Blog";

const BlogPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
