import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import { Pagination, Box } from "@mui/material";

const UpcomingMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const itemsPerPage = 20; 

    const { data, error, isLoading, isError } = useQuery(
        ["upcoming", offset],
        () => getUpcomingMovies(offset),
        { keepPreviousData: true }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const upcomingMovies = data.results;
    const totalPages = Math.ceil(data.total_results / itemsPerPage); 

    const addToWatch = (movieId) => true;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setOffset((value - 1) * itemsPerPage); 
    };

    return (
        <>
            <PageTemplate
                title="Upcoming Movies"
                movies={upcomingMovies}
                action={(movie) => {
                    return <AddToWatchIcon movie={movie} />;
                }}
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
export default UpcomingMoviesPage;
