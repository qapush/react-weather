
import fetch from 'node-fetch';

exports.handler = async function (event, context) {


  const { lat, lng, date } = event.queryStringParameters;
  const _apiBase = 'https://api.openweathermap.org/data/2.5/forecast/';
  const res = await fetch(`${_apiBase}?units=metric&lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`)
  .then(res => res.json())

    
    return {
      statusCode: 200,
        body: JSON.stringify(res),
    };
  }