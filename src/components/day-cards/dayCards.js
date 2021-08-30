import DayCard from "./dayCard"
import './dayCards.css';

function DayCards({ data, daySelected }){

    const onDaySelected = (itm) => {
        daySelected(itm);
    }

    const days = data.map((item, index) => {
        
        if(index < 5) {
            return(
                <DayCard 
                key={ index }
                index={ index }
                item={ item }
                onDaySelected={ ()=> {onDaySelected(index)} }
                />
            )
        }
        return null;
    })
        
    return(
    
            <div className="daysInner mt-4 d-flex justify-content-xl-center"
            >
            { days }
            </div>
    
    )
      
}

  export default DayCards;