import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage"; 
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/signUpPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24 * 7,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!user;
  });
  

  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("favorites");
    queryClient.clear();
    setIsAuthenticated(false); 
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MoviesContextProvider>
        {shouldShowHeader && isAuthenticated &&  <SiteHeader onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace /> // 
              ) : (
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace /> // Redirect authenticated user
              ) : (
                <SignUpPage onSignup={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/reviews/:id"
            element={isAuthenticated ? <MovieReviewPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/favorites"
            element={isAuthenticated ? <FavoriteMoviesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/:id"
            element={isAuthenticated ? <MoviePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/upcoming"
            element={isAuthenticated ? <UpcomingMoviesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/reviews/form"
            element={isAuthenticated ? <AddMovieReviewPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/actor/:id"
            element={isAuthenticated ? <ActorDetailsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/topRated"
            element={isAuthenticated ? <TopRatedMoviesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/trending"
            element={isAuthenticated ? <TrendingMoviesPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MoviesContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
