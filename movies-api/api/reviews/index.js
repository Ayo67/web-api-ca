import express from 'express';
import asyncHandler from 'express-async-handler';
import reviewModel from './reviewModel';

const router = express.Router();

// Route to create a new review
router.post(
  '/movies/:id/review',
  asyncHandler(async (req, res) => {
    const { id: movieId } = req.params;
    const { userId, author, content, rating } = req.body; 
    console.log(req.body)
    // Validate input fields
    if (!userId || !author || !content || rating === undefined) {
      return res.status(400).json({
        message: 'userId, author, content, and rating are required.',
      });
    }

    if (content.length < 10) {
      return res
        .status(400)
        .json({ message: 'Content must be at least 10 characters long.' });
    }

    if (![0, 1, 2, 3, 4, 5].includes(rating)) {
      return res
        .status(400)
        .json({ message: 'Rating must be a number between 0 and 5.' });
    }

    // Create and save the review
    const review = new reviewModel({ userId, movieId, author, content, rating });
    await review.save();

    res.status(201).json({ message: 'Review created successfully', review });
  })
);

// Route to update an existing review
router.put(
  '/reviews/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params; // Review ID from URL params
    const { content, rating } = req.body; // Fields to update

    const review = await reviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (content) {
      if (content.length < 10) {
        return res
          .status(400)
          .json({ message: 'Content must be at least 10 characters long.' });
      }
      review.content = content;
    }

    if (rating !== undefined) {
      if (![0, 1, 2, 3, 4, 5].includes(rating)) {
        return res
          .status(400)
          .json({ message: 'Rating must be a number between 0 and 5.' });
      }
      review.rating = rating;
    }


    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  })
);

export default router;
