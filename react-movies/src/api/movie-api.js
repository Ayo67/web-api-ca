import { useNavigate } from "react-router-dom";
const BASE_URL = 'http://localhost:8080/api'; 

const request = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }), 
    };
    console.log(headers);

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        console.log(response);
        
        const data = await response.json();
        if (data.expired) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            window.location.href = '/login';
            return;
        }

        if (!response.ok) {
            throw new Error(data.msg || data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('Request failed', error);
        throw new Error(error.message || 'Network Error');
    }
};

// Get all users
export const getAllUsers = async () => {
    return request('/users');
};

// Register a new user
export const registerUser = async (username, password) => {
    return request('/users?action=register', 'POST', { username, password });
};

// Authenticate a user
export const authenticateUser = async (username, password) => {
    return request('/users', 'POST', { username, password });
};

// Update a user
export const updateUser = async (id, updateData, token) => {
    return request(`/users/${id}`, 'PUT', updateData, token);
};

// Create a new review for a movie
export const createReview = async (movieId, reviewData, token) => {
    
    return request(`/reviews/movies/${movieId}/review`, 'POST', reviewData, token);
};

// Add a movie to the user's favorites
export const addToFavourites = async (userId, movieId, token) => {
    return request(`/favourites/users/${userId}/favourite`, 'POST', { movieId }, token);
};

export const getUserFavourites = async (userId, token) => {
    return request(`/favourites/users/${userId}/favourite`, 'GET',null,  token);
};

// Get paginated list of movies
export const getMovies = async (page = 1, limit = 10,token) => {
    return request(`/movies?page=${page}&limit=${limit}`, 'GET',null, token);
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
    return request(`/movies/${movieId}`);
};
export const getMoviesByGenre = async (genreId, page = 1, limit = 10) => {
    const token = localStorage.getItem("authToken"); 

    return request(`/movies/genre/${genreId}?page=${page}&limit=${limit}`, 'GET', null, token);
};
export const getUpcomingMovies = async (offset = 0) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/tmdb/upcoming?offset=${offset}`, 'GET', null, token);
};
export const getTopRatedMovies = async (offset = 0) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/tmdb/topRated?offset=${offset}`, 'GET', null, token);
};
export const getTrending = async (offset = 0) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/tmdb/trending?offset=${offset}`, 'GET', null, token);
};
export const getMovie = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/${id}`, 'GET', null, token);
};

export const getMovieCast = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/cast/${id}`, 'GET', null, token);
};

export const getActorCredits = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/actor/${id}`, 'GET', null, token);
};

export const getMovieImages = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/images/${id}`, 'GET', null, token);
};

export const getMovieReviews = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/reviews/${id}`, 'GET', null, token);
};