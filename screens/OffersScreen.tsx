import React from 'react';
import ScreenLayout from '../components/ScreenLayout';

const OffersScreen: React.FC = () => {
  return (
    <ScreenLayout>
      <header className="bg-brand-dark p-4 shadow-md sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-brand-red">Offers & Promotions</h1>
      </header>
      <div className="p-4 space-y-4">
        <div className="bg-brand-dark rounded-lg shadow-lg overflow-hidden border border-yellow-500/50">
          <div className="p-5 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-white text-center">
            <h2 className="text-3xl font-bold">Diwali Dhamaka!</h2>
          </div>
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-brand-gray">Get 15% OFF</h3>
            <p className="text-brand-light-gray mt-1">on all movie bookings above ₹1000.</p>
            <p className="text-sm text-brand-light-gray mt-4">Use coupon code:</p>
            <div className="mt-1 inline-block bg-black/30 border-2 border-dashed border-gray-500 rounded-lg px-4 py-2">
              <span className="text-lg font-bold text-brand-red tracking-widest">DIWALI15</span>
            </div>
            <p className="text-xs text-gray-500 mt-3">Offer valid for a limited time only.</p>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default OffersScreen;