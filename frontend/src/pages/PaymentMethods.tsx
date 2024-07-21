import React, { useState } from 'react';

const AddPaymentMethod: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment method logic
    console.log('Payment Method Added:', formData);
    setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
  };

  return (
    <div className="p-6 bg-white max-w-[600px]">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        Add Payment Method
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="cardHolder"
          >
            Card Holder
          </label>
          <input
            id="cardHolder"
            name="cardHolder"
            type="text"
            value={formData.cardHolder}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={handleChange}
              className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              value={formData.cvv}
              onChange={handleChange}
              className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Payment Method
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentMethod;
