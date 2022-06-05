
import fetch from 'node-fetch';

exports.handler = async function (event, context) {

    const { place_id, key} = event.queryStringParameters;
    
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photos&key=${key}`)
        .then(res => res.json())
    
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  }