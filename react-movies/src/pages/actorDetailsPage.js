import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getActorCredits } from '../api/tmdb-api'; 
import ActorDetailsPageTemplate from '../components/templateActorPage'; 
import Spinner from '../components/spinner';

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: actor, isLoading, isError, error } = useQuery(
    ['actorCredits', { id }],
    getActorCredits,{
      staleTime: 1000 * 60 * 60 * 24, 
      cacheTime: 1000 * 60 * 60 * 24 * 7,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  // Back button handler
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <ActorDetailsPageTemplate actor={actor} onBack={handleGoBack} />
  );
};

export default ActorDetailsPage;
