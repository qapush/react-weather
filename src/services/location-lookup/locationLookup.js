import { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
  } from 'react-places-autocomplete';
   
  export default class LocationSearchInput extends Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
    }
   
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => this.props.onPlaceSelected(results[0]))
        // .then(results => getLatLng(results[0]))
        // .then(results => console.log(results[0]))
        // .then(latLng => this.props.onPlaceSelected(latLng))
        .catch(error => console.error('Error', error));
    };
   
    render() {

      const searchOptions = {
        types: [('(cities)')]
      }

      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Prognoza pogody dla...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index )=> {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={index}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
  }