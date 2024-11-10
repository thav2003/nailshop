import React, { useState, useEffect } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaInfo,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
} from "react-icons/fa";
import axios from "axios";
import ProductDetailModal from "./ProductDetailModal";

const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://personailize.store/api/Product"
      );
      console.log(response.data);
      setProducts(
        response.data.map((product) => ({
          ...product,
          // image: `https://images.unsplash.com/photo-${Math.floor(
          //   Math.random() * 1000
          // )}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80`,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const isPath = (img) => {
    // Define a list of common image file extensions
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];

    // Check if the string starts with a valid path prefix
    const hasValidPathPrefix =
      img?.includes("images") ||
      img?.startsWith("http://") ||
      img?.startsWith("https://");

    // Check if the string ends with a valid image file extension
    const hasValidImageExtension = imageExtensions.some((ext) =>
      img?.toLowerCase()?.endsWith(ext)
    );

    return hasValidPathPrefix && hasValidImageExtension;
  };
  const getImageSrc = (img) => {
    console.log(img);
    if (isPath(img)) {
      return img; // Return the path as-is
    } else {
      // If it's not a path, assume it's a base64 string and prepend the appropriate prefix
      return `data:image/jpeg;base64,${img}`; // Change 'jpeg' to the correct format if needed
    }
  };
  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setProducts(sortedProducts);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp className="inline ml-1" />
      ) : (
        <FaSortDown className="inline ml-1" />
      );
    }
    return <FaSort className="inline ml-1" />;
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://personailize.store/api/Product/${productId}`);
      console.log(`Deleted product ${productId}`);
      // Refresh the product list after successful deletion
      fetchProducts();
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
    }
  };

  // Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPaginationItems = () => {
    const totalPages = pageNumbers.length;
    const items = [];

    items.push(
      <li key="first">
        <button
          onClick={() => paginate(1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          } transition-colors`}
        >
          1
        </button>
      </li>
    );

    if (currentPage > 3) {
      items.push(
        <li key="ellipsis-start">
          <span className="px-3 py-1 mx-1">
            <FaEllipsisH />
          </span>
        </li>
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i}>
          <button
            onClick={() => paginate(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <li key="ellipsis-end">
          <span className="px-3 py-1 mx-1">
            <FaEllipsisH />
          </span>
        </li>
      );
    }

    if (totalPages > 1) {
      items.push(
        <li key="last">
          <button
            onClick={() => paginate(totalPages)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return items;
  };
  const handleDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto p-4">
      {isModalOpen && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(data) => console.log(data)}
        />
      )}
      <div className="flex flex-col h-[80vh]">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left font-semibold text-gray-700">
                  Image
                </th>
                {["Name", "Category", "Price", "Stock", "Creation Date"].map(
                  (columnName) => (
                    <th
                      key={columnName}
                      className="p-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() =>
                        requestSort(columnName.toLowerCase().replace(" ", ""))
                      }
                    >
                      {columnName}{" "}
                      {getSortIcon(columnName.toLowerCase().replace(" ", ""))}
                    </th>
                  )
                )}
                <th className="p-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr
                  key={product.productId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="p-3 border-t">
                    <img
                      src={getImageSrc(product?.images[0]?.imageUrl)}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 border-t">{product.name}</td>
                  <td className="p-3 border-t">{product.categoryName}</td>
                  <td className="p-3 border-t">${product.price.toFixed(2)}</td>
                  <td className="p-3 border-t">{product.stockQuantity}</td>
                  <td className="p-3 border-t">
                    {new Date(product.creationDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-t">
                    <button
                      onClick={() => handleDetails(product)}
                      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                    >
                      <FaInfo className="inline mr-1" /> Details
                    </button>
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <nav>
            <ul className="flex items-center">
              <li>
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
              </li>
              {renderPaginationItems()}
              <li>
                <button
                  onClick={() =>
                    paginate(Math.min(pageNumbers.length, currentPage + 1))
                  }
                  className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  disabled={currentPage === pageNumbers.length}
                >
                  <FaChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
