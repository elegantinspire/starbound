import React, { useState } from 'react';
import UserIcon from '../../UI/Icons/User';
import BellIcon from '../../UI/Icons/Bell';
import SearchIcon from '../../UI/Icons/Search';
import LogoIcon from '../../UI/Icons/Logo';
import MenuIcon from '../../UI/Icons/Menu';
import Navigation from '../../Navigation/Navigation';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isAuthenticated, signout } = useAuth();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const menuItems = [
    {
      label: 'Products',
      href: '/products',
      subItems: [
        { label: 'New Arrivals', href: '/products/new-arrivals' },
        { label: 'Best Sellers', href: '/products/best-sellers' },
        { label: 'Trending', href: '/products/trending' },
        { label: 'Sale', href: '/products/sale' },
        { label: 'Gift Cards', href: '/products/gift-cards' },
      ],
    },
    {
      label: 'Services',
      href: '/services',
      subItems: [
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'Customer Support', href: '/services/customer-support' },
        { label: 'Customization', href: '/services/customization' },
        { label: 'Training', href: '/services/training' },
        { label: 'Maintenance', href: '/services/maintenance' },
      ],
    },
    {
      label: 'About Us',
      href: '/about',
      subItems: [
        { label: 'Our Story', href: '/about/our-story' },
        { label: 'Team', href: '/about/team' },
        { label: 'Careers', href: '/about/careers' },
        { label: 'Press', href: '/about/press' },
        { label: 'Testimonials', href: '/about/testimonials' },
      ],
    },
    {
      label: 'Blog',
      href: '/blog',
      subItems: [
        { label: 'Latest Posts', href: '/posts' },
        { label: 'Guides', href: '/posts/guides' },
        { label: 'News', href: '/posts/news' },
        { label: 'Reviews', href: '/posts/reviews' },
        { label: 'Interviews', href: '/posts/interviews' },
      ],
    },
    {
      label: 'Resources',
      href: '/resources',
      megaMenu: true,
    },
    {
      label: 'Contact',
      href: '/contact',
      subItems: [
        { label: 'Support', href: '/contact/support' },
        { label: 'Sales', href: '/contact/sales' },
        { label: 'Partnerships', href: '/contact/partnerships' },
        { label: 'Feedback', href: '/contact/feedback' },
        { label: 'FAQ', href: '/contact/faq' },
      ],
    },
  ];

  return (
    <div className="sticky top-0 w-full z-40">
      <div className="relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
        <div className="container">
          <div className="h-20 flex justify-between">
            <div className="flex items-center lg:hidden flex-1">
              <button className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center">
                <MenuIcon />
              </button>
            </div>
            <div className="lg:flex-1 flex items-center">
              <a
                className="inline-block text-primary-6000 flex-shrink-0"
                href="/"
              >
                <LogoIcon />
              </a>
            </div>
            <div className="flex-[2] hidden lg:flex justify-center mx-4">
              <ul className="items-center flex">
                {menuItems.map((item) => (
                  <Navigation key={item.label} item={item} />
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end text-slate-700 dark:text-slate-100">
              <button className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center">
                <SearchIcon />
              </button>
              <div className="hidden sm:block relative">
                <button className="text-opacity-90 group p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
                  <BellIcon />
                </button>
              </div>

              {isAuthenticated ? (
                <>
                  <div className="hidden md:flex items-center">
                    <Link
                      to="/profile"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center"
                      onClick={closeMobileMenu}
                    >
                      <UserIcon />
                    </Link>
                  </div>
                  <div className="hidden md:flex items-center">
                    <button
                      onClick={signout}
                      className="nav-links flex items-center h-full px-1 font-semibold text-gray-800 hover:text-blue-600 hover:border-b-4 border-white"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center">
                  <Link
                    to="/signin"
                    className="nav-links flex items-center h-full px-1 font-semibold text-gray-800 hover:text-blue-600 hover:border-b-4 border-white"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
