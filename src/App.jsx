import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import ComparePage from './pages/ComparePage';
import { AppProvider } from './context/AppContext';

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/doctor/:id" element={<DoctorProfilePage />} />
            <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
