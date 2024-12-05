import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFavoriteMovies } from "../api/firebase-api"; 
import Spinner from "../components/spinner";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});


  const { data: fetchedFavorites, isLoading, isError } = useQuery(
    "favoriteMovies", 
    getFavoriteMovies
  );

  useEffect(() => {
    if (fetchedFavorites) {
      setFavorites(fetchedFavorites); 
    }
    console.log("Fetched Favorite Movie IDs:", fetchedFavorites); 
  }, [fetchedFavorites]);

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const addToWatch = (movie) => {
    let newToWatch = [];
    if (!toWatch.includes(movie.id)) {
      newToWatch = [...toWatch, movie.id];
    } else {
      newToWatch = [...toWatch];
    }
    setToWatch(newToWatch);
    console.log(toWatch);
  };

   // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  if (isLoading) return <Spinner/>;
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
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;