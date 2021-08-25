import { Component } from 'react';

export default class Places extends Component {

  ak = 'AIzaSyBhXGs0sQKWcCmNeCnIdVaQAb8oUXbbTeQ';

  async getPhotoUrl(placeID){
    return await fetch(`https://qpsh-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=photos&key=${this.ak}`)
    .then(data => data.json())
    .then(resp => {
      
      let photoReferecne;

          if(resp.result){
            photoReferecne = resp.result.photos[0].photo_reference;
          } else {
            photoReferecne = null;
          }
      return photoReferecne;

    });
  }

  async reverseGeolocation(lat, lng){
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${this.ak}`)
    .then(data => data.json())
    .then(resp => {
      console.log(resp.results[0]);
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



 

}