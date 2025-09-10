import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import BookingConfirmationModal from '../components/BookingConfirmationModal';
import PromoConfirmationModal from '../components/PromoConfirmationModal';
import type { Seat, Movie, Theatre, Showtime, Booking } from '../types';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onClose, 300); // Match animation duration
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const animationClass = isExiting ? 'animate-slideOutUp' : 'animate-slideInDown';

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${bgColor} ${animationClass}`}>
            <p className="font-semibold">{message}</p>
        </div>
    );
};


interface ConfirmationScreenProps {
    onConfirmBooking: (booking: Booking) => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onConfirmBooking }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie, theatre, showtime, selectedSeats, totalPrice: subtotal } = (location.state || {}) as {
        movie: Movie;
        theatre: Theatre;
        showtime: Showtime;
        selectedSeats: Seat[];
        totalPrice: number;
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [toastInfo, setToastInfo] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    
    const finalPrice = subtotal - discount;

    if (!movie || !selectedSeats) {
        return (
            <div className="p-4 text-center">
                <p>No booking information found.</p>
                <Link to="/" className="text-brand-red mt-4 inline-block">Go to Home</Link>
            </div>
        );
    }
    
    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'DIWALI15') {
            if (subtotal > 1000) {
                const calculatedDiscount = subtotal * 0.15;
                setDiscount(calculatedDiscount);
                setIsPromoModalOpen(true);
                setToastInfo(null);
            } else {
                setDiscount(0);
                setToastInfo({ message: 'Subtotal must be over ₹1000.', type: 'error' });
            }
        } else {
            setDiscount(0);
            setToastInfo({ message: 'Invalid promo code.', type: 'error' });
        }
    };

    const handleConfirmBooking = () => {
        const newBooking: Booking = {
            id: `BS-${Date.now()}`,
            movie,
            theatre,
            showtime,
            selectedSeats,
            subtotal,
            discount,
            totalPrice: finalPrice
        };
        onConfirmBooking(newBooking);
        setConfirmedBooking(newBooking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/bookings', { replace: true });
    };

    return (
        <>
            {toastInfo && <Toast message={toastInfo.message} type={toastInfo.type} onClose={() => setToastInfo(null)} />}
            <div className="bg-brand-bg min-h-screen">
                <header className="bg-brand-dark shadow-sm p-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 text-brand-gray"><BackIcon /></button>
                    <h1 className="font-bold text-lg text-brand-gray">Booking Summary</h1>
                </header>

                <div className="p-4">
                    <div className="bg-brand-dark rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-white/10">
                            <img src={movie.posterUrl} alt={movie.title} className="w-20 h-28 object-cover rounded" />
                            <div>
                                <h2 className="text-xl font-bold text-brand-gray">{movie.title}</h2>
                                <p className="text-sm text-brand-light-gray">{movie.genre}</p>
                            </div>
                        </div>
                        
                        <div className="mb-6 pb-6 border-b border-white/10">
                            <h3 className="font-bold mb-3 text-brand-gray">Promo Code</h3>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter DIWALI15"
                                    className="flex-grow block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-brand-gray focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
                                />
                                <button onClick={handleApplyPromo} className="px-4 py-2 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-gray-500">
                                    Apply
                                </button>
                            </div>
                        </div>


                        <div className="space-y-3 text-sm">
                           <div className="flex justify-between">
                                <span className="text-brand-light-gray">Subtotal</span>
                                <span className="font-semibold text-right text-brand-gray">₹{subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                               <div className="flex justify-between text-green-400">
                                    <span className="text-brand-light-gray">Diwali Discount (15%)</span>
                                    <span className="font-semibold text-right">- ₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between mt-4 pt-4 border-t border-white/10 items-center">
                                <span className="text-brand-light-gray font-semibold">Total Amount</span>
                                <span className="text-2xl font-bold text-brand-red">₹{finalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6">
                         <button
                            onClick={handleConfirmBooking}
                            className="w-full bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors text-lg"
                        >
                            Confirm Booking
                        </button>
                        <p className="text-xs text-center text-brand-light-gray mt-2">
                            By clicking, you agree to our Terms & Conditions.
                        </p>
                    </div>
                </div>
            </div>
            {isModalOpen && confirmedBooking && (
                 <BookingConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    booking={confirmedBooking}
                />
            )}
            {isPromoModalOpen && (
                <PromoConfirmationModal 
                    isOpen={isPromoModalOpen}
                    onClose={() => setIsPromoModalOpen(false)}
                    discountAmount={discount}
                />
            )}
        </>
    );
};

export default ConfirmationScreen;