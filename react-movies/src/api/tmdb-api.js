export const getMovies = (offset = 0, title = '', genre = '') => {
  const itemsPerPage = 20;
  const page = Math.floor(offset / itemsPerPage) + 1;
  const titleParam = title ? `&query=${encodeURIComponent(title)}` : '';
  const genreParam = genre ? `&with_genres=${genre}` : '';
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}${titleParam}${genreParam}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || 'Something went wrong');
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
      throw error;
    });
};
export const searchMovies = (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error searching movies:", error);
      throw error;
    });
};
export const getMoviesByGenre = (genreId, page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching movies by genre:", error);
      throw error;
    });
};

  
export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActorImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieCast = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
    .catch((error) => {
        throw error;
    });
  };
  

  export const getUpcomingMovies = (offset = 0) => {
    const itemsPerPage = 20;
    const page = Math.floor(offset / itemsPerPage) + 1; 
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching upcoming movies:", error);
            throw error;
        });
};



  export const getActorDetails = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      ).then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.status_message || "Something went wrong");
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getTopRatedMovies = (offset = 0) => {
  const itemsPerPage = 20; 
  const page = Math.floor(offset / itemsPerPage) + 1; 
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  return fetch(url)
      .then((response) => {
          if (!response.ok) {
              return response.json().then((error) => {
                  throw new Error(error.status_message || "Something went wrong");
              });
          }
          return response.json();
      })
      .catch((error) => {
          console.error("Error fetching top-rated movies:", error);
          throw error;
      });
};


export const getTrending = (offset = 0) => {
  const itemsPerPage = 20;
  const page = Math.floor(offset / itemsPerPage) + 1; 
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  return fetch(url)
      .then((response) => {
          if (!response.ok) {
              return response.json().then((error) => {
                  throw new Error(error.status_message || "Something went wrong");
              });
          }
          return response.json();
      })
      .catch((error) => {
          console.error("Error fetching trending movies:", error);
          throw error;
      });
};

export const getActorCredits = async ({ queryKey }) => {
  const [_key, { id }] = queryKey; 
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=combined_credits`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};


