import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingsScreen from './screens/BookingsScreen';
import OffersScreen from './screens/OffersScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import type { Booking } from './types';

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prevBookings => [newBooking, ...prevBookings]);
  };

  return (
    <div className="font-sans antialiased text-brand-gray">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/movie/:id" element={<MovieDetailsScreen />} />
          <Route path="/book/:id" element={<SeatSelectionScreen />} />
          <Route 
            path="/confirmation" 
            element={<ConfirmationScreen onConfirmBooking={handleAddBooking} />} 
          />
          <Route path="/bookings" element={<BookingsScreen bookings={bookings} />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/offers" element={<OffersScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;