import { Component } from "react";
import { Row, Col } from "reactstrap";
import './hourlyForecast.css'

export default class HourlyForecast extends Component{

    render(){

        const data = this.props.hourlyData;
        console.log(data);
        const hours = data.map((item, index) => {
            return(
                <div className="hourCard" key={index}>
                    <p className="hour__title">{new Date(item.dt * 1000).getUTCHours()}:00</p>
                    <hr className="hour__hr"/>
                    <img className="mb-3" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="hpurly icon" /> 
                    <p className="hour__temp">
                        { `${Math.round(item.main.temp)}°C` }
                    </p>
                    <p className="hour__feels-like">
                        { `Odczuwalna: ${Math.round(item.main.feels_like)}°C` }
                    </p>
                </div>
            )
        })


        return(
        <Row>
            <Col className="mt-4 mb-4 text-center">
                <h2 className="mb-5">Prognoza godzinowa:</h2>
                <div className="hoursInner d-flex justify-content-xl-center">
                    { hours }
                </div>
            </Col>
            
        </Row>
        )
    }
}