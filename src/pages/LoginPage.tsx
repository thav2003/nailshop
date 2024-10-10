import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 space-y-16">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
