import React, { useState, useEffect } from "react";
import Spinner from "../components/spinner";
import { getUserFavourites } from "../api/movie-api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("authToken");

  const showSnack = (message, severity = "info") => {
    setSnack({ open: true, message, severity });
  };

  useEffect(() => {
    if (userData && token) {
      const fetchFavorites = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await getUserFavourites(userData, token);
          if (data && data.movieIds) {
            setFavorites(data.movieIds);
            showSnack("Favorites fetched successfully!", "success");
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setIsError(true);
          showSnack("Error fetching favorites.", "error");
        } finally {
          setIsLoading(false);
        }
      };

      fetchFavorites();
    }
  }, [userData, token]);

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
    showSnack(`Review added for ${movie.title}`, "success");
  };

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(movie.id)) {
        showSnack(`${movie.title} added to favorites!`, "success");
        return [...prevFavorites, movie.id];
      }
      return prevFavorites;
    });
  };

  const addToWatch = (movie) => {
    setToWatch((prevToWatch) => {
      if (!prevToWatch.includes(movie.id)) {
        showSnack(`${movie.title} added to watchlist!`, "success");
        return [...prevToWatch, movie.id];
      }
      return prevToWatch;
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((mId) => mId !== movie.id));
    showSnack(`${movie.title} removed from favorites!`, "info");
  };

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error fetching favorites!</div>;

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        addToWatch,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleSnackClose} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
