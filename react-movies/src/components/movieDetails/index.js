import React, { useState } from 'react';
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MovieReviews from "../movieReviews";
import ReviewsForm from "../reviewForm"
import ActorCard from "../actorCard";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, cast, navigateToActorDetails }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((country) => (
          <li key={country.name}>
            <Chip label={country.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      {/* Actor details section */}
      <Typography variant="h5" component="h3" sx={{ marginTop: "1em" }}>
        Cast
      </Typography>

      {cast.length > 0 ? (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {cast.slice(0, 10).map((actor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
              <ActorCard actor={actor} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No cast available.</Typography>
      )}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ padding: "1em" }}>
          <Typography variant="h6">Reviews</Typography>
          <MovieReviews movie={movie} />
          <ReviewsForm movie={movie}/>
          <Button
           type="submit"
           variant="contained"
           color="black"
           onClick={() => setDrawerOpen(false)}
           >Close</Button>
        </div>
      </Drawer>
    </>
  );
};

export default MovieDetails;
