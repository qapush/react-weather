import { Component } from 'react';

export default class Places extends Component {

  ak = 'AIzaSyBhXGs0sQKWcCmNeCnIdVaQAb8oUXbbTeQ';

  async getPhotoUrl(placeID){
    return await fetch(`https://qpsh-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=photos&key=${this.ak}`)
    .then(data => data.json()) 
    .then(resp => {

      let photoRef;

          if(resp.result.photos){
            photoRef = resp.result.photos[0].photo_reference;
          } else {
            photoRef = null;
          }
      return photoRef;

    });
  }

  async reverseGeolocation(lat, lng) {
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${this.ak}`)
    .then(data => data.json())
    .then(resp => {
      return {
        placeId:resp.results[0].place_id,
        placeName: resp.results[0].formatted_address
      };
    })
    .catch(err => {
      return {
        placeId: null,
        placeName: `${lat} / ${lng}`
      }
    });
  }

  getCurrentLocation = async () => {
      
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    
      let coordPromise = await new Promise((success, error) => {
        navigator.geolocation.getCurrentPosition(success, error, options)
      });

      return coordPromise.coords;
     
  }

  currentLocation = async () => {
    
    let currentLocationObject = {
      lat: null,
      lng: null,
      name: null,
      placeId: null,
      photoUrl: null
    }

    let currentLocationRawData = await this.getCurrentLocation();

    let lat = currentLocationRawData.latitude,
        lng = currentLocationRawData.longitude;
    
    currentLocationObject.lat = lat;
    currentLocationObject.lng = lng;


    await this.reverseGeolocation(lat, lng)
        .then(res => {
          currentLocationObject.name = res.placeName;
          currentLocationObject.placeId = res.placeId;
        })

    await this.getPhotoUrl(currentLocationObject.placeId)
          .then(res => {
            currentLocationObject.photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${res}&maxwidth=400&key=${this.ak}`;
          })
          
    return currentLocationObject;
  }

  selectedPlaceData = async (placeObject) => {
    
    let currentLocationObject = {
      lat: null,
      lng: null,
      name: null,
      placeId: null,
      photoUrl: null
    } 

    currentLocationObject.placeId = placeObject[0].place_id;
    currentLocationObject.lat = placeObject[0].geometry.location.lat();
    currentLocationObject.lng = placeObject[0].geometry.location.lng();
    currentLocationObject.name = placeObject[0].address_components[0].long_name;
    currentLocationObject.photoUrl = await this.getPhotoUrl(currentLocationObject.placeId)
                                                .then(res => {
      return `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${res}&maxwidth=400&key=${this.ak}`;
    });

    return currentLocationObject;

  }
  

}


