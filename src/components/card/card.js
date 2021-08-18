import { Component } from "react";
import { Col } from 'reactstrap';
import './card.css';    

export default class Card extends Component {
    render(){

        const { item } = this.props,
              date = new Date( item.valid_date ),
              dni = [
                  'Niedziela',
                  'Poniedziałek',
                  'Wtorek',
                  'Środa',
                  'Czwartek',
                  'Piątek',
                  'Sobota',
              ],
              months = [
                  'Stycznia',
                  'Lutego',
                  'Marca',
                  'Kwietnia',
                  'Maja',
                  'Czerwca',
                  'Lipca',
                  'Sierpnia',
                  'Września',
                  'Października',
                  'Listopada',
                  'Grudnia'
              ]

        return(
            <Col 
                sm="6" 
                md="4" 
                lg="3"
            >
                <div 
                    className="text-center p-1 rounded m-5 mt-0 m-sm-0 mb-sm-4 weather-card"
                >
                    <img 
                        className="card__image"
                        src={`${process.env.PUBLIC_URL}/icons/${ item.weather.icon }.png`} 
                        alt="icon" 
                    />
                    <p className="card__day">{ dni[date.getDay()] }</p>
                    <p className="card__date">{ date.getDate() } { months[date.getMonth()] }</p>
                    <p>
                        <span className="temp-max">
                            { item.max_temp.toFixed(0) }
                        </span>
                        &nbsp;/&nbsp;
                        <span className="temp-min">
                            { item.min_temp.toFixed(0) }
                        </span>
                    </p>
                </div>
            </Col>
        )
    }
}