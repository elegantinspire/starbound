import React, { useEffect, useState } from 'react';
import { fetchWishlist } from '../services/api';

interface WishlistItem {
  id: number;
  destination: string;
  description: string;
}

const WishlistItems: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const data = await fetchWishlist();
        setWishlist(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Could not fetch wishlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getWishlist();
  }, []);

  if (loading) {
    return <div className="container p-6 bg-white">Loading...</div>;
  }

  if (error) {
    return <div className="container p-6 bg-white">{error}</div>;
  }

  return (
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Wishlist</h3>
      {wishlist.length === 0 ? (
        <p className="text-gray-700">No wishlist items found.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => (
            <li key={item.id} className="p-4 bg-gray-100 rounded-md shadow">
              <h4 className="text-xl font-bold">{item.destination}</h4>
              <p className="text-gray-700">Description: {item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Wishlist: React.FC = () => {
  return <WishlistItems />;
};

export default Wishlist;
