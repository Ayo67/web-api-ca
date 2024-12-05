import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTrending } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import { Pagination, Box } from "@mui/material";

const TrendingMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0); 
    const itemsPerPage = 20; 

    const { data, error, isLoading, isError } = useQuery(
        ["trending", offset],
        () => getTrending(offset),
        { keepPreviousData: true } 
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const trendingMovies = data.results;
    const totalPages = Math.ceil(data.total_results / itemsPerPage); 
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setOffset((value - 1) * itemsPerPage); 
    };

    return (
        <>
            <PageTemplate
                title="Trending"
                movies={trendingMovies}
                action={(movie) => <AddToWatchIcon movie={movie} />}
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

export default TrendingMoviesPage;
