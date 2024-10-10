import Footer from "../components/Footer";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 space-y-16">
        <section className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-[#F0A0AD] mb-6"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Who are we
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              PersoNailize chuyên cung cấp các nail-boxes theo yêu cầu riêng phù
              hợp với phong cách và sở thích riêng của từng khách hàng. Tại
              PersonNailize, chúng tôi tin rằng mọi chi tiết đều quan trọng và
              việc thể hiện bản thân thông qua móng tay sẽ trở nên dễ dàng và
              thú vị.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              PersoNailize đã đơn giản hóa quy trình tùy chỉnh, cho phép bạn
              thiết kế bộ móng lý tưởng của mình chỉ bằng vài cú nhấp chuột. Sứ
              mệnh của chúng tôi là trở thành công ty khởi nghiệp hàng đầu trong
              việc cách mạng hóa ngành tùy chỉnh móng tay bằng cách làm cho
              ngành này dễ tiếp cận, cá nhân hóa và cực kỳ thân thiện với người
              dùng.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="w-96 h-96 bg-[#F0A0AD] rounded-lg flex items-center justify-center">
              {/* <div className="w-64 h-80 bg-white rounded-full overflow-hidden flex items-center justify-center"> */}
              <img
                src="./home1.png"
                alt="Nail art and manicure"
                className="w-full h-full  transform -translate-y-10"
              />
              {/* </div> */}
            </div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="md:w-1/2 mb-8 md:mb-0  flex justify-center items-center">
            {/* <div className="w-80 h-80 rounded-lg flex items-center justify-center"> */}
            <img
              src="./home2.png"
              alt="Uniquely You"
              className="w-full h-auto rounded-lg"
            />
            {/* </div> */}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Uniquely You!
            </h2>
            <p className="text-lg mb-8 text-gray-700">
              Bạn có thể vẽ BẤT KỲ hình ảnh hoặc charm nào trên móng tay của
              mình. Những chiếc móng tay được cá nhân hóa của bạn tạo thêm điểm
              nhấn đặc biệt và khác biệt, khiến chúng trở thành món quà lý
              tưởng.
            </p>
            <button className="bg-[#F0A0AD] text-white font-bold py-2 px-6 rounded-full hover:bg-[#E08090] transition duration-300">
              Learn More
            </button>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-80 h-80 rounded-lg flex items-center justify-center">
                  <img
                    src="./Item.png"
                    alt="Item"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div>
                <div className="w-80 h-80 rounded-lg flex items-center justify-center">
                  <img
                    src="./Item2.png"
                    alt="Item"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div>
                <div className="w-80 h-80 rounded-lg flex items-center justify-center">
                  <img
                    src="./Item3.png"
                    alt="Item"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div>
                <div className="w-80 h-80 rounded-lg flex items-center justify-center">
                  <img
                    src="./Item4.png"
                    alt="Item"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
