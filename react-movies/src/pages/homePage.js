import React, { useState } from "react";
import { getMovies, searchMovies, getMoviesByGenre } from "../api/tmdb-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination, Box } from '@mui/material';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedGenre, setSelectedGenre] = useState("0"); 

  const itemsPerPage = 20;

  const { data, error, isLoading, isError } = useQuery(
    ['discover', currentPage, searchTerm, selectedGenre], 
    () => {
      if (searchTerm) {
        return searchMovies(searchTerm, currentPage);
      } else if (selectedGenre !== "0") {
        return getMoviesByGenre(selectedGenre, currentPage);
      }
      return getMovies((currentPage - 1) * itemsPerPage);
    },
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = Math.ceil(data.total_results / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
        onSearch={handleSearch}
        onGenreChange={handleGenreChange} 
      />
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </>
  );
};

export default HomePage;
