import React from 'react';
import pet from '@frontendmasters/pet';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

class Details extends React.Component {
  // old way
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     loading: true,
  //   };
  // }

  state = { loading: true };

  componentDidMount() {
    // throw new Error('lol');
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        loading: false,
        name: animal.name,
        breed: animal.breeds.primary,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        animal: animal.type,
        media: animal.photos,
        description: animal.description,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      <h1>Loading...</h1>;
    }

    const { name, animal, location, breed, description } = this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <p>{description}</p>
        </div>
        <ThemeContext.Consumer>
          {([theme]) => (
            <button style={{ backgroundColor: theme }}>Adopt {name}</button>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
