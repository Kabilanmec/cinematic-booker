import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seat from '../components/Seat';
import type { Seat as SeatType } from '../types';
import { BASE_TICKET_PRICE, SEAT_TYPE_PRICES } from '../constants';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const generateSeatLayout = (): (SeatType | null)[][] => {
    const layout: (SeatType | null)[][] = [];
    const rows = 14;
    const cols = 22; 
    for (let i = 0; i < rows; i++) {
        const row: (SeatType | null)[] = [];
        let colNum = 1;
        for (let j = 0; j < cols; j++) {
            // Add aisles
            if (j === 4 || j === 17) {
                 row.push(null); // Use null for aisles
            } else {
                 const isBooked = Math.random() > 0.85;
                 let type: 'regular' | 'premium' | 'recliner' = 'regular';
                 if (i >= 4 && i <= 9) type = 'premium';
                 if (i >= 10) type = 'recliner';

                 row.push({
                     id: `${i}-${j}`,
                     row: i,
                     col: colNum,
                     status: isBooked ? 'booked' : 'available',
                     type: type,
                 });
                 colNum++;
            }
        }
        layout.push(row);
    }
    return layout;
};


const SeatSelectionScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { movie, theatre, showtime } = location.state || {};
    
    const [seats, setSeats] = useState<(SeatType | null)[][]>(generateSeatLayout());
    const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
    const [isPriceAnimating, setIsPriceAnimating] = useState(false);

    const handleSelectSeat = (seatId: string) => {
        let updatedSeatForSelection: SeatType | null = null;

        const newSeats = seats.map(row =>
            row.map(seat => {
                if (seat && seat.id === seatId && (seat.status === 'available' || seat.status === 'selected')) {
                    // Fix: Explicitly typed `newStatus` to prevent TypeScript from widening the type to a generic `string`.
                    // This ensures that `updatedSeat` conforms to the `SeatType` interface.
                    const newStatus: 'available' | 'selected' = seat.status === 'available' ? 'selected' : 'available';
                    const updatedSeat = { ...seat, status: newStatus };
                    updatedSeatForSelection = updatedSeat;
                    return updatedSeat;
                }
                return seat;
            })
        );
        
        if (updatedSeatForSelection) {
            setSeats(newSeats);
            if (updatedSeatForSelection.status === 'selected') {
                setSelectedSeats([...selectedSeats, updatedSeatForSelection]);
            } else {
                setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
            }
        }
    };

    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((total, seat) => {
            const seatPrice = BASE_TICKET_PRICE + SEAT_TYPE_PRICES[seat.type];
            return total + seatPrice;
        }, 0);
    }, [selectedSeats]);

    useEffect(() => {
        if (selectedSeats.length > 0) {
            setIsPriceAnimating(true);
            const timer = setTimeout(() => setIsPriceAnimating(false), 600); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [totalPrice]);

    const ticketCount = selectedSeats.length;
    
    const selectedSeatSummary = useMemo(() => {
        return selectedSeats.map(s => `R${s.row+1}C${s.col}`).join(', ');
    }, [selectedSeats]);

    if (!movie || !theatre || !showtime) {
        return <div className="p-4 text-center">Booking information is missing. Please go back.</div>;
    }
    
    const handleProceed = () => {
      navigate('/confirmation', { state: { movie, theatre, showtime, selectedSeats, totalPrice } });
    };

    return (
        <div className="bg-brand-dark min-h-screen flex flex-col">
            <header className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center shadow-lg">
                <button onClick={() => navigate(-1)} className="mr-4"><BackIcon /></button>
                <div>
                    <h1 className="font-bold text-lg">{movie.title}</h1>
                    <p className="text-sm text-gray-300">{theatre.name} | Today, {showtime.time}</p>
                </div>
            </header>

            <div className="flex-grow p-4 overflow-hidden flex flex-col">
                <div className="bg-black p-4 rounded-lg shadow-2xl flex-grow flex justify-center items-center">
                    <div className="flex flex-col-reverse items-center w-full">
                        {/* Screen */}
                        <div className="w-full max-w-2xl mb-6">
                            <div 
                                className="h-8 w-3/4 mx-auto border-b-4 border-gray-500 rounded-b-[50%] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)]"
                            ></div>
                            <p className="text-center text-gray-500 text-xs mt-2 font-semibold tracking-widest">S C R E E N</p>
                        </div>
                        
                        {/* Seats */}
                        <div className="w-full overflow-x-auto scrollbar-hide py-2 relative">
                            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
                            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
                            <div className="inline-block px-8">
                                <div className="flex flex-col items-center space-y-1">
                                  {seats.map((row, rowIndex) => (
                                      <div key={rowIndex} className="flex justify-center flex-nowrap">
                                          {row.map((seat, seatIndex) => (
                                              seat ? (
                                                <Seat key={seat.id} seat={seat} onSelect={handleSelectSeat} />
                                              ) : (
                                                <div key={`space-${rowIndex}-${seatIndex}`} className="flex-shrink-0 w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 m-0.5" />
                                              )
                                          ))}
                                      </div>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-shrink-0 grid grid-cols-3 sm:grid-cols-5 gap-x-4 gap-y-2 mt-4 text-xs text-gray-300 p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center"><div className="w-4 h-4 rounded-t-md bg-gray-200 mr-2"></div>Regular</div>
                    <div className="flex items-center"><div className="w-4 h-4 rounded-t-md bg-blue-300 mr-2"></div>Premium</div>
                    <div className="flex items-center"><div className="w-4 h-4 rounded-t-md bg-yellow-300 mr-2"></div>Recliner</div>
                    <div className="flex items-center"><div className="w-4 h-4 rounded-t-md bg-green-500 mr-2"></div>Selected</div>
                    <div className="flex items-center"><div className="w-4 h-4 rounded-t-md bg-gray-400 mr-2"></div>Booked</div>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="sticky bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg p-4 border-t border-white/20 shadow-2xl flex flex-col sm:flex-row justify-between items-center max-w-3xl mx-auto w-full rounded-t-xl animate-fadeInUp">
                    <div className="text-white mb-3 sm:mb-0">
                        <p className="text-sm text-gray-300 font-semibold">{ticketCount} Ticket(s) Selected</p>
                        <p className="text-xs text-gray-400 max-w-xs truncate">{selectedSeatSummary}</p>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-xl font-bold text-white mr-4 p-2 rounded-lg ${isPriceAnimating ? 'animate-price-update' : ''}`}>₹{totalPrice.toFixed(2)}</span>
                        <button 
                            onClick={handleProceed}
                            className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105">
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectionScreen;