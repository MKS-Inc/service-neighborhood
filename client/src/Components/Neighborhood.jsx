/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import Scores from './Scores.jsx';
import Stats from './Stats.jsx';
import SeeMore from './SeeMore.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      house: {},
      houses: [],
      neighborhood: {},
    };
    this.getHouseData = this.getHouseData.bind(this);
    this.getNeighborhoodData = this.getNeighborhoodData.bind(this);
    this.getNearbyHousesData = this.getNearbyHousesData.bind(this);
  }

  componentDidMount() {
    const url = window.location.href.split('/');
    const houseId = url[3];
    this.getHouseData(houseId);
    
    
  }

  getNeighborhoodData(neighborhood, houseId) {
    axios.get(`/api/houses/${houseId}/neighborhoods`, {
      params: {
        id: neighborhood,
      },
    })
      .then((response) => {
        console.log(response);
        const { house } = this.state;
        this.setState({
          neighborhood: response.data[0],
        }); 
        this.getNearbyHousesData(neighborhood, houseId);

      })
      .catch((err) => {
        throw err;
      });
  }

  getHouseData(houseId) {
    axios.get(`/api/houses/${houseId}`, {
      params : {
        id : houseId
      }
    })
      .then((response) => {
          console.log(response);
          this.setState({
            house : response.data[0],
          });
        
        this.getNeighborhoodData(this.state.house.neighborhood_id, houseId);
      })
      .catch((err) => {
        throw err;
      });
  }

  getNearbyHousesData(neighborhood_id, houseId){
    axios.get(`/api/houses/${houseId}/nearbyHouses`, {
      params : {
        neighborhood_id : neighborhood_id
      }
    })
    .then((response) => {
      this.setState({
        houses : response.data
      })
    })
    .catch((err) => {
      throw err;
    })
  }

  currentHouse(setHouse) {
    const { houses } = this.state;
    this.setState({ house: setHouse, houses: [...houses] });
  }

  render() {
    const { house, houses, neighborhood } = this.state;
    const currentHouse = !Object.keys(house).length ? null : house;
    let scores = <div />;
    let stats = <div />;
    let seeMore = <div />;
    console.log(this.state);
    if (Object.keys(neighborhood).length) {
      scores = <Scores neighborhood={neighborhood} />;
      stats = <Stats neighborhood={neighborhood} house={house} />;
      seeMore = <SeeMore neighborhood={neighborhood} houses = {houses} />;
    }
    return (
      <div id="appContainer">
        <h2 id="neighborhoodHeader">
          Neighborhood: {currentHouse ? this.state.neighborhood.neighborhood : ''}
        </h2>
        {scores}
        {stats}
        {seeMore}
      </div>
    );
  }
}

export default App;
