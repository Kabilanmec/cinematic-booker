import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Theatre, Showtime, Movie } from '../types';
import { mockMovies } from '../data/mockData';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ShowtimeButton: React.FC<{ movie: any, theatre: Theatre, show: Showtime }> = ({ movie, theatre, show }) => {
    const availabilityClasses = {
        available: 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
        'filling-fast': 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white',
        'almost-full': 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    };

    const availabilityText = {
        available: 'Available',
        'filling-fast': 'Filling Fast',
        'almost-full': 'Almost Full',
    }

    return (
        <Link
            to={`/book/${movie.id}`}
            state={{ movie, theatre, showtime: show }}
            className={`group border rounded-lg text-center transition-colors duration-200 ${availabilityClasses[show.availability]}`}
        >
            <div className="py-2 px-3">
                <p className="font-bold text-sm">{show.time}</p>
                <p className="text-xs opacity-80">{show.screenType}</p>
            </div>
            <div className={`text-xs font-semibold py-1 border-t-0 rounded-b-md bg-opacity-20 ${show.availability === 'available' ? 'bg-green-500 text-green-400' : show.availability === 'filling-fast' ? 'bg-yellow-500 text-yellow-400' : 'bg-red-500 text-red-400'}`}>
                {availabilityText[show.availability]}
            </div>
        </Link>
    );
};

const MovieDetailsScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movie = mockMovies.find(m => m.id === parseInt(id || '0'));

    if (!movie) {
        return <div className="p-4 text-center">Movie not found.</div>;
    }

    return (
        <div className="bg-brand-bg min-h-screen">
            <div className="relative">
                <img src={movie.posterUrl.replace('/400/600', '/800/450')} alt={movie.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white bg-black/50 rounded-full p-2 z-20">
                    <BackIcon />
                </button>
            </div>

            <div className="p-4 -mt-16 relative z-10 animate-fadeInUp">
                <div className="flex items-end space-x-4">
                    <img src={movie.posterUrl} alt={movie.title} className="w-28 h-42 rounded-lg shadow-lg" />
                    <div className="pb-2">
                        <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
                        <div className="flex items-center text-gray-300 text-sm mt-1">
                            <StarIcon />
                            <span className="ml-1 font-semibold">{movie.rating} / 10</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex space-x-2">
                    <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{movie.genre}</span>
                    <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{movie.duration}</span>
                </div>

                <p className="mt-4 text-brand-light-gray text-sm">{movie.description}</p>
            </div>

            <div className="px-4 py-2">
                <h2 className="text-xl font-bold text-brand-gray mb-3">Showtimes</h2>
                {movie.theatres.length > 0 ? (
                    <div className="space-y-4">
                        {movie.theatres.map((theatre: Theatre) => (
                            <div key={theatre.id} className="bg-brand-dark border border-white/10 rounded-lg p-4 shadow-sm">
                                <h3 className="font-semibold text-brand-gray">{theatre.name}</h3>
                                <p className="text-sm text-brand-light-gray mb-3">{theatre.location}</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {theatre.showtimes.map((show: Showtime) => (
                                        <ShowtimeButton key={show.id} movie={movie} theatre={theatre} show={show} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-brand-dark rounded-lg">
                        <p className="text-brand-light-gray">Showtimes for this movie will be updated soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsScreen;