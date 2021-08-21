import { Component } from 'react';

export default class Places extends Component {

  ak = 'AIzaSyBhXGs0sQKWcCmNeCnIdVaQAb8oUXbbTeQ';

  async getPhotoUrl(placeID){
    return await fetch(`https://qpsh-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=photos&key=${this.ak}`)
    .then(data => data.json());
  }

 

}