export default class Weather {
    
    // WEATHERBIT
    _apiBase = 'https://api.weatherbit.io/v2.0/forecast/'
    _apiKey = '1ab4251065d442a481c2c53c4ce256da'

    // OPENWEATHERMAP - 5 days every 3 hour forecast
    _apiKey_openweather = 'd338ec81fda2cfb0397686e34d6fa8be';

    async getWeather(lat,lng){
         
        const res = await fetch(`${this._apiBase}daily?lang=pl&lat=${lat}&lon=${lng}&key=${this._apiKey}`)

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
