// Fix: Replaced mock data and a circular import with the correct type definitions.
// This file should define and export the application's shared types.

export interface Showtime {
  id: number;
  time: string;
  screenType: string;
  availability: 'available' | 'filling-fast' | 'almost-full';
}

export interface Theatre {
  id: number;
  name: string;
  location: string;
  showtimes: Showtime[];
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: string;
  duration: string;
  rating: number;
  description: string;
  status: 'NOW_SHOWING' | 'UPCOMING';
  theatres: Theatre[];
}

export interface Seat {
  id: string;
  row: number;
  col: number;
  status: 'available' | 'booked' | 'selected';
  type: 'regular' | 'premium' | 'recliner';
}

export interface Booking {
  id: string;
  movie: Movie;
  theatre: Theatre;
  showtime: Showtime;
  selectedSeats: Seat[];
  subtotal: number;
  discount: number;
  totalPrice: number;
}