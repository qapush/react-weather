exports.handler = async function (event, context) {
    return {
      statusCode: 200,
        body: JSON.stringify({
            openweatherKey: process.env.OPENWEATHER_KEY,
            weatherbitKey: process.env.WEATHERBIT_KEY,
        }),
    };
  }