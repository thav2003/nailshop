import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CustomizeNails from "../components/CustomizeNails";
import { Link } from "react-router-dom";

const CustomNailPage = () => {
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
        <section>
          <img
            src="//www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=3840"
            alt=""
            srcSet="//www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=375 375w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=550 550w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=750 750w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=1100 1100w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=1500 1500w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=1780 1780w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=2000 2000w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=3000 3000w, //www.cutiepopnailshop.com/cdn/shop/files/Custom_Nail_Art_Banner.png?v=1713459739&amp;width=3840 3840w"
            width="1680"
            height="774.0"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="flex justify-center items-center my-10">
            <Link
              to="/product/custom-nail"
              className="bg-[#FFBFBF] py-5 px-10 rounded-full"
            >
              Start Designing Now
            </Link>
          </div>

          <div className="px-80">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Design Your Own Press-On Nails
            </h1>
            <div className="rte">
              <div style={{ textAlign: "left" }}>
                <Link
                  title="Custom Design Press-on nails"
                  to="/product/custom-nail"
                  rel="noopener noreferrer"
                >
                  Welcome to our customizer where you can design your own unique
                  press-on nails and we'll bring them to life! During our soft
                  launch, enjoy our special pricing of just $45 with NO
                  additional costs for upgrades or add-ons!
                </Link>
                <br />
                <br />
                <h2>How to create your own Custom Nails:</h2>
                <ol>
                  <li>
                    <span style={{ textDecoration: "underline" }}> Design</span>
                    : Use our easy-to-use customizer to create your perfect
                    press-on nails. Choose from a variety of shapes, colors,
                    charms, and more!
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>Order:</span>{" "}
                    Once you're satisfied with your design, simply place your
                    order. We'll get to work creating your custom nails.
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Delivery:
                    </span>{" "}
                    Your personalized press-on nails will be carefully crafted
                    and shipped to your doorstep. Process may take 4-5 weeks.
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Feedback:
                    </span>{" "}
                    After receiving your nails, we'll send you a survey email to
                    gather feedback. Your input will help us improve our
                    customizer for an even better experience!
                  </li>
                </ol>
                <br />
                <p>
                  Don't miss out on this special offer! Create your custom
                  press-on nails today and step up your nail game with style and
                  ease!
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <Link
                  title="Custom Personalized Nails"
                  to="/product/custom-nail"
                  rel="noopener noreferrer"
                >
                  START CUSTOMIZING NOW
                </Link>
              </div>

              <div style={{ textAlign: "left" }}>
                <h2 style={{ textDecoration: "underline" }}>
                  <strong>Image File Guidelines:</strong>
                </h2>
                <ol>
                  <li>
                    Please use PNG or at least 300 dpi print quality files.
                    150dpi may result in blurry or pixelated images.
                  </li>
                  <li>
                    Don't place important details very close to the edges. Avoid
                    designs with borders. Borders may appear uneven if the image
                    is shifted.
                  </li>
                  <li>
                    Ensure the details in the image are not too small! Remember,
                    these will be printed on nail press-on nails so the image
                    will be smaller than what you see on a screen.
                  </li>
                </ol>
                <p>
                  *Please note that this is a custom press-on nail printing
                  service and you will supply the images for your design. We do
                  not create the images or graphics. Please ensure that you have
                  the appropriate authority to use the images you provide. We
                  reserve the right to reject and refund orders that we deem
                  inappropriate (including but not limited to racist, nude, lewd
                  words or imagery). We may review submitted designs and may
                  communicate with you if we note any images that may contain
                  errors.
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Custom Nail Wraps &amp; Custom Press-On Nails
              </h1>
              <p>
                #customyournailwraps #designyourownnailwraps
                #designyourownnailstickers #customnailstickers #customnailstrips
                #customnailart #animenailart #animenailstickers #animenailwraps
                #pressonnails #customyournails #cusomnailart #Mothersdaygift
                #giftsforher #uniquegifts #prettynails #customnails
              </p>
            </div>
          </div>
        </section>
        {/* <iframe
          ref={iframeRef}
          id="mczrProductIframe"
          style={{ border: "none" }}
          src={iframeSrc}
          width="100%"
          height="800px"
          allow="clipboard-write"
        /> */}
        {/* <CustomizeNails /> */}
      </main>
      <Footer />
    </div>
  );
};

export default CustomNailPage;
