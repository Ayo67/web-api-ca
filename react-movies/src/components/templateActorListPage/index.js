import React, { useState } from "react";
import Header from "../headerActorList"; 
import FilterCard from "../filterActorsCard"; 
import ActorList from "../actorList"; 
import Grid from "@mui/material/Grid";

function ActorListPageTemplate({ actors, title, action }) {
  const [nameFilter, setNameFilter] = useState("");

  let displayedActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <Grid container>
      {/* Header Section */}
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      {/* Filter and Actor List Section */}
      <Grid container>
        {/* Filter Section */}
        <Grid
          itemxs={12}sm={6}md={4}lg={3}xl={2}sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            nameFilter={nameFilter}
          />
        </Grid>

        {/* Actor List Section */}
        <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
          <ActorList action={action} actors={displayedActors} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActorListPageTemplate;
