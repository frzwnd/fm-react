import React from 'react';
import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h2>No pet found</h2>
      ) : (
        pets.map(pet => (
          <Pet
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.type}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
          />
        ))
      )}
    </div>
  );
};

export default Results;
