import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import ProjectsPage from './pages/ProjectsPage';
import CertificationsPage from './pages/CertificationsPage';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="certifications" element={<CertificationsPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
