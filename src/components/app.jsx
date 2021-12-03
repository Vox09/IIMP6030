import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import Inventory from './history'

import K1 from '../models/k1'
import K2 from '../models/k2'
import K3 from '../models/k3'
import { version } from '../../package.json';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.setView = this.setView.bind(this)
    this.k1 = new K1()
    this.k2 = new K2()
    this.k3 = new K3()
    this.state = {
      view: 'banners',
      currentDetails: 'k1',
      selectedWish: 'k1',
      inventory: {},
      isSettingsPageVisible: false,
      currentWishes: [],
      userWishes: {
        'k3': 0,
        'k2': 0,
        'k1': 0,
      }
    }
  }
  listener(e){
    if (e.keyCode === 13){
      const view = this.state.view
      if (view != 'banners' && view != 'wish'){
        this.backToHome()
      }
      if (view === 'banners'){
        this.wish(this.state.selectedWish)
      }
    }
  }
  componentDidMount() {
    this.clearLocalStorageEveryNewBuild();
    this.loadData()
    window.addEventListener("keyup", this.listener.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.listener.bind(this));
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
  syncWishCountersWithState() {
    this.setState({
      userWishes: {
        'k3': this.k3.getState().attemptsCount,
        'k2': this.k2.getState().attemptsCount,
        'k1': this.k1.getState().attemptsCount,
      }
    })
  }
  reset(previouslySelectedWish) {
    this.k3.reset()
    this.k2.reset()
    this.k1.reset()
    this.setState({
      selectedWish: previouslySelectedWish,
      inventory: {}
    }, this.saveData)
  }
  saveData() {
    const {
      inventory,
    } = this.state
    const data = {
      version: 1,
      inventory,
      k3: this.k3.getState(),
      k2: this.k2.getState(),
      k1: this.k1.getState(),
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
      this.k3.attemptsCount = data.k3 || 0
      this.k2.attemptsCount = data.k2 || 0
      this.k1.attemptsCount = data.k1 || 0
      this.setState({
        inventory
      }, this.backToHome)
    } else {
      // Load version 1 with softPity4 and softPity5
      const {
        inventory,
      } = data
      this.k3.setState(data.k3);
      this.k2.setState(data.k2);
      this.k1.setState(data.k1)
      this.setState({
        inventory,
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
          userWishes
        } = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              selectedBanner={currentDetails}
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

