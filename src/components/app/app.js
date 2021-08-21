import { Component } from 'react';
import './app.css';
import Weather from '../../services/get-weather';
import LocationSearchInput from '../../services/location-autocomplete';
import Places from '../../services/places-api';
import { Container, Row, Col } from 'reactstrap';
import PlaceHeader from '../place-header';
import Card from '../card';

export default class App extends Component {

  state = {
    data: null,
    loading: true,
    placeCoordinates: null,
    localCoordinatesInUse: false,
    placePhotoRef: null,
    ak: null
  }

  weather = new Weather();
  places = new Places();

  componentDidMount(){

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    let success = (pos) => {
      let lat = pos.coords.latitude,
          lng = pos.coords.longitude;
      this.setState({
        localCoordinatesInUse: true
      })   
      this.updateWeather(lat, lng);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

  }

  componentDidUpdate(){
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
      placeCoordinates: selectedPlace,
      localCoordinatesInUse: false
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

    const { loading, placePhotoRef, ak, placeCoordinates } = this.state;
    

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
        <Row>
          <Col className="m-5 d-flex justify-content-center">
            <LocationSearchInput onPlaceSelected={ this.placeSelectedHandler }/> 
          </Col>
        </Row>
        <Row>
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

