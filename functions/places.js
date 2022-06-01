exports.handler = async function (event, context) {
    return {
      statusCode: 200,
        body: JSON.stringify({
            placesKey: process.env.PLACES_KEY
        }),
    };
  }