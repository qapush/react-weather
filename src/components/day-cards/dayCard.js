
import { Card } from 'reactstrap';

function DayCard({item, onDaySelected}) {

    const date = new Date( item.datetime ),
          today = new Date().getDay(),
          tomorrow = new Date().getDay() + 1,
        dni = [
            'Niedziela',
            'Poniedziałek', 
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota'
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
    
    let day;
    
    if(date.getDay() === today) {
        day = 'Dzisiaj'
    } else if(date.getDay() === tomorrow) {
        day = 'Jutro'
    } else {
        day = dni[date.getDay()]
    }


        
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
                <p className="card__day">{ day }</p>
                <p className="card__date">{ date.getDate() } { months[date.getMonth()] }</p>
                <p>
                    <span className="temp-max">
                        { `${item.max_temp.toFixed(0)}°C` }
                    </span>
                    &nbsp;/&nbsp;
                    <span className="temp-min">
                        { `${item.min_temp.toFixed(0)}°C` }
                    </span>
                </p>

            </Card>
        )
    
}

export default DayCard;