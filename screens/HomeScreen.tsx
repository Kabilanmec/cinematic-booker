import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import ScreenLayout from '../components/ScreenLayout';
import type { Movie } from '../types';
import { mockMovies } from '../data/mockData';

const HomeScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const filteredMovies = useMemo(() => {
        return mockMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const nowShowingMovies = filteredMovies.filter(m => m.status === 'NOW_SHOWING');
    const upcomingMovies = filteredMovies.filter(m => m.status === 'UPCOMING');
    
    const handleScroll = useCallback(() => {
        const carousel = carouselRef.current;
        if (!carousel || carousel.children.length === 0) return;
        
        const firstItem = carousel.children[0] as HTMLElement;
        if (!firstItem) return;

        const itemWidth = firstItem.offsetWidth;
        const itemStyle = window.getComputedStyle(firstItem);
        const marginLeft = parseFloat(itemStyle.marginLeft);
        const marginRight = parseFloat(itemStyle.marginRight);
        
        const totalItemWidth = itemWidth + marginLeft + marginRight;
        if (totalItemWidth === 0) return;

        const newActiveIndex = Math.round(carousel.scrollLeft / totalItemWidth);

        setActiveIndex(prevIndex => {
            if (newActiveIndex !== prevIndex) {
                return newActiveIndex;
            }
            return prevIndex;
        });
    }, []);

    useEffect(() => {
        const carousel = carouselRef.current;
        carousel?.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
        return () => {
            carousel?.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <ScreenLayout>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
            />
            <div>
                {/* Now Showing Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold my-4 px-4 text-brand-gray">Now Showing</h2>
                    <div ref={carouselRef} className="cover-carousel scrollbar-hide">
                        {nowShowingMovies.map((movie: Movie, index) => (
                           <div key={movie.id} className={`cover-carousel-item ${index === activeIndex ? 'is-active' : ''}`}>
                               <MovieCard movie={movie} />
                           </div>
                        ))}
                    </div>
                </section>

                {/* Upcoming Movies Section */}
                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-brand-gray">Upcoming Movies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
                        {upcomingMovies.map((movie: Movie, index) => (
                           <div key={movie.id} className="animate-fadeInUp" style={{ animationDelay: `${(nowShowingMovies.length + index) * 50}ms`, animationFillMode: 'backwards' }}>
                              <MovieCard movie={movie} />
                           </div>
                        ))}
                    </div>
                </section>
            </div>
        </ScreenLayout>
    );
};

export default HomeScreen;