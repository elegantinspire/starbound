import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, fetchProfile } from '../services/api';
import { User, AuthContextType, Profile } from '../types/types';
import LogoutModal from '../components/Models/LogOutModal';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails();
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
      const profileData = await fetchProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (tokens: { access: string; refresh: string }) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/'); // Redirect to home page
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, profile, login, logout }}
    >
      {children}
      <LogoutModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)} // Handle cancel action
      />
    </AuthContext.Provider>
  );
};
