import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const RefundOrderPage = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    refundAmount: "",
    refundReason: "",
    contactEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://personailize.store/api/Refund",
        {
          orderId: parseInt(formData.orderId),
          refundAmount: parseFloat(formData.refundAmount),
          refundDate: new Date().toISOString(),
          refundReason: formData.refundReason,
          contactEmail: formData.contactEmail,
          refundStatus: "Pending",
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
          },
        }
      );
      console.log("Refund request submitted:", response.data);
      // Reset form after submission
      setFormData({
        orderId: "",
        refundAmount: "",
        refundReason: "",
        contactEmail: "",
      });
    } catch (error) {
      console.error("Error submitting refund request:", error);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Request a Refund
        </h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="orderId" className="block mb-2">
              Order ID
            </label>
            <input
              type="number"
              id="orderId"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="refundAmount" className="block mb-2">
              Refund Amount
            </label>
            <input
              type="number"
              step="0.01"
              id="refundAmount"
              name="refundAmount"
              value={formData.refundAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="refundReason" className="block mb-2">
              Reason for Refund
            </label>
            <textarea
              id="refundReason"
              name="refundReason"
              value={formData.refundReason}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="contactEmail" className="block mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Refund Request
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RefundOrderPage;
