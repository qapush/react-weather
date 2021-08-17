export default class Weather {
    

    _apiBase = 'https://api.weatherbit.io/v2.0/forecast/daily'
    _apiKey = '1ab4251065d442a481c2c53c4ce256da'

    async sixteenDaysForecast(){
        
        const res = await fetch(`${this._apiBase}?lang=pl&city=Warsaw&country=PL&key=${this._apiKey}`)

        if(!res.ok){
            throw new Error(`Could not fetch ${this._apiBase} received ${res.status}`)
        }
        
        return await res.json(); 

    }

}
