import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const ActorHeader = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
      }}
    >
      {/* Back Navigation Button */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Actor Details */}
      <Typography variant="h4" component="h3">
        {actor.name}
        {actor.homepage && (
          <a href={actor.homepage} target="_blank" rel="noopener noreferrer">
            <HomeIcon color="primary" />
          </a>
        )}
        <br />
        {actor.known_for_department && (
          <span sx={{ fontSize: "1.5rem" }}>
            {`Known for: ${actor.known_for_department}`}
          </span>
        )}
      </Typography>

      {/* Forward Navigation Button */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
