import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/ui/Cursor';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Cursor />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
