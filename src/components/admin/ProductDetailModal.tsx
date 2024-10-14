import React from "react";
import { FaTimes } from "react-icons/fa";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="text-lg font-semibold text-gray-900">
                {product.categoryId}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Price</p>
              <p className="text-lg font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Stock</p>
              <p className="text-lg font-semibold text-gray-900">
                {product.stockQuantity}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(product.creationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-base text-gray-700">{product.description}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
