import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies'; // Import movies router
import favouriteRouter from './api/favourites';
import reviewRouter from './api/reviews'; 
import './db';
import defaultErrHandler from './errHandler';
import authenticate from './authenticate'; 


dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/favourites', authenticate, favouriteRouter); // Favourites route
app.use('/api/reviews', authenticate, reviewRouter); // Reviews route
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});