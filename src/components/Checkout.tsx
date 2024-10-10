import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
  FaApplePay,
  FaCreditCard,
  FaGooglePay,
  FaPaypal,
} from "react-icons/fa";
import axios from "axios";

const Checkout = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accountId = userData.accountId;
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
    { id: "credit-card", name: "Credit Card", icon: FaCreditCard },
    { id: "paypal", name: "PayPal", icon: FaPaypal },
    { id: "apple-pay", name: "Apple Pay", icon: FaApplePay },
    { id: "google-pay", name: "Google Pay", icon: FaGooglePay },
    { id: "google-pay", name: "Google Pay", icon: FaGooglePay },
  ];

  const handleShippingChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      accountId: accountId,
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
      shippingAddress: deliveryInfo.address,
      shippingFee: 50000,
    };
    console.log(deliveryInfo);
    console.log(orderData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
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
        <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
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
              <label htmlFor="cardNumber" className="block mb-1 font-medium">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="number"
                value={cardDetails.number}
                onChange={handleCardDetailChange}
                className={`w-full p-2 border rounded-md ${
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
                <label htmlFor="expiry" className="block mb-1 font-medium">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailChange}
                  className={`w-full p-2 border rounded-md ${
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
                  className="w-full p-2 border rounded-md"
                  placeholder="123"
                  maxLength="3"
                  aria-label="CVV"
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardName" className="block mb-1 font-medium">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                name="name"
                value={cardDetails.name}
                onChange={handleCardDetailChange}
                className="w-full p-2 border rounded-md"
                placeholder="John Doe"
                aria-label="Cardholder name"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Checkout;
