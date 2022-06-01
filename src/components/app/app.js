import { Component } from 'react';
import './app.css';
import Weather from '../../services/get-weather';
import LocationSearchInput from '../../services/location-autocomplete';
import Places from '../../services/places-api';
import Spinner from '../spinner';
import { Container, Row, Col } from 'reactstrap';
import PlaceHeader from '../place-header';
import DayCards from '../day-cards';
import HourlyForecast from '../hourly-forecast';  



export default class App extends Component {

  state = {
      loading: false,
      lan: null,
      lng: null,
      name:null,
      placeId: null,
      photoUrl: null,
      weatherData: null,
      hourlyData: null
    }

  weather = new Weather();
  places = new Places();

  componentDidUpdate(){

  }
  componentDidMount() {
    console.log(process.env.WEATHER_API)
    this.useCurrentLocation()
  }

  useCurrentLocation = () => {

    this.setState({loading:true})
      this.setState({hourlyData:null})
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
        loading: true,
        hourlyData: null
      })
      this.updateWeather( selectedPlace.lat, selectedPlace.lng );
  }

  updateWeather = (lat, lng) => {

    this.weather.getWeather(lat, lng)
        .then(res => this.setState({
          weatherData: res.data,
          loading: false
        }));
  }

  daySelected = (itm) => {
    const date = new Date(itm.datetime).getDate();
    this.weather.getHeourlyWeather(this.state.lat, this.state.lng, date)
        .then(res => this.setState({
          hourlyData: res
        }))
  }

  render(){

    const { loading, name, photoUrl, weatherData, hourlyData  } = this.state;
  
    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
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
        
        { weatherData && !loading ? <DayCards data={ weatherData } daySelected={ this.daySelected }/> : null }
        { hourlyData ? <HourlyForecast hourlyData={ this.state.hourlyData }/> : null}
       </Container>
     </>
     );
  }
}

