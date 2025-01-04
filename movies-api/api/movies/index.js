import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies,getMovie,getMovieImages,getMovieReviews,getGenres} from '../tmdb-api';


const router = express.Router();


router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const offset = req.query.offset;
    const upcomingMovies = await getUpcomingMovies(offset);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
        const genres = await getGenres();
        res.status(200).json(genres);   
    }));

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; 
    [page, limit] = [+page, +limit]; 
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); 
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));
router.get('/:id', asyncHandler(async (req, res) => {
    console.log(req.params.id);
    
    const id = parseInt(req.params.id);
    const movies = await getMovie(id);
    res.status(200).json(movies);  
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