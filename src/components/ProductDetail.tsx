import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errors, setErrors] = useState({});
  const [showAllImages, setShowAllImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const groupedOptions = product?.customOptions.reduce((acc, option) => {
    const existingGroup = acc.find(
      (group) => group.optionName === option.optionName
    );
    if (existingGroup) {
      existingGroup.values.push(option.optionValue);
    } else {
      acc.push({ optionName: option.optionName, values: [option.optionValue] });
    }
    return acc;
  }, []);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://14.225.210.128:8080/api/Product/${productId}`
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
    validateSelection(attribute, value);
  };

  const validateSelection = (attribute, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [attribute]: `Please select a ${attribute}`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[attribute];
        return newErrors;
      });
    }
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const renderImages = () => {
    if (!product || !product.images || product.images.length === 0) {
      return null;
    }

    const imageCount = product.images.length;
    const displayImages = showAllImages
      ? product.images
      : product.images.slice(0, 4);

    if (imageCount === 1) {
      return (
        <img
          src={product.images[0].imageUrl}
          alt="Product image"
          className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => openModal(0)}
        />
      );
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-4 h-full">
          {displayImages.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-rows-2 gap-4 h-full">
        <img
          src={displayImages[0].imageUrl}
          alt="Product image 1"
          className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => openModal(0)}
        />
        <div className="grid grid-cols-3 gap-4">
          {displayImages.slice(1, 4).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.imageUrl}
                alt={`Product image ${index + 2}`}
                className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                onClick={() => openModal(index + 1)}
              />
              {index === 2 && imageCount > 4 && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer"
                  onClick={() => setShowAllImages(true)}
                >
                  <span className="text-white text-2xl font-bold">
                    +{imageCount - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const handleAddToCart = async () => {
    if (!localStorage.getItem("userData")) {
      navigate("/login");
      return;
    }

    if (Object.keys(selectedAttributes).length !== groupedOptions.length) {
      alert("Please select all required options before adding to cart.");
      return;
    }

    const customization = JSON.stringify(selectedAttributes);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const accountId = userData.accountId;
    const cartItem = {
      productId: productId,
      quantity: quantity,
      customization: customization,
      accountId: accountId,
    };

    try {
      const response = await fetch(
        "http://14.225.210.128:8080/api/Cart/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Lưu đối tượng người dùng vào localStorage
        localStorage.setItem("cartId", data.cartId);
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert(
        "An error occurred while adding the product to cart. Please try again."
      );
    }
  };
  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-8">
      <div className="md:w-1/2 h-[600px]">{renderImages()}</div>
      <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold mb-6 text-[#F0A0AD]">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </p>
        <p className="mb-4">{product.description}</p>
        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quantity
          </label>
          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="bg-[#F0A0AD] text-white p-2 rounded-l-md"
              aria-label="Decrease quantity"
            >
              <FaMinus />
            </button>

            <p className="w-16 text-center border-t border-b border-[#F0A0AD] p-[0.2rem]">
              {quantity}
            </p>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="bg-[#F0A0AD] text-white p-2 rounded-r-md"
              aria-label="Increase quantity"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        {groupedOptions.map((group) => (
          <div key={group.optionName} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {group.optionName}
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {group.values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleAttributeChange(group.optionName, value)}
                  className={`px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    selectedAttributes[group.optionName] === value
                      ? "bg-[#F0A0AD] text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  aria-label={`Select ${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
            {errors[group.optionName] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[group.optionName]}
              </p>
            )}
          </div>
        ))}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#F0A0AD] text-white py-3 px-6 rounded-md font-medium hover:bg-[#E090A0] transition-colors duration-200"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <img
              src={product.images[currentImageIndex].imageUrl}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              aria-label="Previous image"
            >
              <BsChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              aria-label="Next image"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
