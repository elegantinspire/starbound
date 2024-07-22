import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthenticatedRoutes from './context/AuthenticatedRoutes';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home/Home';
import Posts from './pages/Posts';
import SinglePost from './pages/SinglePost';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import FAQPage from './pages/Faq';
import ProfileLayout from './layouts/ProfileLayout';
import EditProfile from './pages/EditProfile';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';
import ContactSupport from './pages/ContacSupport';
import Updates from './pages/Updates';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import History from './pages/History';
import Preferences from './pages/Preferences';
import Wishlist from './pages/WishList';
import Account from './pages/Account';
import PaymentMethods from './pages/PaymentMethods';
import Orders from './pages/Orders';
import LoadingSpinner from './components/Common/Loading';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const defaultAuthenticatedRoute = '/';
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to={defaultAuthenticatedRoute} />
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/signin"
        element={
          isAuthenticated ? (
            <Navigate to={defaultAuthenticatedRoute} />
          ) : (
            <SignIn />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        element={<AuthenticatedRoutes isAuthenticated={isAuthenticated} />}
      >
        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/history" element={<History />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:slug" element={<SinglePost />} />
      <Route path="/faq/" element={<FAQPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
