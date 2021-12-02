import React, { Component } from 'react';
import BannerButton from './banner-button';
import { Carousel } from 'react-responsive-carousel';
import Settings from './settings'

const banners = require.context('../assets/images/banners', true);
export default class Banners extends Component {
  constructor(props) {
    super(props)
    const selectedEventWish = this.props.getFormattedEventWish('kebabCase')
    this.state = {
      selectedBanner: 'lg7',
      selectedEventWish,
      banners: {
        [selectedEventWish]: 'In-Campus Food Gacha',
        'out-campus': 'Out-Campus Food Gacha'
      },
      wishes: {
        [selectedEventWish]: this.props.getFormattedEventWish('camelCase', selectedEventWish),
        'out-campus': 'outCampus'
      },
      isSettingsPageVisible: false
    }
    this.wish
  } 
  // handleKeyDown(event){
  //   if(event.keyCode === 13 && this.wish){
  //     wish(this.state.wishes[selectedBanner])
  //   }
  // }
  componentDidMount() {
    this.setState({ selectedBanner: this.props.selectedBanner })
    // document.addEventListener("keydown", this.handleKeyDown);
  }
  componentDidUpdate(prevProps) {
    const newSelectedEventWish = this.props.getFormattedEventWish('kebabCase')
    // If the user selected a new banner
    const { selectedEventWish, selectedBanner } = this.state
    if(newSelectedEventWish !== selectedEventWish) {
      const { banners: oldBanners, wishes: oldWishes } = this.state
      const banners = {}
      const wishes = {}
      for(const b in oldBanners) {
        if(selectedEventWish === b) {
          banners[newSelectedEventWish] = 'In-Campus Food Gacha'
        } else {
          banners[b] = oldBanners[b]
        }
      }
      for(const w in oldWishes) {
        if(selectedEventWish === w) {
          wishes[newSelectedEventWish] = this.props.getFormattedEventWish('camelCase', newSelectedEventWish)
        } else {
          wishes[w] = oldWishes[w]
        }
      }
      let newSelectedBanner = null
      if(selectedBanner === selectedEventWish) {
        newSelectedBanner = newSelectedEventWish
      } else {
        newSelectedBanner = selectedBanner
      }
      this.setState({
        selectedEventWish: newSelectedEventWish,
        banners,
        wishes,
        selectedBanner: newSelectedBanner
      })
    }
  }
  onCarouselChange(index) {
    this.switchBanner(Object.keys(this.state.banners)[index])
  }
  switchBanner(selectedBanner) {
    this.setState({ selectedBanner }, () => this.props.setCurrentDetails(selectedBanner))
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
      setSelectedWish,
      hideModal,
      reset,
      wish,
      getFormattedEventWish,
      updateEventWish,
      saveData,
      userWishes
    } = this.props
    const bannerKeys = Object.keys(this.state.banners);
    const selectedBannerIndex = bannerKeys.findIndex(b => b === selectedBanner)
    this.wish = wish
    return (
      <>
        {
          isSettingsPageVisible &&
          <Settings
            closeSettings={() => this.toggleSettingsModal(false)}
            reset={() => reset(selectedBanner)}
            updateEventWish={updateEventWish}
            getFormattedEventWish={getFormattedEventWish}
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
