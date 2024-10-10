import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaApplePay,
  FaCreditCard,
  FaGooglePay,
  FaPaypal,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accountId = userData.accountId;
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const cartId = localStorage.getItem("cartId");
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    email: userData.email,
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
  });
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 30000 },
    { id: "express", name: "Express Shipping", price: 100000 },
    { id: "overnight", name: "Overnight Shipping", price: 200000 },
  ];

  const paymentMethods = [
    { id: "payos", name: "PayOS", icon: FaCreditCard },
    { id: "cash", name: "Cash", icon: MdAttachMoney },
  ];
  const handleShippingChange = (e) => {
    console.log(e.target.value);
    setShippingMethod(e.target.value);
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number);
  };

  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry);
  };

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };
  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };

  const applyVoucher = () => {
    // Here you would typically validate the voucher with your backend
    // For this example, we'll just set it as applied if it's not empty
    if (voucher.trim() !== "") {
      setVoucherApplied(true);
    } else {
      setVoucherApplied(false);
    }
  };
  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (!deliveryInfo.address) {
      alert("Vui lòng điền địa chỉ");
      return;
    }
    const orderData = {
      accountId: accountId,
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
      shippingAddress: deliveryInfo.address,
      shippingFee: shippingMethods.find((s) => s.id === shippingMethod)?.price,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://14.225.210.128:8080/api/Cart/checkout`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.checkoutUrl) {
        // Mở trang thanh toán trong tab mới
        window.open(res.data.checkoutUrl, "_blank");
      }
      alert("Create order successful");
      fetchCartItems();
    } catch (error) {
      console.error("Error checkout items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Fetch cart items from API
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://14.225.210.128:8080/api/Cart/account/${accountId}`
      );
      setCartItems(response.data.cartItems);
    } catch (error) {
      setCartItems([]);
      console.error("Error fetching cart items:", error);
    }
  };

  const updateQuantity = async (id, change) => {
    try {
      if (change > 0) {
        await axios.post(
          `http://14.225.210.128:8080/api/Cart/${cartId}/items/${id}/increase`,
          1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `http://14.225.210.128:8080/api/Cart/${cartId}/items/${id}/decrease`,
          1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      fetchCartItems(); // Refresh cart items after update
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = (id) => {
    setItemToRemove(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://14.225.210.128:8080/api/Cart/${cartId}/items/${itemToRemove}`
      );
      fetchCartItems(); // Refresh cart items after removal
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    if (shippingMethod)
      return total + shippingMethods.find((s) => s.id == shippingMethod)?.price;
    return total;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600">
            Add some items to your cart to get started!
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{item.productName}</h2>
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FaTrash />
                  </button>
                </div>
                {item.customization && (
                  <div className="text-gray-600">
                    {/* Parse the JSON string */}
                    {Object.entries(JSON.parse(item.customization)).map(
                      ([key, value]) => (
                        <p key={key}>
                          <span className="font-semibold">{key}:</span> {value}
                        </p>
                      )
                    )}
                  </div>
                )}
                <p className="text-gray-600 mt-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors duration-300"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-4 text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors duration-300"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
                <p className="text-right mt-4 font-semibold">
                  Total:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.totalPrice)}
                </p>
              </div>
            ))}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-black rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Delivery Information
              </h2>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={deliveryInfo.address}
                onChange={handleDeliveryChange}
                className="w-full p-2 border border-black rounded"
                required
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Shipping Method</h3>
              <div className="space-y-4">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg transition-all ${
                      shippingMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={shippingMethod === method.id}
                      onChange={handleShippingChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 flex-grow">{method.name}</span>
                    <span className="font-semibold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(method.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentChange(method.id)}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                      paymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <method.icon className="text-3xl mb-2" />
                    <span>{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="mb-8 transition-all">
                <h3 className="text-xl font-semibold mb-4">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block mb-1 font-medium"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardDetailChange}
                      className={`w-full border-black p-2 border rounded-md ${
                        validateCardNumber(cardDetails.number)
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      aria-label="Card number"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="expiry"
                        className="block mb-1 font-medium"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardDetailChange}
                        className={`w-full p-2 border border-black rounded-md ${
                          validateExpiry(cardDetails.expiry)
                            ? "border-green-500"
                            : "border-gray-300"
                        }`}
                        placeholder="MM/YY"
                        maxLength="5"
                        aria-label="Expiry date"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="cvv" className="block mb-1 font-medium">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailChange}
                        className="w-full p-2 border border-black rounded-md"
                        placeholder="123"
                        maxLength="3"
                        aria-label="CVV"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block mb-1 font-medium"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardDetailChange}
                      className="w-full p-2 border border-black rounded-md"
                      placeholder="John Doe"
                      aria-label="Cardholder name"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Voucher</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={voucher}
                  onChange={handleVoucherChange}
                  className="flex-grow p-2 border rounded-md"
                  placeholder="Enter voucher code"
                />
                <button
                  onClick={applyVoucher}
                  className="bg-[#F0A0AD] text-white px-4 py-2 rounded-md  transition-colors flex items-center"
                >
                  <AiOutlineGift className="mr-2" />
                  {voucherApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {voucherApplied && (
                <p className="text-green-600 mt-2">
                  Voucher applied successfully!
                </p>
              )}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(calculateTotal())}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-[#F0A0AD] text-white py-3 rounded-lg mt-6 font-semibold text-lg  transition-colors duration-300 flex items-center justify-center"
                aria-label="Proceed to checkout"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Removal</h2>
            <p className="mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelRemove}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
