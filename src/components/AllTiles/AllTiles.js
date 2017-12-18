import React, { Component } from 'react';

import axios from 'axios';

class AllTiles extends Component {

  constructor(props) {

    super(props);
    
    this.renderAllTiles = this.renderAllTiles.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.allTilesPlaces.length !== this.props.allTilesPlaces.length) {
      this.props.getData();
    }
  }

  delete(id) {
    axios.delete(`http://localhost:8080/${id}`)
    .then(
      setTimeout(this.props.getData, 500)
    )
  }
  
  renderAllTiles() {
    if (this.props.allTilesPlaces !== undefined) {
      if (this.props.allTilesPlaces.length === 0) {
        return (
          <div className="emptyHome">
                <div className="icon"></div>
                  <div className="text">
                  <p>Wanna know if youll melt outside?</p>
                  <p>Start getting some weather.</p>
                  </div>
                </div>
              )
          } else {
              if (this.props.allTilesWeather !== undefined) {
                let count = -1;
                return (
                  this.props.allTilesPlaces.map(e => {
                  count++;
                  let weather = this.props.allTilesWeather[count];
                  return (
                    <div className="tile" key={e.id}>
                      {this.props.isEditMode === true && <div onClick={() => {this.delete(e.id)}} className="deleteButton"></div>}
                      <div className="tileContent" onClick={() => {this.props.oneTile(e.id, e.city, e.state, e.country)}}>
                        <div className={weather.currently.icon}>
                          <div className="title">
                            <span>{e.city} . </span>
                            {e.state.length <= 3 && <span>{e.state} . </span>}
                            <span>{e.country}</span>
                          </div>
                          <div className="icon"></div>
                          <div className="main-temp">{Math.round(weather.currently.temperature)}°</div>
                          <div className="temp">
                            <div className="divsTemp">L <span className="numbersTemp">{Math.round(weather.daily.data[0].temperatureLow)}°</span></div>
                            <div className="divsTemp">H <span className="numbersTemp">{Math.round(weather.daily.data[0].temperatureMax)}°</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            }
          }
    }
  }

  render() {
    return (
      <div className="AllTiles">
        {this.renderAllTiles()}
        {this.props.allTilesPlaces.length !== 0 &&
          <div>
            <div className="tile-to-add">
            <button className="add-button-tile" onClick={this.props.onClickButton}></button>
            <div>GET SOME WEATHER</div>
            </div>
          </div>}
      </div>
    );
  }
}

export default AllTiles;
