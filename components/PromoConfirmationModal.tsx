import React from 'react';

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-red mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface PromoConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  discountAmount: number;
}

const PromoConfirmationModal: React.FC<PromoConfirmationModalProps> = ({
  isOpen,
  onClose,
  discountAmount
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-brand-dark text-brand-gray rounded-2xl shadow-xl w-full max-w-xs mx-auto transform transition-transform duration-300 scale-100 text-center animate-fadeInUp">
        <div className="relative p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-300" aria-label="Close">
                <CloseIcon />
            </button>
            <GiftIcon />
            <h2 className="text-2xl font-bold text-brand-gray mt-4">Promo Applied!</h2>
            <p className="text-brand-light-gray mt-2">You've successfully unlocked a <span className="font-bold text-brand-gray">15% discount</span> on your booking.</p>
             <div className="mt-4 bg-green-900/50 border border-green-500/30 rounded-lg p-3">
                <p className="text-sm text-brand-light-gray">Discount Amount</p>
                <p className="text-2xl font-bold text-green-400">- ₹{discountAmount.toFixed(2)}</p>
            </div>
        </div>
        
        <div className="p-6 bg-black/20 rounded-b-2xl">
            <button
                onClick={onClose}
                className="w-full bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
                Awesome!
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromoConfirmationModal;