import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ProductDetailModal = ({ product, onClose, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    productId: product?.productId || 0,
    categoryId: product?.categoryId || 0,
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stockQuantity: product?.stockQuantity || 0,
    imageFiles: [],
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: Array.from(e.target.files),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("productId", formData.productId.toString());
    formDataToSend.append("categoryId", formData.categoryId.toString());
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("stockQuantity", formData.stockQuantity.toString());

    formData.imageFiles.forEach((file) => {
      formDataToSend.append("imageFiles", file);
    });

    await onUpdate(formDataToSend);
    onClose();
  };
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
        {isEditMode ? (
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Category ID
                </label>
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Stock
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500">
                Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <img
              src={getImageSrc(product.images[0]?.imageUrl)}
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
        )}

        <div className="mt-6 flex gap-2">
          {!isEditMode ? (
            <>
              <button
                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
              <button
                className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                onClick={onClose}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <button
                className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
