import { Component } from 'react';
import './app.css';
import Weather from '../../services/get-weather';
import LocationSearchInput from '../../services/location-lookup';
import { Container, Row, Col } from 'reactstrap';
import Card from '../card';

export default class App extends Component {

  state = {
    data: null,
    loading: true,
    placeCoordinates: null,
    localCoordinatesInUse: false
  }

  weather = new Weather();

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
  
  updateWeather = (lat, lng) => {

    // this.weather.sixteenDaysForecast()
    //     .then(res => console.log(res.data[1]));

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

    console.log(selectedPlace.address_components);

    const lat = selectedPlace.geometry.location.lat()
    const lng = selectedPlace.geometry.location.lng()

    this.updateWeather(lat, lng);
  }

  render(){

    const { loading, localCoordinatesInUse, placeCoordinates } = this.state;
    

    let title = 'Prognoza pogody dla ';

    if(placeCoordinates) {
      const { address_components } = placeCoordinates;
      title += address_components[0].long_name;
    } else {
      title += 'bieżącej lokalizaji'
    }

    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
          <h1 className="mt-5">{title}</h1>
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

