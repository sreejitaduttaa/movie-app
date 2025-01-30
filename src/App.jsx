import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
const API_BASE_URL = ' https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [MovieList, setMovieList] = useState('');
  const [isLoading, setisLoading] = useState('');


  const fetchMovies = async () => {
    setisLoading(true);
    seterrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies.');
      }

      const data = await response.json();
      console.log(data);
      if (data.Response == 'False') {
        seterrorMessage(data.Error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);


    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();

  }, []);


  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      </div>

      <section className='all-movies'>

        <h2 className='mt - [40px]'>All Movies</h2>


        {isLoading ? (
          <p className='text-white'>Loading...</p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {MovieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )
        }


      </section>

    </main>

  )
}

export default App