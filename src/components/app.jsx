import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import Inventory from './history'

import LG1 from '../models/lg1'
import LG7 from '../models/lg7'
import OutCampus from '../models/out-campus'
import { version } from '../../package.json';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.setView = this.setView.bind(this)
    this.lg1 = new LG1()
    this.lg7 = new LG7()
    this.outCampus = new OutCampus()
    this.state = {
      view: 'banners',
      currentDetails: 'lg1',
      selectedWish: 'out-campus',
      inventory: {},
      isSettingsPageVisible: false,
      currentWishes: [],
      selectedEventWish: 'lg1',
      userWishes: {
        'out-campus': 0,
        'lg7': 0,
        'lg1': 0,
      }
    }
  }
  // handleKeyDown(event){
  //   if(event.keyCode === 13 && this.state.view != "banners"){
  //     this.backToHome()
  //   }
  // }
  componentDidMount() {
    this.clearLocalStorageEveryNewBuild();
    this.loadData()
    // document.addEventListener("keydown", this.handleKeyDown);
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
    this.setState({
      view: 'banners'
    })
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  setSelectedWish(selectedWish) {
    this.setState({selectedWish})
  }
  wish(selectedWish) {
    this.setState({
      currentWishes: [this[selectedWish].rollOnce()],
      selectedWish
    }, () => this.setView('wish'))
  }
  updateInventory(items) {
    // Deep copy inventory
    let { inventory } = this.state
    inventory = Object.assign({}, inventory)
    for(const item in inventory) {
      inventory[item] = Object.assign({}, inventory[item])
    }
    // Organize the items to update quantity
    for(let i = 0; i < items.length; i++) {
      if(inventory[items[i].name]) {
        inventory[items[i].name].quantity++
      } else {
        inventory[items[i].name] = items[i]
        inventory[items[i].name].quantity = 1
      }
    }
    this.setState({inventory, currentWishes: []}, this.saveData)
  }
  updateEventWish(selectedEventWish) {
    this.setState({
      selectedEventWish
    }, this.saveData)
  }
  getFormattedEventWish(format, selectedEventWish) {
    if(!selectedEventWish) {
      selectedEventWish = this.state.selectedEventWish
    }
    const options = {
      camelCase() {
        return this.formatter(true)
      },
      pascalCase() {
        return this.formatter(false)
      },
      formatter(isCamel) {
        const words = selectedEventWish.split('-')
        for (let i = 0; i < words.length; i++) {
          if(isCamel && !i) continue
          const word = words[i]
          words[i] = word[0].toUpperCase() + word.slice(1)
        }
        return words.join('')
      },
      kebabCase() {
        return selectedEventWish
      }
    }
    return options[format]()
  }
  syncWishCountersWithState() {
    this.setState({
      userWishes: {
        'out-campus': this.outCampus.getState().attemptsCount,
        'lg7': this.lg7.getState().attemptsCount,
        'lg1': this.lg1.getState().attemptsCount,
      }
    })
  }
  reset(previouslySelectedWish) {
    this.outCampus.reset()
    this.lg7.reset()
    this.lg1.reset()
    this.setState({
      selectedWish: previouslySelectedWish,
      inventory: {}
    }, this.saveData)
  }
  saveData() {
    const {
      inventory,
      selectedEventWish
    } = this.state
    const data = {
      version: 1,
      inventory,
      selectedEventWish,
      outCampus: this.outCampus.getState(),
      lg7: this.lg7.getState(),
      lg1: this.lg1.getState(),
    }
    localStorage.setItem('data', JSON.stringify(data))
    this.syncWishCountersWithState()
  }
  loadData(){
    const data = JSON.parse(localStorage.getItem('data'))
    if(!data) return;
    if (!data.version) {
      // Load original version (without softPity4 and softPity5)
      const {
        inventory
      } = data
      this.outCampus.attemptsCount = data.outCampus || 0
      this.lg7.attemptsCount = data.lg7 || 0
      this.lg1.attemptsCount = data.lg1 || 0
      this.setState({
        inventory
      }, this.backToHome)
    } else {
      // Load version 1 with softPity4 and softPity5
      const {
        inventory,
        selectedEventWish
      } = data
      this.outCampus.setState(data.outCampus);
      this.lg7.setState(data.lg7);
      this.lg1.setState(data.lg1)
      this.setState({
        inventory,
        selectedEventWish
      }, () => {
          this.backToHome()
          this.syncWishCountersWithState()
      })

    }

  }

  clearLocalStorageEveryNewBuild() {
    // If there is a new update or the user does not have the 'appVersion', we'll give one.
    // We will also reset the local storage every time a new build occurs to avoid cache problems.
    // We have to make sure to always bump the version number every time a new banner comes out, though.
    if (!localStorage.getItem("appVersion") || localStorage.getItem("appVersion") !== version) {
      localStorage.clear();
      localStorage.setItem("appVersion", version);
    }
  }
  render () {
    const {
          currentDetails,
          view,
          inventory,
          selectedDetail,
          currentWishes,
          selectedEventWish,
          userWishes
        } = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              selectedBanner={currentDetails}
              getFormattedEventWish={this.getFormattedEventWish.bind(this)}
              updateEventWish={this.updateEventWish.bind(this)}
              wish={this.wish.bind(this)}
              reset={this.reset.bind(this)}
              userWishes={userWishes}
            />
          case 'details':
            return <Details
            backToHome={this.backToHome.bind(this)}
            selectedDetail={currentDetails}
            />
          case 'wish':
            return <Wish
            setView={this.setView}
            is4StarItem={currentWishes.some(item => item.rating === 4)}
            is5StarItem={currentWishes.some(item => item.rating === 5)}
            />
          case 'wish-results':
            return <WishResults
            wishes={currentWishes}
            updateInventory={this.updateInventory.bind(this)}
            setView={this.setView}
            inventory={inventory}
            />
          case 'inventory':
            return <Inventory
            inventory={inventory}
            backToHome={this.backToHome.bind(this)}
            />
        }
  }
}

