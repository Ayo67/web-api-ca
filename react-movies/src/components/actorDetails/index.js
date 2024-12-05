import React from "react";
import { useParams } from "react-router-dom"; 
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "react-query";
import { getActorDetails } from "../../api/tmdb-api"; 

const ActorDetails = ({actor}) => {
    
    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 3 }}>
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                sx={{ height: 400 }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {actor.biography || "Biography not available."}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Known For: {actor.known_for_department || "N/A"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ActorDetails;

