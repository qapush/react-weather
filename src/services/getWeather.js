export default class Weather {
    
    constructor(){
        this._apiBase = 'https://api.weatherbit.io/v2.0/forecast/daily'
        this._apiKey = '1ab4251065d442a481c2c53c4ce256da'
    }

    async sixteenDaysForecast(){
        const res = await fetch(`${this._apiBase}?city=Warsaw&country=PL&key=${this._apiKey}`)
    }

}