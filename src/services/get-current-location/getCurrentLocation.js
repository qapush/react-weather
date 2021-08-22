import { Component } from "react";

export default class GetCurrentLocation extends Component {

    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    success = (pos) => {
      
      let lat = pos.coords.latitude,
          lng = pos.coords.longitude;
    
        console.log({lat, lng}); 
    }
    
    error = (err) => {
    }
    
    getUserLocation = () => {
        return new Promise((success, error) => {
            navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
        })
    }

}



