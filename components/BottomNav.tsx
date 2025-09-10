
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" /></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" /></svg>
);


const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
    const activeClass = "text-brand-red";
    const inactiveClass = "text-brand-light-gray";

    return (
        <NavLink to={to} className={({ isActive }) => `${isActive ? activeClass : inactiveClass} flex flex-col items-center justify-center transition-colors duration-200`}>
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </NavLink>
    );
};

const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-brand-dark border-t border-white/10 shadow-lg flex justify-around items-center z-50 max-w-lg mx-auto">
            <NavItem to="/home" icon={<HomeIcon />} label="Home" />
            <NavItem to="/bookings" icon={<TicketIcon />} label="Bookings" />
            <NavItem to="/profile" icon={<UserIcon />} label="Profile" />
            <NavItem to="/offers" icon={<GiftIcon />} label="Offers" />
        </nav>
    );
};

export default BottomNav;