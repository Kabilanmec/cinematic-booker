import React from 'react';
import type { Booking } from '../types';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  booking
}) => {
  if (!isOpen) return null;

  const { movie, theatre, showtime, selectedSeats, subtotal, discount, totalPrice, id } = booking;
  const seatNumbers = selectedSeats.map((s: { row: number, col: number }) => `R${s.row+1}C${s.col}`).join(', ');

  const qrData = JSON.stringify({
      bookingId: id,
      movie: movie.title,
      theatre: theatre.name,
      showtime: showtime.time,
      seats: seatNumbers,
      total: totalPrice.toFixed(2)
  });
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-brand-dark text-brand-gray rounded-2xl shadow-xl w-full max-w-sm mx-auto transform transition-transform duration-300 scale-100">
        <div className="relative p-6 text-center">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-300" aria-label="Close">
                <CloseIcon />
            </button>
            <CheckCircleIcon />
            <h2 className="text-2xl font-bold text-brand-gray mt-4">Booking Confirmed!</h2>
            <p className="text-sm text-brand-light-gray mt-1">Your e-ticket has been sent.</p>
        </div>
        
        <div className="px-6">
            <img 
                src={qrCodeUrl} 
                alt="Booking QR Code" 
                className="w-32 h-32 mx-auto rounded-lg border border-gray-600 p-1 bg-white"
            />
        </div>

        <div className="p-6 space-y-3 text-sm border-b border-white/10">
            <h3 className="text-lg font-bold text-center mb-4">{movie.title}</h3>
            <div className="flex justify-between">
                <span className="text-brand-light-gray">Theatre</span>
                <span className="font-semibold text-right">{theatre.name}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-brand-light-gray">Date & Time</span>
                <span className="font-semibold text-right">Today, {showtime.time}</span>
            </div>
            <div className="flex justify-between items-start">
                <span className="text-brand-light-gray">Seats ({selectedSeats.length})</span>
                <span className="font-semibold text-right max-w-[60%] break-words">{seatNumbers}</span>
            </div>
        </div>
        
        <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
                <span className="text-brand-light-gray">Subtotal</span>
                <span className="font-semibold text-right">₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-400">
                    <span className="text-brand-light-gray">Discount</span>
                    <span className="font-semibold text-right">- ₹{discount.toFixed(2)}</span>
                </div>
            )}
            <div className="flex justify-between items-center text-base">
                <span className="font-bold text-brand-gray">Total Paid</span>
                <span className="font-bold text-brand-red">₹{totalPrice.toFixed(2)}</span>
            </div>
        </div>


        <div className="p-6 bg-black/20 rounded-b-2xl">
            <button
                onClick={onClose}
                className="w-full bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors text-lg"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;