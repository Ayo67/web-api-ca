import React, { useState } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { Pagination, Box } from "@mui/material";

const TopRatedMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0); 
    const itemsPerPage = 20; 

    const { data, error, isLoading, isError } = useQuery(
        ["topRated", offset],
        () => getTopRatedMovies(offset),
        { keepPreviousData: true } 
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    const totalPages = Math.ceil(data.total_results / itemsPerPage); 
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setOffset((value - 1) * itemsPerPage); 
    };

    return (
        <>
            <MovieListPageTemplate
                title="Top Rated Movies"
                movies={movies}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
            <Box
                display="flex"
                justifyContent="center"
                marginTop="20px"
            >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </Box>
        </>
    );
};

export default TopRatedMoviesPage;
