import React from 'react';

const ActorDetailsPageTemplate = ({ actor, onBack }) => {
  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px',
        minHeight: '100vh',
      }}
    >
      {/* Go Back Button */}
      <button
        onClick={onBack}
        style={{
          marginBottom: '30px',
          padding: '12px 25px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        &#8592; Go Back
      </button>

      {/* Actor Main Info Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          padding: '30px',
        }}
      >
        {/* Actor Profile Image */}
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            style={{
              width: '200px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
        )}

        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{actor.name}</h2>
        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
          <strong>Birthday:</strong> {actor.birthday} |{' '}
          <strong>Place of Birth:</strong> {actor.place_of_birth}
        </p>

        <p
          style={{
            fontSize: '1rem',
            color: '#777',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          <strong>Biography:</strong> {actor.biography || 'No biography available.'}
        </p>
      </div>

      {/* Known For Section */}
      {actor.combined_credits?.cast && actor.combined_credits.cast.length > 0 && (
        <div
          style={{
            marginTop: '50px',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3
            style={{
              fontSize: '1.8rem',
              color: '#333',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Popular Movies & TV Shows
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              justifyItems: 'center',
            }}
          >
            {actor.combined_credits.cast
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 10)
              .map((work) => (
                <div
                  key={work.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                  }}
                >
                  {work.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
                      alt={work.title || work.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderBottom: '1px solid #ddd',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '300px',
                        background: '#eee',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#555',
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div
                    style={{
                      padding: '15px',
                      fontSize: '1rem',
                      color: '#333',
                      backgroundColor: '#fff',
                      borderRadius: '0 0 10px 10px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        color: '#222',
                      }}
                    >
                      {work.title || work.name}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#777' }}>
                      {work.release_date
                        ? work.release_date.split('-')[0]
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorDetailsPageTemplate;
