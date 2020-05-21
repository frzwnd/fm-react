import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
  const [location, setLocation] = useState('Ho Chi Minh, VN');
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);
  const [theme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreed('');
    setBreeds([]);

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={location}
          placeholder="Location"
          onChange={e => setLocation(e.target.value)}></input>

        <AnimalDropdown />
        <BreedDropdown />
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
