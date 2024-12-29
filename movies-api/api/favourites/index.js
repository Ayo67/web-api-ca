import express from 'express';
import asyncHandler from 'express-async-handler';
import favouriteModel from './favouriteModel';

const router = express.Router();

router.post('/users/:id/favourite', asyncHandler(async (req, res) => {
  const { id: userId } = req.params; // User ID from URL
  const { movieId } = req.body; // Movie ID from request body

  if (!movieId) {
    return res.status(400).json({ message: 'movieId is required.' });
  }

  let favourite = await favouriteModel.findOne({ userId });
  if (!favourite) {
    favourite = new favouriteModel({ userId, movieIds: [movieId] });
  } else if (!favourite.movieIds.includes(movieId)) {
    favourite.movieIds.push(movieId);
  } else {
    return res.status(400).json({ message: 'Movie already in favourites.' });
  }

  await favourite.save();
  res.status(201).json({ message: 'Favourite updated successfully', favourite });
}));

// Example error handling on the server side
router.get('/users/:id/favourite', asyncHandler(async (req, res) => {
  try {
    const { id: userId } = req.params;
    const favourite = await favouriteModel.findOne({ userId });

    if (!favourite) {
      return res.status(404).json({ message: 'No favourites found for this user.' });
    }

    res.status(200).json({
      userId: favourite.userId,
      movieIds: favourite.movieIds,
    });
  } catch (error) {
    console.error(error); // Log the error on the server for debugging
    res.status(500).json({ message: 'An error occurred while fetching favourites.' });
  }
}));

export default router;