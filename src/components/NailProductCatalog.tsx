import React, { useState, useEffect } from "react";
import { FaStar, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
interface Product {
  productId: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  images: { imageUrl: string }[];
}
interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  parentCategory: {
    parentCategoryId: number;
    categoryName: string;
    description: string;
  };
}
const NailProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("bestSelling");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

  const [categories, setCategories] = useState<Category[]>([]);
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : -1;

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://14.225.210.128:8080/api/Category");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data); // Set the fetched categories in state
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://14.225.210.128:8080/api/Product"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (categoryId !== -1) {
      const parent = categories.find(
        (cat) => cat.categoryId === categoryId
      ) as Category;
      const filterCategory = categories.filter(
        (cat) => cat.parentCategory?.categoryName === parent.categoryName
      );
      const filterCategoryIds = filterCategory.map((cat) => cat.categoryId);
      result = result.filter((product) =>
        filterCategoryIds.includes(product.categoryId)
      );
    }

    if (priceRange === "under30") {
      result = result.filter((product) => product.price < 30000);
    } else if (priceRange === "30to50") {
      result = result.filter(
        (product) => product.price >= 30000 && product.price <= 50000
      );
    } else if (priceRange === "over50") {
      result = result.filter((product) => product.price > 50000);
    }

    if (sortBy === "bestSelling") {
      result.sort((a, b) => b.stockQuantity - a.stockQuantity);
    } else if (sortBy === "priceLowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, categoryId, priceRange, sortBy]);

  const handleQuickView = (product) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setLoading(false);
    }, 1000);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating) ? "text-[#F0A0AD]" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-[#F0A0AD] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-left text-[#F0A0AD]">
        {categories.find((cat) => cat.categoryId === categoryId)?.categoryName}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* <div className="flex items-center space-x-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Category:
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#F0A0AD] focus:border-[#F0A0AD] sm:text-sm rounded-md"
            >
              <option value={-1}>All</option>
              {categories
                .filter((category) => category.parentCategory === null) // Filter only parent categories
                .map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div> */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Price:
            </label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#F0A0AD] focus:border-[#F0A0AD] sm:text-sm rounded-md"
            >
              <option value="all">All</option>
              <option value="under30">Under 30,000đ</option>
              <option value="30to50">30,000đ - 50,000đ</option>
              <option value="over50">Over 50,000đ</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sortBy"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#F0A0AD] focus:border-[#F0A0AD] sm:text-sm rounded-md"
            >
              <option value="bestSelling">Best Selling</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
          <p className="text-sm text-gray-600 whitespace-nowrap">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.images[0].imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
              />
              {/* <button
                onClick={() => handleQuickView(product)}
                className="absolute bottom-4 right-4 bg-[#F0A0AD] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:bg-[#E090A0] transition-colors duration-300"
              >
                Quick View
              </button> */}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-[#F0A0AD]">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2 text-sm">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold text-[#F0A0AD]">
                  {product.price.toLocaleString()}đ
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stockQuantity}
                </span>
              </div>
              <button
                onClick={() => navigate(`/product/${product.productId}`)}
                className="w-full bg-[#F0A0AD] text-white py-2 rounded-md hover:bg-[#E090A0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#F0A0AD] focus:ring-opacity-50"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">{renderPaginationButtons()}</div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
            <div className="relative">
              <img
                src={selectedProduct.images[0].imageUrl}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-[#F0A0AD] rounded-full p-2 hover:bg-[#E090A0] transition-colors duration-300"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-[#F0A0AD]">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-[#F0A0AD]">
                  {selectedProduct.price.toLocaleString()}đ
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {selectedProduct.stockQuantity}
                </span>
              </div>
              <button className="w-full bg-[#F0A0AD] text-white py-3 rounded-md hover:bg-[#E090A0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#F0A0AD] focus:ring-opacity-50">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
        </div>
      )}
    </div>
  );
};

export default NailProductCatalog;
