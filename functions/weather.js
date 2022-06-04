
import fetch from 'node-fetch';

exports.handler = async function (event, context) {

  const { lat, lng } = event.queryStringParameters;
  const _apiBase = 'https://api.weatherbit.io/v2.0/forecast/';
  const res = await fetch(`${_apiBase}daily?lang=pl&lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`)
  .then(res => res.json())

    
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  }