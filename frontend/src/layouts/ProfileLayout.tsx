import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './ProfileLayout.css'; // Custom CSS for additional styling
import { useAuth } from '../context/AuthContext'; // Adjust the path accordingly
import ProfileSidebar from '../components/PageComponents/Sidebar/ProfileSidebar/ProfileSidebar';

const ProfileLayout: React.FC = () => {
  const { profile } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      setError('No profile data available');
    }
  }, [profile]);

  return (
    <div className="profile-content">
      <div className="flex items-start justify-between">
        <ProfileSidebar profile={profile} />
        <div className="flex flex-col w-full pl-0 md:space-y-4">
          {error ? <div>{error}</div> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
