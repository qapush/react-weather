import { Component } from 'react';
import './locationLookup.css';
import Places from '../places-api';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
   
  export default class LocationSearchInput extends Component {
    constructor(props) { 
      super(props);
      this.state = { address:'' };
      this.places = new Places();
    }
    
  
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      this.setState({
        address:''
      })
      geocodeByAddress(address)
        .then(results => {
          this.places.selectedPlaceData(results)
              .then(res => {
                this.props.onPlaceSelected(res);
              })
        })
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
                  placeholder: 'Szukaj...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {/* {loading && <div>Loading...</div>} */}
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