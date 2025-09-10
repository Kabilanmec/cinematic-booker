import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative group w-full aspect-[2/3]">
      <Link to={`/movie/${movie.id}`} className="block absolute inset-0 overflow-hidden rounded-lg bg-brand-dark">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:brightness-50 transition-all duration-300"
        />
        {/* Overlay for Title & Genre */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-sm font-semibold text-white text-shadow truncate">{movie.title}</h3>
          <p className="text-xs text-gray-300 text-shadow truncate">{movie.genre}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;