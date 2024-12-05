import React from "react";
import Actor from "../actorCard/"; 
import Grid from "@mui/material/Grid";

const ActorList = ({ actors, action }) => {
  const actorCards = actors.map((actor) => (
    <Grid 
      key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "20px" }}
    >
      <Actor key={actor.id} actor={actor} action={action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {actorCards}
    </Grid>
  );
};

export default ActorList;
