import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterActorsCard(props) {
  const handleTextChange = (e) => {
    props.onUserInput("name", e.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgb(204, 204, 0)",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the actors.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search by name"
          type="search"
          variant="filled"
          value={props.nameFilter}
          onChange={handleTextChange}
        />
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the actors.
        </Typography>
      </CardContent>
    </Card>
  );
}
