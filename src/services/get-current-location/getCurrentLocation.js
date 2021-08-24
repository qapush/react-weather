
const Location = async () => {
      
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    
      let coordPromise = await new Promise((success, error) => {
          navigator.geolocation.getCurrentPosition(success, error, options);
      });

      return coordPromise.coords;
     
    }


export default Location;
