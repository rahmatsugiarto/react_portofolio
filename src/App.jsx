import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LoadingScreen from './components/ui/LoadingScreen';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));

import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Only show loading screen on initial homepage visit
  const showLoadingScreen = isLoading && location.pathname === '/';

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <ScrollToTop />
      {showLoadingScreen && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      <div style={{ 
        visibility: showLoadingScreen ? 'hidden' : 'visible',
        opacity: showLoadingScreen ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="certifications" element={<CertificationsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <SpeedInsights />
    </>
  );
}

export default App;
