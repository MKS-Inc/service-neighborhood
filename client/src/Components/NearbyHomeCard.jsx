/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import axios from 'axios';

class NearbyHomeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filled: 0,
      heart: (<div className="unfilledHeart"><svg width="22" height="22" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="heart"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg></div>),
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.getHeartStatus = this.getHeartStatus.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    // this.getHeartStatus(id);
  }

  getHeartStatus(id) {
    axios.get('/api/houses', {
      params: {
        houseId: id,
      },
    })
      .then((response) => {
        const heartType0 = (<div className="unfilledHeart"><svg width="22" height="22" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="heart"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg></div>);
        const heartType1 = (<div className="filledHeart"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg></div>);
        this.setState({
          filled: response.data[0].heart_filled,
          heart: (response.data[0].heart_filled ? heartType1 : heartType0),
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleHeartClick(id) {
    document.addEventListener('mousedown', (event) => {
      if (event.detail > 1) {
        event.preventDefault();
      }
    }, false);

    const { filled } = this.state;
    let heartType;

    axios.put('/api/houses', {
      params: {
        houseId: id,
      },
    })
      .then((response) => {
        this.getHeartStatus(id);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { home, id } = this.props;
    const { heart } = this.state;
    return (
      <div className="houseCard">
        <div className="cardImageContainer">
          <img src={`https://hrfecimages.s3-us-west-1.amazonaws.com/${this.props.home.home_image.slice(1)}`} alt="home" className="cardImage" />
        </div>
        <div onClick={() => this.handleHeartClick(id)}>{heart}</div>
        <div className="cardInfo">
          <div>
            <span className="homeCost">${Number(home.home_cost).toLocaleString()}</span>
          </div>
          <div className="homeAddress smallText">{home.home_address}, San Francisco, CA</div>
          <div>
            <span className="smallText bold">{home.bedrooms}</span>
            <span className="smallText"> bd</span>
            <span className="bullet smallText"> • </span>
            <span className="smallText bold">{home.bathrooms}</span>
            <span className="smallText"> ba</span>
            <span className="bullet smallText"> • </span>
            <span className="smallText bold">{home.sf}</span>
            <span className="smallText"> sqft</span>
          </div>
        </div>
      </div>
    );
  }
}


export default NearbyHomeCard;
