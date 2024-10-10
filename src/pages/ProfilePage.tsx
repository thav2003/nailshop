import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";

const LoginPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 space-y-16">
        <ProfileComponent />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
