import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CustomizeNails from "../components/CustomizeNails";
import { Link } from "react-router-dom";

const CustomPage = () => {
  const iframeRef = useRef(null);
  const iframeSrc =
    "https://cutie-pop-nail-shop.gokickflip.com/customize/startingpoint/6596fbea61a0f1742598d79a?shopid=624a2a7b9b61ae6e1f4f1013&amp;lang=en&amp;country=US&amp;currency=USD&amp;rate=1.0&amp;storeProductUrl=https://www.cutiepopnailshop.com/products/design-your-own-press-on-nails?designId=<designId>";

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleIframeLoad = () => {
      try {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        const scripts = iframeDocument.querySelectorAll("script");
        scripts.forEach((script) => script.remove());
      } catch (e) {
        console.error("Cannot access iframe content due to CORS policy.");
      }
    };

    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4">
        {/* <div className="iframe-container">
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            width="100%"
            height="600"
            frameBorder="0"
            title="Customize Nails"
            allowFullScreen
          ></iframe>
        </div> */}
        <CustomizeNails />
      </main>
      <Footer />
    </div>
  );
};

export default CustomPage;
