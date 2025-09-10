import type { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: 8,
    title: "Lokah",
    posterUrl: "https://i.postimg.cc/Qd9y7Y9v/lokah.jpg",
    genre: "Sci-Fi, Action, Thriller",
    duration: "2h 35m",
    rating: 8.8,
    description: "In a dystopian future, a lone warrior discovers a secret that could either save humanity or shatter reality itself. A high-octane journey through collapsing worlds.",
    status: 'NOW_SHOWING',
    theatres: [
      {
        id: 101,
        name: "PVR Cinemas, Grand Mall",
        location: "Chennai",
        showtimes: [
          { id: 8011, time: "10:15 AM", screenType: "4K", availability: 'available' },
          { id: 8012, time: "02:00 PM", screenType: "IMAX", availability: 'filling-fast' },
          { id: 8013, time: "09:00 PM", screenType: "IMAX", availability: 'almost-full' },
        ]
      },
      {
        id: 102,
        name: "INOX, City Centre",
        location: "Coimbatore",
        showtimes: [
          { id: 8021, time: "11:30 AM", screenType: "4K", availability: 'available' },
          { id: 8022, time: "06:30 PM", screenType: "4K", availability: 'filling-fast' },
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Madharaasi",
    posterUrl: "https://i.postimg.cc/J0Z0gY7c/madharaasi.jpg",
    genre: "Action, Thriller",
    duration: "2h 20m",
    rating: 8.5,
    description: "A retired assassin is pulled back into the game when his past catches up to him in the streets of Madras. He must protect his family from a new wave of criminals.",
    status: 'NOW_SHOWING',
    theatres: [
      {
        id: 101,
        name: "PVR Cinemas, Grand Mall",
        location: "Chennai",
        showtimes: [
          { id: 9011, time: "09:45 AM", screenType: "2D", availability: 'filling-fast' },
          { id: 9012, time: "04:15 PM", screenType: "2D", availability: 'available' },
        ]
      },
       {
        id: 103,
        name: "AGS Cinemas",
        location: "Madurai",
        showtimes: [
          { id: 9031, time: "10:00 AM", screenType: "2D", availability: 'available' },
          { id: 9032, time: "07:30 PM", screenType: "2D", availability: 'almost-full' },
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Jana Nayagan",
    posterUrl: "https://i.postimg.cc/8P7g3Zc8/jana-nayagan.jpg",
    genre: "Political, Thriller",
    duration: "2h 30m",
    rating: 8.2,
    description: "A common man rises against a corrupt political system to become a leader of the people. He faces numerous challenges and betrayals on his journey to bring justice.",
    status: 'NOW_SHOWING',
    theatres: [
      {
        id: 101,
        name: "PVR Cinemas, Grand Mall",
        location: "Chennai",
        showtimes: [
          { id: 1011, time: "10:00 AM", screenType: "IMAX", availability: 'available' },
          { id: 1012, time: "01:30 PM", screenType: "IMAX", availability: 'filling-fast' },
          { id: 1013, time: "05:00 PM", screenType: "3D", availability: 'almost-full' },
          { id: 1014, time: "09:30 PM", screenType: "3D", availability: 'available' },
        ]
      },
      {
        id: 102,
        name: "INOX, City Centre",
        location: "Coimbatore",
        showtimes: [
          { id: 1021, time: "11:00 AM", screenType: "2D", availability: 'available' },
          { id: 1022, time: "02:30 PM", screenType: "2D", availability: 'filling-fast' },
          { id: 1023, time: "07:00 PM", screenType: "3D", availability: 'almost-full' },
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Sachin",
    posterUrl: "https://i.postimg.cc/fbG04w8g/sachin.jpg",
    genre: "Rom-Com",
    duration: "2h 19m",
    rating: 8.6,
    description: "A charming cricketer's life takes an unexpected turn when he falls for a witty journalist. Juggling fame, love, and the biggest tournament of his life, he has to score both on and off the field.",
    status: 'NOW_SHOWING',
    theatres: [
      {
        id: 101,
        name: "PVR Cinemas, Grand Mall",
        location: "Chennai",
        showtimes: [
          { id: 6011, time: "11:15 AM", screenType: "2D", availability: 'available' },
          { id: 6012, time: "05:30 PM", screenType: "2D", availability: 'filling-fast' },
        ]
      },
      {
        id: 102,
        name: "INOX, City Centre",
        location: "Coimbatore",
        showtimes: [
          { id: 6021, time: "12:00 PM", screenType: "2D", availability: 'available' },
          { id: 6022, time: "06:00 PM", screenType: "2D", availability: 'available' },
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Karuppu",
    posterUrl: "https://i.postimg.cc/13y7xK1M/karuppu.jpg",
    genre: "Drama, Thriller",
    duration: "2h 15m",
    rating: 8.8,
    description: "A story of a man who fights for his land and people against corporate greed.",
    status: 'NOW_SHOWING',
    theatres: [
      {
        id: 101,
        name: "PVR Cinemas, Grand Mall",
        location: "Chennai",
        showtimes: [
          { id: 7011, time: "10:30 AM", screenType: "2D", availability: 'available' },
          { id: 7012, time: "06:00 PM", screenType: "2D", availability: 'filling-fast' },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Spiderman Brand New Day",
    posterUrl: "https://i.postimg.cc/qR0YyG4f/spiderman.jpg",
    genre: "Action, Adventure, Sci-Fi",
    duration: "2h 28m",
    rating: 9.5,
    description: "After a reality-altering event, Peter Parker navigates a new life where his past as Spider-Man is erased, facing new threats and old foes in a world that doesn't remember him.",
    status: 'UPCOMING',
    theatres: []
  },
  {
    id: 5,
    title: "Interstellar",
    posterUrl: "https://i.postimg.cc/KzQxY5Yy/interstellar.jpg",
    genre: "Sci-Fi, Adventure, Drama",
    duration: "2h 49m",
    rating: 9.8,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    status: 'UPCOMING',
    theatres: []
  }
];