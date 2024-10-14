import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const userData = localStorage.getItem("userData");
  return (
    <header className="container mx-auto px-4 py-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-center">
          <img
            src="https://www.figma.com/file/w1IE1yiuTVIG9Evyv2x5QF/image/0c00d35a0f52857692de26bdd927e9f1d239ccd0"
            alt="Company Logo"
            className="h-16"
          />
        </div>
        <div className="w-1/3 flex justify-end items-center space-x-4">
          {/* <Link to={userData ? "/profile" : "/login"}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer hover:opacity-80 transition duration-300"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2059 7.16667C10.2059 5.84058 10.7637 4.56881 11.7565 3.63113C12.7493 2.69345 14.0959 2.16667 15.5 2.16667C16.9041 2.16667 18.2507 2.69345 19.2435 3.63113C20.2363 4.56881 20.7941 5.84058 20.7941 7.16667C20.7941 8.49275 20.2363 9.76452 19.2435 10.7022C18.2507 11.6399 16.9041 12.1667 15.5 12.1667C14.0959 12.1667 12.7493 11.6399 11.7565 10.7022C10.7637 9.76452 10.2059 8.49275 10.2059 7.16667ZM15.5 0.5C13.6279 0.5 11.8324 1.20238 10.5087 2.45262C9.18487 3.70286 8.44118 5.39856 8.44118 7.16667C8.44118 8.93478 9.18487 10.6305 10.5087 11.8807C11.8324 13.131 13.6279 13.8333 15.5 13.8333C17.3721 13.8333 19.1676 13.131 20.4913 11.8807C21.8151 10.6305 22.5588 8.93478 22.5588 7.16667C22.5588 5.39856 21.8151 3.70286 20.4913 2.45262C19.1676 1.20238 17.3721 0.5 15.5 0.5ZM25.3471 20.75C27.3235 22.1167 28.5765 24.4833 28.7176 28.8333H2.28235C2.42353 24.5 3.67647 22.1167 5.63529 20.75C7.84118 19.25 11.0882 18.8333 15.5 18.8333C19.9118 18.8333 23.1765 19.2667 25.3471 20.75ZM15.5 17.1667C11.0882 17.1667 7.29412 17.5667 4.61176 19.4167C1.85882 21.3 0.5 24.55 0.5 29.6667V30.5H30.5V29.6667C30.5 24.55 29.1412 21.3 26.3882 19.4167C23.7059 17.5833 19.9118 17.1667 15.5 17.1667Z"
                fill="#F0A0AD"
              />
            </svg>
          </Link> */}
          <div>
            <UserDropdown />
          </div>

          <Link to={userData ? "/cart" : "/login"}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer hover:opacity-80 transition duration-300"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.30267 0.5H1.8489L0.519975 21.0431C0.439538 22.2541 0.602592 23.4691 0.999008 24.6127C1.39542 25.7563 2.01674 26.804 2.82436 27.6909C3.63199 28.5777 4.60868 29.2847 5.69378 29.768C6.77887 30.2512 7.94921 30.5004 9.1321 30.5H21.8691C23.0504 30.5002 24.2192 30.2515 25.3031 29.7694C26.3869 29.2872 27.3628 28.5818 28.1701 27.6969C28.9775 26.812 29.5992 25.7664 29.9967 24.6249C30.3943 23.4834 30.5592 22.2703 30.4812 21.0608L29.135 0.5H7.30267ZM7.30267 2.27096H3.47122L2.24585 21.1671C2.18202 22.1353 2.31273 23.1066 2.62987 24.0208C2.94702 24.935 3.44384 25.7726 4.08952 26.4817C4.7352 27.1907 5.51596 27.7561 6.38338 28.1426C7.25081 28.5292 8.18639 28.7288 9.1321 28.729H21.8691C22.8162 28.7313 23.7537 28.5335 24.6232 28.1479C25.4926 27.7624 26.2755 27.1974 26.923 26.4881C27.5705 25.7788 28.0689 24.9404 28.3871 24.025C28.7053 23.1096 28.8365 22.1367 28.7726 21.1671L27.5299 2.27096H23.6985V3.38666C23.6985 4.49134 23.4864 5.58521 23.0745 6.60581C22.6625 7.6264 22.0586 8.55374 21.2974 9.33487C20.5361 10.116 19.6324 10.7356 18.6378 11.1584C17.6432 11.5811 16.5771 11.7987 15.5006 11.7987C14.424 11.7987 13.358 11.5811 12.3634 11.1584C11.3688 10.7356 10.465 10.116 9.70378 9.33487C8.94253 8.55374 8.33868 7.6264 7.9267 6.60581C7.51471 5.58521 7.30267 4.49134 7.30267 3.38666V2.27096ZM21.9726 2.27096H9.02854V3.38666C9.02854 5.14798 9.71042 6.83717 10.9242 8.08261C12.1379 9.32806 13.7841 10.0277 15.5006 10.0277C17.2171 10.0277 18.8633 9.32806 20.077 8.08261C21.2907 6.83717 21.9726 5.14798 21.9726 3.38666V2.27096Z"
                fill="#F0A0AD"
              />
            </svg>
          </Link>
        </div>
      </div>
      <nav className="w-full flex justify-center space-x-6">
        <Link
          to="/"
          className="text-gray-900 hover:text-[#F0A0AD] transition duration-300"
        >
          Home
        </Link>
        <div className="relative">
          <Dropdown />
        </div>
        <Link
          to="/product/custom"
          className="text-gray-900 hover:text-[#F0A0AD] transition duration-300"
        >
          Customize your Own
        </Link>
        <Link
          to="/blog"
          className="text-gray-900 hover:text-[#F0A0AD] transition duration-300"
        >
          Blog
        </Link>
        <Link
          to="/refund-order"
          className="text-gray-900 hover:text-[#F0A0AD] transition duration-300"
        >
          Refund
        </Link>
      </nav>
    </header>
  );
};

export default Header;
