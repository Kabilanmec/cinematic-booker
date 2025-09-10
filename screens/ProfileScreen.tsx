
import React, { useState, useRef } from 'react';
import ScreenLayout from '../components/ScreenLayout';

const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const ProfileScreen: React.FC = () => {
    const [profileData, setProfileData] = useState({
        name: 'keerthi',
        phone: '1234567890',
        email: 'keerthishankar@gmail.com',
        profilePic: '',
    });
    const [message, setMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileData(prev => ({ ...prev, profilePic: URL.createObjectURL(file) }));
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    
    const handleSaveChanges = () => {
        console.log('Saving data:', profileData);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <ScreenLayout>
            <header className="bg-brand-dark p-4 shadow-md sticky top-0 z-40">
                <h1 className="text-2xl font-bold text-brand-red">My Profile</h1>
            </header>
            <div className="p-4 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                           {profileData.profilePic ? (
                                <img src={profileData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <UserCircleIcon />
                            )}
                        </div>
                        <button 
                            onClick={triggerFileSelect}
                            className="absolute bottom-0 right-0 bg-brand-red rounded-full p-2 hover:bg-red-700 transition-colors"
                            aria-label="Change profile picture"
                        >
                           <CameraIcon />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleProfilePicChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-light-gray">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-brand-gray focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-light-gray">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-brand-gray focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-light-gray">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-brand-gray focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
                        />
                    </div>
                </div>
                
                <button
                    onClick={handleSaveChanges}
                    className="w-full bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors text-lg"
                >
                    Save Changes
                </button>
                {message && (
                    <div className="text-center text-green-400 font-semibold">{message}</div>
                )}
            </div>
        </ScreenLayout>
    );
};

export default ProfileScreen;