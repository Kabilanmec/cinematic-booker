import React from 'react';
import type { Seat as SeatType } from '../types';
import { BASE_TICKET_PRICE, SEAT_TYPE_PRICES } from '../constants';

interface SeatProps {
  seat: SeatType;
  onSelect: (seatId: string) => void;
}

const Seat: React.FC<SeatProps> = ({ seat, onSelect }) => {
  const getSeatClass = () => {
    // Base class now includes layout, dimensions, and styling for a single element to match aisle spacers.
    let baseClass = 'relative flex-shrink-0 m-0.5 w-4 sm:w-5 md:w-6 h-3 sm:h-4 md:h-5 flex items-center justify-center rounded-t-md text-[0.4rem] sm:text-[0.5rem] font-semibold transition-all duration-200 transform hover:scale-110';
    let statusClass = '';

    if (seat.status === 'booked') {
      statusClass = `bg-gray-400 cursor-not-allowed shadow-inner`;
    } else if (seat.status === 'selected') {
      // The scale-110 is now part of the base hover effect, but we can keep it here to make it permanent for selected seats
      statusClass = `bg-green-500 text-white cursor-pointer shadow-lg scale-110`;
    } else {
        // Available seats by type
        switch (seat.type) {
        case 'recliner':
            statusClass = `bg-yellow-300 hover:bg-yellow-400 text-yellow-800 cursor-pointer shadow-md`;
            break;
        case 'premium':
            statusClass = `bg-blue-300 hover:bg-blue-400 text-blue-800 cursor-pointer shadow-md`;
            break;
        case 'regular':
        default:
            statusClass = `bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer shadow-sm`;
        }
    }
    return `${baseClass} ${statusClass}`;
  };
  
  const getSeatPrice = () => {
    return BASE_TICKET_PRICE + SEAT_TYPE_PRICES[seat.type];
  }

  return (
    <div
      onClick={() => seat.status !== 'booked' && onSelect(seat.id)}
      className={getSeatClass()}
      title={seat.status !== 'booked' ? `${seat.type.charAt(0).toUpperCase() + seat.type.slice(1)} - ₹${getSeatPrice()}`: ''}
    >
      {seat.col}
    </div>
  );
};

export default Seat;