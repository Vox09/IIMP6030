import React, { Component } from 'react';
import BannerButton from './banner-button';
import { Carousel } from 'react-responsive-carousel';
import Settings from './settings'

const banners = require.context('../assets/images/banners', true);
export default class Banners extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBanner: 'k1',
      banners: {
        'k1': 'Kitchen 1 Food Gacha',
        'k2': 'Kitchen 2 Food Gacha',
        'k3': 'Kitchen 3 Food Gacha'
      },
      wishes: {
        'k1': 'k1',
        'k2': 'k2',
        'k3': 'k3'
      },
    }
  } 

  componentDidMount() {
    this.setState({ selectedBanner: this.props.selectedBanner })
  } 
  componentDidUpdate(prevProps) {
    // If the user selected a new banner
    const { selectedBanner } = this.state
  }
  onCarouselChange(index) {
    this.switchBanner(Object.keys(this.state.banners)[index])
  }
  switchBanner(selectedBanner) {
    this.setState({ selectedBanner }, () => {
      this.props.setCurrentDetails(selectedBanner)
      this.props.setSelectedWish(this.state.wishes[selectedBanner])
    })
  }
  get bannerText() {
    return this.state.banners[this.state.selectedBanner]
  }
  toggleSettingsModal(isSettingsPageVisible) {
    this.setState({
      isSettingsPageVisible
    })
  }

  
  render() {
    const {
      selectedBanner,
      isSettingsPageVisible
     } = this.state
    const {
      setView,
      reset,
      wish,
      userWishes
    } = this.props
    const bannerKeys = Object.keys(this.state.banners);
    const selectedBannerIndex = bannerKeys.findIndex(b => b === selectedBanner)
    return (
      <>
        {
          isSettingsPageVisible &&
          <Settings
            closeSettings={() => this.toggleSettingsModal(false)}
            reset={() => reset(selectedBanner)}
          />
        }
        <div className="wrapper banners">
          <div className="giws-banners-container">
            <div className="heading">
              <div className="current-banner">
                <div>{this.bannerText}</div>
              </div>
              <div className="select-banner">
                {
                  bannerKeys.map(banner => (
                    <BannerButton
                      key={banner}
                      isSelected={banner === selectedBanner}
                      className={banner}
                      onClick={() => this.switchBanner(banner)}
                    />
                  ))
                }
              </div>
              <div className="close-window"></div>
            </div>
            <div className="carousel-container">
              <Carousel
                className={"carousel"}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                emulateTouch={false}
                showArrows={false}
                infiniteLoop={true}
                selectedItem={selectedBannerIndex}
                onChange={this.onCarouselChange.bind(this)}
              >
                {
                  bannerKeys.map(banner => {
                    return (
                      <div key={banner} className={`banner-slide ${banner}`}>
                        <div
                        title={`Your wish counter, you have wished ${userWishes[banner]} times`}
                        className="wish-counter">{userWishes[banner]}</div>
                        <img src={banners(`./${banner}.png`).default} />
                      </div>
                    )
                  })
                }
              </Carousel>
            </div>
            <div className="action-container">
              <div className="button-container">
                <button
                  onClick={() => this.toggleSettingsModal(true)}
                >Settings</button>
                <button
                  onClick={() => setView('details')}
                >Details</button>
                <button
                  onClick={() => setView('inventory')}
                >History</button>
              </div>
              <div className="wish-container d-flex justify-content-center">
                <div
                  onClick={() => {
                    wish(this.state.wishes[selectedBanner])
                  }}
                  className="wish-button"
                >Eat What?</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
