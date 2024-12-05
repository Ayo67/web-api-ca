import React from 'react';
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { Paper } from '@mui/material';
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie?.id }],
    getMovieImages
  );

  if (!movie || !movie.id) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data?.posters || [];

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={4} style={{ padding: "15px" }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <h2>Movie Poster</h2>
            {images.length > 0 ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${images[0].file_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            ) : (
              <div>No poster available</div>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
