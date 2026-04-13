import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/ui/Cursor';

const MainLayout = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <div className="flex flex-col min-h-screen">
        <Cursor />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default MainLayout;
