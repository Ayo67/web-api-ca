const BASE_URL = 'http://localhost:8080/api'; 

const request = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }), 
    };
    console.log(headers);

    const options = { method, headers, };
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {const response = await fetch(`${BASE_URL}${endpoint}`, options);
        console.log(response);
        
        const data = await response.json();
        if (data.expired) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            window.location.href = '/login';
            return;
        }

        if (!response.ok) {
            
            if (response.status === 404) {
              return null; 
            }
            throw new Error(data.msg || data.message || 'Something went wrong');
          }
        

        return data;
    } catch (error) {
        console.error('Request failed', error);
        throw new Error(error.message || 'Network Error');
    }
};



// GET /tmdb/upcoming
export const getUpcomingMovies = async (offset = 0) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/tmdb/upcoming?offset=${offset}`, 'GET', null, token);
};

//GET /tmdb/genres
export const getGenres = async () => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/tmdb/genres`, 'GET', null, token);
};

//GET /movies/
export const getMovies = async (page = 1, limit = 10,token) => {
    return request(`/movies?page=${page}&limit=${limit}`, 'GET',null, token);
};

//GET /movies/:id
export const getMovie = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/${id}`, 'GET', null, token);
};

//GET /reviews/:id
export const getMovieReviews = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/reviews/${id}`, 'GET', null, token);
};

//GET /movies/:id/images
export const getMovieImages = async (id) => {
    const token = localStorage.getItem("authToken");
    return request(`/movies/images/${id}`, 'GET', null, token);
};


//POST /users?action=register
export const registerUser = async (username, password) => {
    return request('/users?action=register', 'POST', { username, password });
};

//POST /users/
export const authenticateUser = async (username, password) => {
    return request('/users', 'POST', { username, password });
};

//GET /users/
export const getAllUsers = async () => {
    return request('/users', 'GET', null, null);
};

//PUT /users/:id
export const updateUser = async (id) => {
    return request(`/users/${id}`, 'PUT', null, null);
};

// Create a new review for a movie that stored in MongoDB Review Collection
export const createReview = async (movieId, reviewData, token) => {
    return request(`/reviews/movies/${movieId}/review`, 'POST', reviewData, token);
};

// Add Favourite to MongoDB Favorite Collection
export const addToFavourites = async (userId, movieId, token) => {
    return request(`/favourites/users/${userId}/favourite`, 'POST', { movieId }, token);
};
// GET and shows the favourite movies of the specific user.
export const getUserFavourites = async (userId, token) => {
    return request(`/favourites/users/${userId}/favourite`, 'GET',null,  token);
};