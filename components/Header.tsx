import React from 'react';
import { TAMIL_NADU_DISTRICTS } from '../constants';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedDistrict: string;
    setSelectedDistrict: (district: string) => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, selectedDistrict, setSelectedDistrict }) => {
    return (
        <header className="bg-brand-dark p-4 shadow-md sticky top-0 z-40">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-comic">
                    <span className="text-brand-red">Cinematic</span>
                    <span className="text-brand-yellow"> Booker</span>
                </h1>
                <div className="relative">
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="appearance-none bg-gray-700 border border-gray-600 rounded-full py-1 pl-3 pr-8 text-sm text-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                        {TAMIL_NADU_DISTRICTS.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for Movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-brand-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
            </div>
        </header>
    );
};

export default Header;