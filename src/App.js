import { Component } from 'react';
import './App.css';
import Weather from './services/get-weather';
import LocationSearchInput from './services/location-lookup';
import { Container, Row, Col } from 'reactstrap';
import Card from './components/card';

export default class App extends Component {

  state = {
    data: null,
    loading: true,
    placeCoordinates: null
  }

  weather = new Weather();

  componentDidMount(){
    // this.updateWeather()
  }
  
  updateWeather(lat, lng){

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
      placeCoordinates: selectedPlace
    })

    // console.log(selectedPlace);

    const lat = selectedPlace.geometry.location.lat()
    const lng = selectedPlace.geometry.location.lng()

    this.updateWeather(lat, lng);
  }

  render(){
    const { loading } = this.state;

    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
           { this.state.placeCoordinates ? <h2 className="m-5 mb-0">{this.state.placeCoordinates.formatted_address}</h2> : null}
          </Col>
        </Row>
        <Row>
          <Col className="m-5 d-flex justify-content-center">
            <LocationSearchInput onPlaceSelected={ this.placeSelectedHandler }/> </Col>
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

