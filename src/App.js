import { Component } from 'react';
import './App.css';
import Weather from './services';

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
        <h1>Weather</h1>
        { loading ? null : <List data={ this.state.data } /> }
     </>
     );
  }
}

const List = ({data}) => {
  
  const days = data.map((item, index) => {
    return(
      <div className="card" key={index}>
        <h3>{item.valid_date}</h3>
        <hr />
        <p style={{color:"blue", textAlign:"center"}}>{ item.weather.description }</p>
        <img src={`${process.env.PUBLIC_URL}/icons/${ item.weather.icon }.png`} alt="icon" />
        <p>Max temp: <span style={{fontWeight:"bold"}}>{ item.max_temp }</span></p>
        <p>Min temp: <span style={{fontWeight:"bold"}}>{ item.min_temp }</span></p>
      </div>
    )
  })
  
  return(
    <>
      <h2>A List:</h2>
     <div className="cards">
      { days }
     </div>
    </>
  )

}

