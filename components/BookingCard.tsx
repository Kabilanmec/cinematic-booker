import React from 'react';
import type { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { movie, theatre, showtime, selectedSeats, discount, totalPrice, id } = booking;
  const seatNumbers = selectedSeats.map(s => `R${s.row + 1}C${s.col}`).join(', ');
  
  const qrData = JSON.stringify({
      bookingId: id,
      movie: movie.title,
      theatre: theatre.name,
      showtime: showtime.time,
      seats: seatNumbers
  });
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="bg-brand-dark rounded-lg shadow-md overflow-hidden flex">
      <div className="w-1/3 md:w-1/4">
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
      </div>
      <div className="w-2/3 md:w-3/4 p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-brand-gray">{movie.title}</h3>
          <p className="text-sm text-brand-light-gray mt-1">{theatre.name}</p>
          <div className="mt-3 text-sm space-y-1 text-brand-light-gray">
            <div className="flex items-center">
              <span className="font-semibold w-16 text-brand-gray">Time:</span>
              <span>{showtime.time} ({showtime.screenType})</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold w-16 text-brand-gray">Seats:</span>
              <span className="flex-1 break-words">{seatNumbers}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-end">
          <div>
            {discount > 0 && (
              <span className="text-xs bg-green-900/50 text-green-400 font-semibold px-2 py-1 rounded-full">
                Discount Applied
              </span>
            )}
            <p className="text-sm font-semibold text-brand-light-gray mt-1">Total Paid: <span className="text-lg font-bold text-brand-red">₹{totalPrice.toFixed(2)}</span></p>
          </div>
          <img 
              src={qrCodeUrl} 
              alt="Booking QR Code" 
              className="w-12 h-12 rounded-md border border-gray-600 p-0.5 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;