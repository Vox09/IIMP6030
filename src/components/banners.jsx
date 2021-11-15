import React, { Component } from 'react';
import BannerButton from './banner-button';
import { Carousel } from 'react-responsive-carousel';
import Modal from './modal';
import Settings from './settings'

const banners = require.context('../assets/images/banners', true);
export default class Banners extends Component {
  constructor(props) {
    super(props)
    const selectedCharacterEventWish = this.props.getFormattedCharacterEventWish('kebabCase')
    this.state = {
      selectedBanner: 'lg7',
      selectedCharacterEventWish,
      banners: {
        [selectedCharacterEventWish]: 'In-Campus Food Gacha',
        'out-campus': 'Out-Campus Food Gacha'
      },
      wishes: {
        [selectedCharacterEventWish]: this.props.getFormattedCharacterEventWish('camelCase', selectedCharacterEventWish),
        'out-campus': 'outCampus'
      },
      isSettingsPageVisible: false
    }

  }
  componentDidMount() {
    this.setState({ selectedBanner: this.props.selectedBanner })
  }
  componentDidUpdate(prevProps) {
    const newSelectedCharacterEventWish = this.props.getFormattedCharacterEventWish('kebabCase')
    // If the user selected a new banner
    const { selectedCharacterEventWish, selectedBanner } = this.state
    if(newSelectedCharacterEventWish !== selectedCharacterEventWish) {
      const { banners: oldBanners, wishes: oldWishes } = this.state
      const banners = {}
      const wishes = {}
      for(const b in oldBanners) {
        if(selectedCharacterEventWish === b) {
          banners[newSelectedCharacterEventWish] = 'In-Campus Food Gacha'
        } else {
          banners[b] = oldBanners[b]
        }
      }
      for(const w in oldWishes) {
        if(selectedCharacterEventWish === w) {
          wishes[newSelectedCharacterEventWish] = this.props.getFormattedCharacterEventWish('camelCase', newSelectedCharacterEventWish)
        } else {
          wishes[w] = oldWishes[w]
        }
      }
      let newSelectedBanner = null
      if(selectedBanner === selectedCharacterEventWish) {
        newSelectedBanner = newSelectedCharacterEventWish
      } else {
        newSelectedBanner = selectedBanner
      }
      this.setState({
        selectedCharacterEventWish: newSelectedCharacterEventWish,
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
      wasDisclaimerSeen,
      setView,
      setSelectedWish,
      hideModal,
      reset,
      wish,
      getFormattedCharacterEventWish,
      updateCharacterEventWish,
      saveData,
      userWishes
    } = this.props
    const bannerKeys = Object.keys(this.state.banners);
    const selectedBannerIndex = bannerKeys.findIndex(b => b === selectedBanner)
    return (
      <>
        {
          wasDisclaimerSeen
            ? null
            : <Modal hideModal={hideModal} />
        }
        {
          isSettingsPageVisible &&
          <Settings
            closeSettings={() => this.toggleSettingsModal(false)}
            reset={() => reset(selectedBanner)}
            updateCharacterEventWish={updateCharacterEventWish}
            getFormattedCharacterEventWish={getFormattedCharacterEventWish}
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
                >Inventory</button>
              </div>
              <div className="wish-container d-flex justify-content-center">
                <div
                  onClick={() => {
                    wish(this.state.wishes[selectedBanner], true)
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
