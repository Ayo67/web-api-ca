import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material"; 

const ActorCard = ({ actor }) => {
  const navigate = useNavigate();

  // Default image if no profile path exists
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "https://via.placeholder.com/220x250?text=No+Image";

  // Handle card click to navigate to the actor's details page
  const handleClick = () => {
    navigate(`/actor/${actor.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 220,
        margin: 1,
        boxShadow: 4,
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        borderRadius: "16px",  // Rounded corners
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 8, // Lift effect on hover
        },
      }}
    >
      {/* Actor Name and Header */}
      <CardHeader
        title={actor.name}
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          bgcolor: "#f5f5f5",
          padding: 1,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />
      
      {/* Actor Image */}
      <CardMedia
        component="img"
        height="250"
        image={imageUrl}
        alt={actor.name}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />
      
      {/* Actor Details and Button */}
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          {actor.character ? `Role: ${actor.character}` : "Role: N/A"}
        </Typography>

        {/* View Details Button */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); 
              handleClick();
            }}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
