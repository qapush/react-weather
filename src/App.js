import { Component } from 'react';
import './App.css';
import Weather from './services';

export default class App extends Component {

  weather = new Weather();  

  render(){
    return (
      <h1>{weather}</h1>
     );
  }
}

