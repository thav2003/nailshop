import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogDetail from "../components/BlogDetail";

const BlogDetailPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        <BlogDetail />
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
