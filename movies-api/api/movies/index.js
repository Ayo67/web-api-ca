import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies,getTopRatedMovies,getTrending,getMovie,getMovieCast,getActorCredits,getMovieImages,getMovieReviews} from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

router.get('/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params; // Genre ID to search
    let { page = 1, limit = 10 } = req.query; // Pagination parameters

    [page, limit] = [+page, +limit]; // Convert to integers

    // Fetch movies that have the genreId in their genre_ids array
    const [total_results, results] = await Promise.all([
        movieModel.countDocuments({ genre_ids: parseInt(genreId) }),
        movieModel
            .find({ genre_ids: parseInt(genreId) })
            .limit(limit)
            .skip((page - 1) * limit)
    ]);

    const total_pages = Math.ceil(total_results / limit); // Calculate total pages

    // Construct the response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results,
    };

    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));


router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
        const genres = await getMovieGenres();
        res.status(200).json(genres);   
    }));

router.get('/tmdb/toprated', asyncHandler(async (req, res) => {
    const offset = req.query.offset;
    const topRatedMovies = await getTopRatedMovies(offset);
    res.status(200).json(topRatedMovies);
}));
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const offset = req.query.offset;
    const trendingMovies =  await getTrending(offset);
    res.status(200).json(trendingMovies);
}));

router.get('/cast/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const castDetails = await getMovieCast(id);
    res.status(200).json(castDetails);  
}));
router.get('/actor/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actorDetails = await getActorCredits(id);
    res.status(200).json(actorDetails);  
}));

router.get('/images/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actorDetails = await getMovieImages(id);
    res.status(200).json(actorDetails);  
}));
router.get('/reviews/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actorDetails = await getMovieReviews(id);
    res.status(200).json(actorDetails);  
}));
export default router;