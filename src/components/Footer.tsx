import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-800 mt-auto">
      <div className="bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Integrations", "FAQ"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {["About Us", "Careers", "Partners", "Blog"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  {[
                    "Help Center",
                    "Contact Us",
                    "Status",
                    "Terms of Service",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-6">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaLinkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-400 hover:text-[#F0A0AD] transition duration-300 ease-in-out"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0A0AD] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap justify-center space-x-4 text-sm">
              <p className="text-gray-700 text-sm text-center">
                © 2024 Personalize Shop Powered by Nailify
              </p>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
              >
                Refund policy
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
              >
                Terms of service
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
              >
                Shipping policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
