import { Component } from 'react';
import './App.css';
import Weather from './services';
import { Container, Row, Col } from 'reactstrap';
import Card from './components/card';

export default class App extends Component {

  state = {
    data: null,
    loading: true
  }

  weather = new Weather();

  componentDidMount(){
    this.updateWeather()
  }
  
  updateWeather(){

    this.weather.sixteenDaysForecast()
        .then(res => console.log(res.data[1]));

    this.weather.sixteenDaysForecast()
        .then(res => this.setState({
          data: res.data,
          loading: false
        }));
        
  }

  render(){
    const { loading } = this.state;

    return (
     <>
       <Container>
        <Row>
          <Col className="text-center">
            <h1 className="app-title m-5">Prognoza pogody:</h1>
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

