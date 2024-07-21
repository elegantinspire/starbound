import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';

interface OrderItem {
  id: number;
  destination: string;
  start_date: string;
  end_date: string;
  status: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((item) => (
            <li key={item.id} className="p-4 bg-gray-100">
              <h4 className="text-xl font-bold">{item.destination}</h4>
              <p className="text-gray-700">
                Start Date: {new Date(item.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                End Date: {new Date(item.end_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Status: {item.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Orders: React.FC = () => {
  return <OrderList />;
};

export default Orders;
