
import React from 'react';
import ScreenLayout from '../components/ScreenLayout';

interface PlaceholderScreenProps {
  title: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  return (
    <ScreenLayout>
      <header className="bg-white p-4 shadow-md sticky top-0 z-40">
          <h1 className="text-2xl font-bold text-brand-red">{title}</h1>
      </header>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
          <p className="text-gray-500 mt-2">This feature is coming soon!</p>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default PlaceholderScreen;
