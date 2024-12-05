import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const handleNameChange = (name) => setNameFilter(name);
  const handleGenreChange = (genre) => setGenreFilter(genre);

  return (
    <FilterContext.Provider
      value={{ nameFilter, genreFilter, handleNameChange, handleGenreChange }}
    >
      {children}
    </FilterContext.Provider>
  );
};
