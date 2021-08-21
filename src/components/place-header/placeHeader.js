import { Component } from "react";
import './placeHeader.css'

export default class PlaceHeader extends Component{
    render(){
        const { place, url } = this.props;
        return(
          <div className="place-header">
              <div className="place-header__description">
                <h2>{ place }</h2>
              </div>
              <div className="place-header__image" style={{ "backgroundImage":`url(${ url })` }} >
              </div>
          </div>
        )
    }
}