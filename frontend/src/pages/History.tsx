import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/api';

const HistoryList: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetchHistory();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching travel history:', error);
      }
    };

    getHistory();
  }, []);

  return (
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">History</h3>
      {trips.length === 0 ? (
        <p className="text-gray-700">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li key={trip.id} className="p-4 bg-gray-100 rounded-md shadow">
              <h4 className="text-xl font-bold">{trip.destination}</h4>
              <p className="text-gray-700">
                Date: {new Date(trip.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Duration: {trip.duration} days</p>
              <p className="text-gray-700">Description: {trip.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const History: React.FC = () => {
  return <HistoryList />;
};

export default History;
