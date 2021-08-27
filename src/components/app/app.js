import { Component } from 'react';
import './app.css';
import Weather from '../../services/get-weather';
import LocationSearchInput from '../../services/location-autocomplete';
import Places from '../../services/places-api';
import Spinner from '../spinner';
import { Container, Row, Col } from 'reactstrap';
import PlaceHeader from '../place-header';
import Card from '../card';

export default class App extends Component {

  state = {
      loading: false,
      lan: null,
      lng: null,
      name:null,
      placeId: null,
      photoUrl: null,
      weatherData: null
    }

  weather = new Weather();
  places = new Places();

  useCurrentLocation = () => {

    this.setState({loading:true})

      this.places.currentLocation()
          .then(res => {
            this.setState(
              { ...res }
            )
            this.updateWeather(res.lat, res.lng);
          });

  }

  placeSelectedHandler = (selectedPlace) => {
    this.setState(
      { 
        ...selectedPlace, 
        loading: true 
      })
      this.updateWeather( selectedPlace.lat, selectedPlace.lng );
  }

  updateWeather = (lat, lng) => {

    this.weather.sixteenDaysForecast(lat, lng)
        .then(res => this.setState({
          weatherData: res.data,
          loading: false
        }));
  }

  render(){

    const { loading, name, photoUrl, weatherData  } = this.state;
  
    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
            { photoUrl ? <Img placePhotoRef={photoUrl} /> : null }
          { name ? <PlaceHeader url={photoUrl} place={ name }/> : null }
          </Col>
        </Row>
        <Row>
          <Col className="mt-5 d-flex flex-column">
            <LocationSearchInput onPlaceSelected={ this.placeSelectedHandler }/> 
            <button 
              className="btn btn-primary m-auto mt-3 p-2"
              style={{
                "backgroungColor":"rgb(8 161 237 / 15%)"
              }}
              onClick={ this.useCurrentLocation }>
                Użyj mojej lokalizacji 	&#128205;
            </button>
          </Col>
        </Row>
        { loading ? <Spinner/> : null }
        <Row className="mt-5">
          { weatherData && !loading ? <Cards data={ weatherData } /> : null }
        </Row>
       </Container>
     </>
     );
  }
}

const Cards = ({data}) => {
  
  const days = data.map((item, index) => {
    return(
      <Card 
        key={ index }
        item={ item } 
      />
    )
  })
  
  return(
    <>
        { days }
    </>
  )

}

const Img = ({placePhotoRef}) => {
   return(
    <div 
      style={{ "backgroundImage":`url('${placePhotoRef}')` }}
      className="place-image"
    >
    </div>
   )
}

