import React from 'react';
import { Link } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import BookingCard from '../components/BookingCard';
import type { Booking } from '../types';

interface BookingsScreenProps {
  bookings: Booking[];
}

const BookingsScreen: React.FC<BookingsScreenProps> = ({ bookings }) => {
  return (
    <ScreenLayout>
      <header className="bg-brand-dark p-4 shadow-md sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-brand-red">My Bookings</h1>
      </header>
      <div className="p-4 space-y-4">
        {bookings.length > 0 ? (
          bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-semibold text-brand-gray">No Bookings Yet</h2>
            <p className="text-brand-light-gray mt-2 mb-6">
              Looks like you haven't booked any movies.
            </p>
            <Link
              to="/home"
              className="bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
};

export default BookingsScreen;