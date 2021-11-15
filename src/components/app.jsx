import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import Inventory from './inventory'

import ReignOfSerenity from '../models/reign-of-serenity'
import LG7 from '../models/lg7'
import WanderlustInvocation from '../models/wanderlust-invocation'
import { version } from '../../package.json';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.setView = this.setView.bind(this)
    this.lg7 = new LG7()
    this.wanderlustInvocation = new WanderlustInvocation()
    this.reignOfSerenity = new ReignOfSerenity()
    this.state = {
      view: 'banners',
      currentDetails: 'reign-of-serenity',
      selectedWish: 'wanderlust-invocation',
      inventory: {},
      wasDisclaimerSeen: false,
      isSettingsPageVisible: false,
      currentWishes: [],
      selectedCharacterEventWish: 'reign-of-serenity',
      userWishes: {
        'wanderlust-invocation': 0,
        'lg7': 0,
        'reign-of-serenity': 0,
      }
    }
  }
  componentDidMount() {
    this.clearLocalStorageEveryNewBuild();
    this.loadData()
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
    this.setState({
      view: 'banners'
    })
  }
  hideModal() {
    this.setState({
      wasDisclaimerSeen: true
    })
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  setSelectedWish(selectedWish) {
    this.setState({selectedWish})
  }
  wish(selectedWish, isOneWish = false) {
    this.setState({
      currentWishes: isOneWish ? [this[selectedWish].rollOnce()] : this[selectedWish].roll(),
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
  updateCharacterEventWish(selectedCharacterEventWish) {
    this.setState({
      selectedCharacterEventWish
    }, this.saveData)
  }
  getFormattedCharacterEventWish(format, selectedCharacterEventWish) {
    if(!selectedCharacterEventWish) {
      selectedCharacterEventWish = this.state.selectedCharacterEventWish
    }
    const options = {
      camelCase() {
        return this.formatter(true)
      },
      pascalCase() {
        return this.formatter(false)
      },
      formatter(isCamel) {
        const words = selectedCharacterEventWish.split('-')
        for (let i = 0; i < words.length; i++) {
          if(isCamel && !i) continue
          const word = words[i]
          words[i] = word[0].toUpperCase() + word.slice(1)
        }
        return words.join('')
      },
      kebabCase() {
        return selectedCharacterEventWish
      }
    }
    return options[format]()
  }
  syncWishCountersWithState() {
    this.setState({
      userWishes: {
        'wanderlust-invocation': this.wanderlustInvocation.getState().attemptsCount,
        'lg7': this.lg7.getState().attemptsCount,
        'reign-of-serenity': this.reignOfSerenity.getState().attemptsCount,
      }
    })
  }
  reset(previouslySelectedWish) {
    this.wanderlustInvocation.reset()
    this.lg7.reset()
    this.reignOfSerenity.reset()
    this.setState({
      selectedWish: previouslySelectedWish,
      inventory: {}
    }, this.saveData)
  }
  saveData() {
    const {
      inventory,
      selectedCharacterEventWish
    } = this.state
    const data = {
      version: 1,
      inventory,
      selectedCharacterEventWish,
      wanderlustInvocation: this.wanderlustInvocation.getState(),
      lg7: this.lg7.getState(),
      reignOfSerenity: this.reignOfSerenity.getState(),
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
      this.wanderlustInvocation.attemptsCount = data.wanderlustInvocationCount || 0
      this.lg7.attemptsCount = data.lg7 || 0
      this.reignOfSerenity.attemptsCount = data.reignOfSerenity || 0
      this.setState({
        inventory
      }, this.backToHome)
    } else {
      // Load version 1 with softPity4 and softPity5
      const {
        inventory,
        selectedCharacterEventWish
      } = data
      this.wanderlustInvocation.setState(data.wanderlustInvocation);
      this.lg7.setState(data.lg7);
      this.reignOfSerenity.setState(data.reignOfSerenity)
      this.setState({
        inventory,
        selectedCharacterEventWish
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
          wasDisclaimerSeen,
          selectedDetail,
          currentWishes,
          selectedCharacterEventWish,
          userWishes
        } = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              selectedBanner={currentDetails}
              getFormattedCharacterEventWish={this.getFormattedCharacterEventWish.bind(this)}
              updateCharacterEventWish={this.updateCharacterEventWish.bind(this)}
              wasDisclaimerSeen={wasDisclaimerSeen}
              wish={this.wish.bind(this)}
              hideModal={this.hideModal.bind(this)}
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

