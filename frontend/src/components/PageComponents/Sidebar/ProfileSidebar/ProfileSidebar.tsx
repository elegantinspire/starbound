import React from 'react';
import { Profile } from '../../../../types/types';
import SidebarLink from './SidebarLink';
import './ProfileSidebar.css'; // Your custom CSS
import ProfileImage from '../../../UI/ProfileImage/ProfileImage';

interface ProfileProps {
  profile: Profile | null;
}

const Sidebar: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="sidebar text-gray-500 ">
      <div className="profile-summary p-4">
        <h2 className="text-left text-xl mt-2">
          {profile ? (
            <div className="flex items-center">
              <div className="mr-4">
                <ProfileImage
                  src={profile.image}
                  alt={`${profile.user.first_name} ${profile.user.last_name}`}
                />
              </div>
              <div>
                <div className="text-sm">
                  {profile.user.first_name} {profile.user.last_name}
                </div>
                <p className="text-left text-gray-400 text-xs">
                  Traveler & Adventurer
                </p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </h2>
      </div>

      <div className="sidebar-content h-screen overflow-y-auto">
        <nav className="navigation-links">
          <ul>
            <SidebarLink to="/profile" icon="fa-home">
              Dashboard
            </SidebarLink>
            <SidebarLink to="/wishlist" icon="fa-heart">
              Wishlist
            </SidebarLink>
            <SidebarLink to="/orders" icon="fa-calendar">
              Orders
            </SidebarLink>
            <SidebarLink to="/history" icon="fa-scroll">
              History
            </SidebarLink>
          </ul>
        </nav>
        <nav className="personal-info mt-3">
          <h3 className="text-base p-2">Personal Information</h3>
          <ul>
            <SidebarLink to="/edit-profile" icon="fa-user">
              Edit Profile
            </SidebarLink>
            <SidebarLink to="/account" icon="fa-cog">
              Account
            </SidebarLink>
            <SidebarLink to="/payment-methods" icon="fa-credit-card">
              Payment Methods
            </SidebarLink>
            <SidebarLink to="/preferences" icon="fa-globe">
              Preferences
            </SidebarLink>
          </ul>
        </nav>
        <nav className="notifications mt-3">
          <h3 className="text-base p-2">Notifications</h3>
          <ul>
            <SidebarLink to="/messages" icon="fa-envelope">
              Messages
            </SidebarLink>
            <SidebarLink to="/notifications" icon="fa-bell">
              Notifications
            </SidebarLink>
            <SidebarLink to="/updates" icon="fa-bullhorn">
              Updates
            </SidebarLink>
          </ul>
        </nav>
        <nav className="support mt-3">
          <h3 className="text-base p-2">Support</h3>
          <ul>
            <SidebarLink to="/contact-support" icon="fa-phone">
              Contact Support
            </SidebarLink>
            <SidebarLink to="/help-center" icon="fa-comments">
              Help Center
            </SidebarLink>
            <SidebarLink to="/feedback" icon="fa-pen">
              Feedback
            </SidebarLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
