import { ref, get, set } from "firebase/database";
import { db } from '../firebase/config'


const getUserUid = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.uid : null;
};

export const storeFavoriteMovie = async (movieId) => {
  const uid = getUserUid();
  if (!uid) {
    console.error("User is not authenticated");
    return;
  }
  try {
    const userRef = ref(db, 'users/' + uid + '/favoriteMovies');
    const snapshot = await get(userRef);
    const favoriteMovies = snapshot.exists() ? snapshot.val() : [];
    if (favoriteMovies.includes(movieId)) {
      console.log("Movie already added to favorites.");
      return;
    }
    // Add the new movie to the list
    const updatedFavoriteMovies = [...favoriteMovies, movieId];
    await set(userRef, updatedFavoriteMovies);
    console.log("Movie added to favorites successfully!");
  } catch (error) {
    console.error("Error adding movie to favorites: ", error);
  }
};

// Get all favorite movies for the current user
export const getFavoriteMovies = async () => {
  const uid = getUserUid();
  if (!uid) {
    console.error("User is not authenticated");
    return [];
  }
  try {
    const userRef = ref(db, 'users/' + uid + '/favoriteMovies');
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); 
    } else {
      console.log("No favorite movies found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorite movies: ", error);
    return [];
  }
};



export const removeFavoriteMovie = async (movieIdToRemove) => {
  const uid = getUserUid();
  if (!uid) {
    console.error("User is not authenticated");
    return;
}
  const userRef = ref(db, `users/${uid}/favoriteMovies`);
  try {const snapshot = await get(userRef);
    const favoriteMovies = snapshot.val();
    if (favoriteMovies) {
      const updatedMovies = Array.isArray(favoriteMovies)
        ? favoriteMovies.filter(movieId => movieId !== movieIdToRemove) // If array
        : Object.values(favoriteMovies).filter(movieId => movieId !== movieIdToRemove); // If object
      await set(userRef, updatedMovies);
      console.log("Movie removed successfully!");
    } else {
      console.log("No favorite movies to update.");
    }
  } catch (error) {
    console.error("Error removing movie:", error);
  }
};