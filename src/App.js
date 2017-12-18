import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import View from './components/View/View';

import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      mode: "View All",
      tiles: [],
      empty: true,
      clickedid: "",
      cityclicked: "",
      stateclicked: "",
      countryclicked: "",
      allTilesPlaces: [],
      allTilesWeather: []
    }

    this.getData = this.getData.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.backToViewAll = this.backToViewAll.bind(this);
    this.changeEmpty = this.changeEmpty.bind(this);
    this.oneTile = this.oneTile.bind(this);
    this.onEditButton = this.onEditButton.bind(this);
  }
  
  componentDidMount() {
    this.getData();
  }
  
  getData() {
    axios.get(`https://flyhigh.herokuapp.com/`)
    .then(res => {
      const places = res.data.places || [];
      this.setState({
        allTilesPlaces: [...places],
        allTilesWeather: res.data.weatherData
      });
      this.changeEmpty(places.length === 0)
    })
  }

  onClickButton() {
    this.setState({
      mode: "Search"
    })
  }

  backToViewAll(){
    this.setState({
      mode: "View All"
    })
  }

  onEditButton() {
    this.setState({
      mode: "Edit"
    })
  }

  changeEmpty(value){
    this.setState({
      empty: value
    })
  }

  oneTile(id, city, state, country) {
    this.setState({
      clickedid: id,
      cityclicked: city,
      stateclicked: state,
      countryclicked: country,
      mode: "View One"
    })
  }

  render() {
    return (
      <div className="App">

        <Header
          mode={this.state.mode}
          back={this.backToViewAll}
          goToEditPage={this.onEditButton}
          isEmpty={this.state.empty}
          cityclicked={this.state.cityclicked}
          stateclicked={this.state.stateclicked}
          countryclicked={this.state.countryclicked} />
        <View
          mode={this.state.mode}
          getData={this.getData}
          back={this.backToViewAll}
          changeEmpty={this.changeEmpty}
          oneTile={this.oneTile}
          clickedId={this.state.clickedid}
          onClick={this.onClickButton}
          allTilesPlaces={this.state.allTilesPlaces}
          allTilesWeather={this.state.allTilesWeather} />
        <button className="add-button"
          onClick={this.onClickButton}></button>

      </div>
    );
  }
}

export default App;
