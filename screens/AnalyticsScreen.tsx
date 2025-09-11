import React, { useMemo } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import { mockMovies } from '../data/mockData';
import type { Movie } from '../types';

// --- Helper Icons ---
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

// --- Analytics Calculation Logic ---
// In a real-world application, these calculations would be performed on a backend server
// using powerful data analysis libraries like Python's NumPy and Pandas.
// The frontend would then fetch the processed data from an API endpoint.

const getAnalyticsData = (movies: Movie[]) => {
    // 1. Genre Popularity Analysis
    const genreCounts: { [key: string]: number } = {};
    movies.forEach(movie => {
        const genres = movie.genre.split(',').map(g => g.trim());
        genres.forEach(genre => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
    });
    const sortedGenres = Object.entries(genreCounts)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count);

    // 2. Top Rated Movie
    const topRatedMovie = [...movies].sort((a, b) => b.rating - a.rating)[0];

    // 3. Recommendations based on Top Rated Movie's Genre
    const topGenre = topRatedMovie.genre.split(',')[0].trim();
    const recommendations = movies.filter(movie => 
        movie.id !== topRatedMovie.id && 
        movie.genre.includes(topGenre) &&
        movie.status === 'NOW_SHOWING'
    ).slice(0, 3);

    return { sortedGenres, topRatedMovie, recommendations };
};


// --- UI Components ---
const AnalyticsCard: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-brand-dark rounded-lg shadow-lg border border-white/10 p-4 ${className}`}>
        <h2 className="text-lg font-bold text-brand-gray mb-4">{title}</h2>
        {children}
    </div>
);

const GenreChart: React.FC<{ data: { genre: string, count: number }[] }> = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 1);
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];

    return (
        <div className="space-y-3">
            {data.slice(0, 5).map(({ genre, count }, index) => (
                <div key={genre} className="flex items-center text-sm">
                    <span className="w-28 truncate text-brand-light-gray">{genre}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                        <div
                            className={`h-4 rounded-full ${colors[index % colors.length]}`}
                            style={{ width: `${(count / maxCount) * 100}%` }}
                        ></div>
                    </div>
                    <span className="w-8 text-right font-semibold text-brand-gray">{count}</span>
                </div>
            ))}
        </div>
    );
};


const AnalyticsScreen: React.FC = () => {
    const { sortedGenres, topRatedMovie, recommendations } = useMemo(() => getAnalyticsData(mockMovies), []);
    
    return (
        <ScreenLayout>
            <header className="bg-brand-dark p-4 shadow-md sticky top-0 z-40">
                <h1 className="text-2xl font-bold text-brand-red">Movie Analytics</h1>
            </header>
            <div className="p-4 space-y-6 animate-fadeInUp">
                <AnalyticsCard title="Genre Popularity">
                   <GenreChart data={sortedGenres} />
                </AnalyticsCard>

                <AnalyticsCard title="Top Rated Movie" className="!p-0 overflow-hidden">
                    <div className="relative">
                        <img src={topRatedMovie.posterUrl} alt={topRatedMovie.title} className="w-full h-48 object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 flex items-center space-x-4">
                            <img src={topRatedMovie.posterUrl} alt={topRatedMovie.title} className="w-20 h-28 rounded-md shadow-lg" />
                            <div>
                                <h3 className="text-xl font-bold text-white text-shadow">{topRatedMovie.title}</h3>
                                <div className="flex items-center text-lg mt-1">
                                    <StarIcon />
                                    <span className="ml-1.5 font-bold text-white">{topRatedMovie.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnalyticsCard>

                <AnalyticsCard title="Recommended For You">
                    <p className="text-sm text-brand-light-gray -mt-2 mb-4">
                        Based on top rated movies in similar genres.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        {recommendations.map(movie => (
                            <div key={movie.id} className="text-center">
                                <img src={movie.posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2" />
                                <h4 className="text-xs font-semibold text-brand-gray truncate">{movie.title}</h4>
                            </div>
                        ))}
                    </div>
                </AnalyticsCard>
            </div>
        </ScreenLayout>
    );
};

export default AnalyticsScreen;