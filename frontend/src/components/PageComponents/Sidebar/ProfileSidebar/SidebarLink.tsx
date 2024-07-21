import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: string;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => {
  return (
    <li className="p-2">
      <Link to={to} className="flex items-center">
        <i className={`fas ${icon} mr-2`}></i>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
