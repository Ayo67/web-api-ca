import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import Button from "@mui/material/Button";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch movie details
  const { data: movie, error: movieError, isLoading: isMovieLoading, isError: isMovieError } = useQuery(
    ["movie", { id }],
    getMovie,{
      staleTime: 1000 * 60 * 60 * 24, 
      cacheTime: 1000 * 60 * 60 * 24 * 7,
      refetchOnWindowFocus: false,
    }
  );

  // Fetch cast details
  const { data: cast, error: castError, isLoading: isCastLoading, isError: isCastError } = useQuery(
    ["cast", { id }],
    getMovieCast
  );

  // Show loading spinner while fetching data
  if (isMovieLoading || isCastLoading) {
    return <Spinner />;
  }

  // Handle errors if fetching fails
  if (isMovieError || isCastError) {
    const errorMessage = isMovieError ? movieError.message : castError.message;
    return <h1>Error fetching data: {errorMessage}</h1>;
  }

  // Navigate to actor details page
  const navigateToActorDetails = (actorId) => {
    navigate(`/actor/${actorId}`);
  };

  return movie ? (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} cast={cast?.cast || []} navigateToActorDetails={navigateToActorDetails} />
    </PageTemplate>
  ) : (
    <p>Waiting for movie details...</p>
  );
};

export default MoviePage;
