
import { Card } from 'reactstrap';

function DayCard({item, index, onDaySelected}) {

        const date = new Date( item.valid_date ),
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
            <Card 
                className="text-center rounded dayCard"
                onClick={ () => { onDaySelected(item) } }
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

            </Card>
        )
    
}

export default DayCard;