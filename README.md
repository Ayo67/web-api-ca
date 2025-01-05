# Assignment 2 - Web API.

Ayooluwa Oguntuyi (20098135)

## Features.
User Validation: Ensures data integrity for user-related operations.
User Authentication: Includes Signup and Login functionality with JWT-based authentication.
Favourites Collection: A new MongoDB collection for managing user favorite movies.
Upcoming Movies: Fetch upcoming movies using /tmdb/movies/upcoming.
Movies by Genre: Retrieve movies by genre using /tmdb/movies/genre/:genre.


## Setup requirements.

To run the application locally after cloning the repository:

1. Ensure you have Node.js and MongoDB installed on your system.
2. Install dependencies by running:
   ```bash
   npm install

3. Create a TMDB API key and update the configuration file with the key.
4. Ensure MongoDB is running.
5. Create a MongoDB database and update the configuration file with the connection details.
6. Run the application using npm start.



## API Configuration

Before running the API, ensure the .env file is properly configured as follows:

NODEENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoConnectionURL
seedDb=true
secret=YourJWTSecret

Replace YourMongoConnectionURL and YourJWTSecret with appropriate values for your setup.

## API Design
/api/movies | GET | Retrieves a list of all movies.
/api/movies/{movieid} | GET | Retrieves details for a specific movie by ID.
/api/movies/{movieid}/reviews | GET | Retrieves all reviews for a specific movie.
/api/movies/{movieid}/reviews | POST | Adds a new review for a movie.
/api/users/favorites | GET | Retrieves a user's favorite movies (requires authentication).
/api/users/favorites/{movieid} | POST | Adds a movie to the user's favorites list (requires authentication).
/tmdb/movies/upcoming: Fetch upcoming movies.
/tmdb/movies/genre/:genre: Get movies by genre.

## Security and Authentication

Authentication: JWT-based authentication is used to secure API routes.
Protected Routes:
/home - Home Page
/movies/:id - Movie Details Page
/movies/favorites - Favorite Movies Page
/movies/upcoming - Upcoming Movies Page
/movies/trending - Trending Movies Page
/movies/topRated - Top Rated Movies Page
/reviews/:id - Movie Review Page
/reviews/form - Add Movie Review Page
/actor/:id - Actor Details Page

## Integrating with React App

- Improved and adapted UI to handle authenticated user sessions and protected views.
- Enabled changes happening in the frontend to carryover to the Backend.
- Integrated JWT-based authentication for secured routes and user management.
 