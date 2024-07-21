import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './App.css';
import Header from './components/PageComponents/Header/Header';
import Footer from './components/PageComponents/Footer';
import ScrollToTop from './components/Common/ScrollToTop';

const App: React.FC = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/login']; // Add paths where you don't want header and footer

  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col">
      {showHeaderFooter && <Header />}
      <ScrollToTop>
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </ScrollToTop>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
