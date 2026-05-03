import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [savedDoctors, setSavedDoctors] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vs_saved') || '[]'); }
    catch { return []; }
  });

  const [compareDoctors, setCompareDoctors] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vs_compare') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('vs_saved', JSON.stringify(savedDoctors));
  }, [savedDoctors]);

  useEffect(() => {
    localStorage.setItem('vs_compare', JSON.stringify(compareDoctors));
  }, [compareDoctors]);

  const toggleSave = (doctor) => {
    setSavedDoctors(prev =>
      prev.find(d => d.id === doctor.id)
        ? prev.filter(d => d.id !== doctor.id)
        : [...prev, doctor]
    );
  };

  const isSaved = (id) => savedDoctors.some(d => d.id === id);

  const addToCompare = (doctor) => {
    setCompareDoctors(prev => {
      if (prev.find(d => d.id === doctor.id)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, doctor];
    });
  };

  const removeFromCompare = (id) => {
    setCompareDoctors(prev => prev.filter(d => d.id !== id));
  };

  const isInCompare = (id) => compareDoctors.some(d => d.id === id);

  return (
    <AppContext.Provider value={{
      savedDoctors, toggleSave, isSaved,
      compareDoctors, addToCompare, removeFromCompare, isInCompare, setCompareDoctors,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
