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

          <div className="px-52">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Thiết kế Press-On Nails dành riêng cho bạn
            </h1>
            <div className="rte">
              <div style={{ textAlign: "left" }}>
                <Link
                  title="Custom Design Press-on nails"
                  to="/product/custom-nail"
                  rel="noopener noreferrer"
                >
                  Chào mừng bạn đến với thợ tùy chỉnh của chúng tôi, nơi bạn có
                  thể thiết kế những chiếc móng ấn tượng độc đáo của riêng mình
                  và chúng tôi sẽ biến chúng thành hiện thực! Trong thời gian ra
                  mắt thử nghiệm, hãy tận hưởng mức giá đặc biệt chỉ 150.000đ mà
                  KHÔNG phải trả thêm chi phí nâng cấp hoặc tiện ích bổ sung!
                </Link>
                <br />
                <br />
                <h2 className="text-xl font-bold mb-6 leading-tight text-gray-900">
                  Cách tạo Custom Nails cho riêng bạn:
                </h2>
                <ol>
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Thiết kế
                    </span>
                    : Sử dụng công cụ tùy chỉnh dễ sử dụng của chúng tôi để tạo
                    ra bộ móng ấn hoàn hảo của bạn. Chọn từ nhiều hình dạng, màu
                    sắc, sự quyến rũ và hơn thế nữa!
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Đặt hàng
                    </span>
                    : Sau khi bạn hài lòng với thiết kế của mình, bạn chỉ cần
                    đặt hàng. Chúng tôi sẽ bắt tay vào việc tạo ra những chiếc
                    do bạn thiết kế.
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Feedback
                    </span>
                    : After receiving your nails, we'll send you a survey email
                    to gather feedback. Your input will help us improve our
                    customizer for an even better experience!
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Giao hàng
                    </span>
                    : Móng tay bấm theo yêu cầu riêng của bạn sẽ được chế tạo
                    cẩn thận và vận chuyển đến tận nhà bạn. Quá trình này có thể
                    mất 4-5 tuần.
                  </li>
                  <br />
                  <li>
                    <span style={{ textDecoration: "underline" }}>
                      Phản hồi
                    </span>
                    : Sau khi nhận được móng tay của bạn, chúng tôi sẽ gửi cho
                    bạn email khảo sát để thu thập phản hồi. Ý kiến đóng góp của
                    bạn sẽ giúp chúng tôi cải thiện công cụ tùy chỉnh để có trải
                    nghiệm tốt hơn nữa!
                  </li>
                </ol>
                <br />
                <p>
                  Đừng bỏ lỡ ưu đãi đặc biệt này! Tạo móng tay theo thiết kế của
                  bạn ngay hôm nay và nâng cao trò chơi làm móng của bạn một
                  cách phong cách và dễ dàng!
                </p>
              </div>
              <br />
              <div style={{ textAlign: "left", textDecoration: "underline" }}>
                <Link
                  title="Custom Personalized Nails"
                  to="/product/custom-nail"
                  rel="noopener noreferrer"
                >
                  BẮT ĐẦU THIẾT KẾ NGAY BÂY GIỜ
                </Link>
              </div>
              <br />
            </div>
            <div className="flex items-center justify-center">
              <Link to="/product/custom-nail">
                <button className="bg-[#F0A0AD] text-white font-bold py-2 px-6 rounded-full hover:bg-[#E08090] transition duration-300">
                  Làm ngay hôm nay
                </button>
              </Link>
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
