
export default class Weather {

    async getWeather(lat,lng){
          
        const res = await fetch(`api/weather?lat=${lat}&lng=${lng}`)

        if(!res.ok){
            throw new Error(`Could not fetch ${this._apiBase} received ${res.status}`)
        }

        return await res.json();
        
 
    }

    async getHourlyWeather(lat, lng, date) {
        
        let selectedDayWeather;

        await fetch(`api/weather/hourly/?lat=${lat}&lng=${lng}`)
        .then(res => res.json())
        .then(res => {
        selectedDayWeather = res.list.filter(item => {
            const cur = new Date(item.dt * 1000).getDate();
            return date === cur;
        })
    })
        return selectedDayWeather;
 
    }

    async getHeourlyWeather2(lat,lng, date){

        let selectedDayWeather;
         
        await fetch(`api/weather/hourly?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(res => {
            selectedDayWeather = res.list.filter(item => {
                const cur = new Date(item.dt * 1000).getDate();
                console.log('CUR', cur)
                return date === cur;
            })
        })

        return selectedDayWeather;
 
    }

}
