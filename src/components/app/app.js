import { Component } from 'react';
import './app.css';
import Weather from '../../services/get-weather';
import LocationSearchInput from '../../services/location-autocomplete';
import Places from '../../services/places-api';
import GetCurrentLocation from '../../services/get-current-location';
import Spinner from '../spinner';
import { Container, Row, Col } from 'reactstrap';
import PlaceHeader from '../place-header';
import Card from '../card';

export default class App extends Component {

  state = {
    data: null,
    loading: true,
    placeCoordinates: null,
    localCoordinatesError:false,
    placePhotoRef: null,
    ak: null
  }

  weather = new Weather();
  places = new Places();
  location = new GetCurrentLocation();

  componentDidMount(){
    this.location.getUserLocation().then(res => console.log(res))
  }

  updateWeather = (lat, lng) => {

    this.weather.sixteenDaysForecast(lat, lng)
        .then(res => this.setState({
          data: res.data,
          loading: false
        }));
  }

  placeSelectedHandler = (selectedPlace) => {
    this.setState({
      placeCoordinates: selectedPlace
    })

    
    this.places.getPhotoUrl(selectedPlace.place_id)
        .then(resp => this.setState({
          placePhotoRef: resp.result.photos[0].photo_reference,
          ak: this.places.ak
        }));
        // .then(resp => console.log(resp));

    const lat = selectedPlace.geometry.location.lat()
    const lng = selectedPlace.geometry.location.lng()
    this.updateWeather(lat, lng);


    
  }

  render(){

    const { loading, placePhotoRef, ak, placeCoordinates, localCoordinatesError } = this.state;
    

    let url, place;

    if(placeCoordinates) {
      const { address_components } = placeCoordinates;
      place = address_components[0].long_name;
    };

    
    if(placePhotoRef){
      url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${placePhotoRef}&maxwidth=400&key=${ak}`
    }

    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
            { this.state.placePhotoRef ? <Img placePhotoRef={this.state.placePhotoRef} ak={this.state.ak}/> : null }
          { placePhotoRef ? <PlaceHeader url={url} place={ place }/> : null }
          </Col>
        </Row>
        { localCoordinatesError ? 
          <Row className="mt-5">
            <Col className="text-center">
              <p className="coordinatesError">
                Nie mamy dostępu do Twojej lokalizacji&nbsp;&nbsp;<span className="coordinatesError__emoji">🔎</span>
              </p> 
            </Col>
          </Row>
          : null }
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <LocationSearchInput onPlaceSelected={ this.placeSelectedHandler }/> 
          </Col>
        </Row>
        { loading ? <Spinner/> : null }
        <Row className="mt-5">
          { loading ? null : <Cards data={ this.state.data } /> }
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

const Img = ({placePhotoRef, ak}) => {
  let url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${placePhotoRef}&maxwidth=400&key=${ak}`
   return(
    <div 
      style={{ "backgroundImage":`url('${url}')` }}
      className="place-image"
    >
    </div>
   )
}

