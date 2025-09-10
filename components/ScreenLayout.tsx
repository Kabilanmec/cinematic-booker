
import React from 'react';
import BottomNav from './BottomNav';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default ScreenLayout;