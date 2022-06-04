
export default class Weather {

    // OPENWEATHERMAP - 5 days every 3 hour forecast
    _apiKey_openweather = 'd338ec81fda2cfb0397686e34d6fa8be';

    async getWeather(lat,lng){
           
        const res = await fetch(`api/weather/?lat=${lat}&lng=${lng}`)

        if(!res.ok){
            throw new Error(`Could not fetch ${this._apiBase} received ${res.status}`)
        }

        return await res.json();
        
 
    }

    async getHeourlyWeather(lat,lng, date){

        let selectedDayWeather;
         
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lng}&appid=${this._apiKey_openweather}`).then(res => res.json()).then(res => {
            selectedDayWeather = res.list.filter(item => {
                const cur = new Date(item.dt * 1000).getDate();
                return date === cur;
            })
        })

        return selectedDayWeather;
 
    }

}
