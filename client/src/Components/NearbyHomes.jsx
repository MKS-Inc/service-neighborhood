/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable quote-props */
import React from 'react';
import Axios from 'axios';
import $ from 'jquery';
import NearbyHomeCard from './NearbyHomeCard.jsx';

class NearbyHomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nearbyHomes: this.props.houses,
      position: -162,
      cardCount: 0,
      leftDisabled: true,
      rightDisabled: false,
    };

    // this.getHouseData = this.getHouseData.bind(this);
    this.clickCarouselLeft = this.clickCarouselLeft.bind(this);
    this.clickCarouselRight = this.clickCarouselRight.bind(this);
  }


  // componentDidMount() {
  //   const { neighborhood } = this.props.neighborhood;
  // }

  // getHouseData(neighborhood) {
  //   Axios.get('/api/houses', {
  //     params: {
  //       name: neighborhood.neighborhood,
  //     },
  //   })
  //     .then((response) => {
  //       this.setState({
  //         nearbyHomes: response.data,
  //       });
  //     });
  // }

  clickCarouselLeft() {
    const { position, cardCount, rightDisabled } = this.state;
    if (position < -162) {
      this.setState({
        position: position + 162,
        cardCount: cardCount - 1,
      });
      if (position + 162 < position) {
        $('.cardContainer').css({
          'transform': `translate3d(${position}px, 0, 0)`,
        });
      } else {
        $('.cardContainer').css({
          'transform': `translate3d(${position + 324}px, 0, 0)`,
        });
      }
    }
    if (rightDisabled) {
      this.setState({
        rightDisabled: false,
      });
    }
    if (cardCount <= 1) {
      this.setState({
        leftDisabled: true,
      });
    }
    $('.medianToolTip').css({
      'display': 'none',
    });
    $('.walkToolTip').css({
      'display': 'none',
    });
    $('.transitToolTip').css({
      'display': 'none',
    });
  }

  clickCarouselRight() {
    const {
      // nearbyHomes,
      position,
      cardCount,
      leftDisabled,
    } = this.state;

    if (position - 162 > -162 * this.props.houses.length) {
      this.setState({
        position: position - 162,
        cardCount: cardCount + 1,
      });
      $('.cardContainer').css({
        'transform': `translate3d(${position}px, 0, 0)`,
      });
    }
    if (leftDisabled) {
      this.setState({
        leftDisabled: false,
      });
    }
    if (cardCount === this.props.houses.length - 3) {
      this.setState({
        rightDisabled: true,
      });
    }
  }

  render() {
    const { nearbyHomes, leftDisabled, rightDisabled } = this.state;
    let allNearby = <div />;
    if (this.props.houses.length) {
      allNearby = this.props.houses.map((home) => <NearbyHomeCard home={home} id={home.id} key={home.id} />);
    }
    return (
      <div className="carouselContainer">
        <button disabled={false} className={leftDisabled ? 'carouselButtonDisabled' : 'carouselButton'} id="buttonLeft" onClick={this.clickCarouselLeft} type="button"><svg className="svgArrowLeft" viewBox="0 0 36 36" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" /></svg></button>
        <div className="cardWindow">
          <div className="cardContainer">
            {allNearby}
          </div>
        </div>
        <button className={rightDisabled ? 'carouselButtonDisabled' : 'carouselButton'} id="buttonRight" onClick={this.clickCarouselRight} type="button"><svg className="svgArrowRight" viewBox="0 0 36 36" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" /></svg></button>
      </div>
    );
  }
}

export default NearbyHomes;
