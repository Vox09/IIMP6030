export default class BaseGacha {
  constructor(drops) {
    this.drops = drops
    this.hardPity4Limit = 5
    this.hardPity5Limit = 20
    this.softPity5Start = 15
    this.attemptsCount = 0
    this.pityCounter4 = 0
    this.pityCounter5 = 0
    this.softPity = false
    this.guaranteedFeatured4Star = false
    this.guaranteedFeatured5Star = false
    this.standardRange = this.generateProbabilityRange(400, 300, 300)   // sum to 1000
    this.softPityRange = this.generateProbabilityRange(300, 450, 250)   // sum to 1000
    this.probabilityRange = this.standardRange
  }
  set attempts(amount) {
    this.attemptsCount += amount
    this.pityCounter4 += amount
    this.pityCounter5 += amount
    if (!this.softPity && this.pityCounter5 >= this.softPity5Start) {
      this.probabilityRange = this.softPityRange
    }
    this.softPity = (this.pityCounter5 >= this.softPity5Start);
  }
  getState() {
    return {
      attemptsCount: this.attemptsCount,
      pityCounter4: this.pityCounter4,
      pityCounter5: this.pityCounter5
    }
  }
  setState(state) {
    this.attemptsCount = state.attemptsCount;
    this.pityCounter4 = state.pityCounter4;
    this.pityCounter5 = state.pityCounter5;
  }
  getDrops(rating) {
    if (!rating) {
      return this.drops
    } else {
      return this.drops.filter(drop => drop.rating === rating)
    }
  }
  getRandomRating() {
    return this.probabilityRange[this.generateRandomNumber(this.probabilityRange.length)]
  }
  flipACoin() {
    return !!(Math.round(Math.random()))
  }
  generateRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }
  // Takes three arguments for each star rating goes 3 4 5
  generateProbabilityRange(...args) {
    const range = []
    args.forEach((star, i) => range.push(...this.generateProbabilityCount(star, i + 3)))
    this.shuffle(range)
    return range
  }
  generateProbabilityCount(amount, rating) {
    const result = []
    while (amount) {
      result.push(rating)
      amount--
    }
    return result
  }
  getRandom3StarItem() {
    const threeStarItems = this.getDrops(3)
    return threeStarItems[this.generateRandomNumber(threeStarItems.length)]
  }
  getRandom4StarItem() {
    return this.getItem(4)
  }
  getItem(rating) {
    const items = this.getDrops(rating)
    return items[this.generateRandomNumber(items.length)]
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    this.pityCounter4 = 0
    const itemRating = this.standardRange[this.generateRandomNumber(this.standardRange.length)]
    if (itemRating === 5) {
      return this.getGuaranteed5StarItem()
    }
    return this.getRandom4StarItem()
  }
  getGuaranteed5StarItem() {
    this.reset5StarProbability()
    const isFeatured5Star = this.flipACoin()
    if (this.guaranteedFeatured5Star || isFeatured5Star) {
      this.guaranteedFeatured5Star = false
      // return this.getItem(5,true)
      return this.getItem(5,undefined)
    }
    this.guaranteedFeatured5Star = true
    return this.getItem(5,undefined)
  }

  beforeRollOnce() {
  }
  rollOnce() {
    this.beforeRollOnce()
    let rating;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    const guaranteed5Star = !(this.pityCounter5 % this.hardPity5Limit)
    if (guaranteed5Star) {
      return this.getGuaranteed5StarItem()
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
      return this.getGuaranteed4StarItemOrHigher()
    }
    rating = this.getRandomRating()
    if (rating === 3) {
      return this.getRandom3StarItem()
    } else if (rating === 4) {
      this.pityCounter4 = 0
      return this.getRandom4StarItem()
    }
    return this.getGuaranteed5StarItem()
  }
  shuffle(array) {
    for(let i = 0; i < array.length; i++) {
      let randomNumber = this.generateRandomNumber(array.length)
      let placeHolder = array[i]
      array[i] = array[randomNumber]
      array[randomNumber] = placeHolder
    }
  }
  reset(){
    this.reset5StarProbability()
    this.attemptsCount = 0
    this.pityCounter4 = 0
    this.guaranteedFeatured4Star = false
    this.guaranteedFeatured5Star = false
  }
  reset5StarProbability() {
    this.pityCounter5 = 0
    this.softPity = false
    this.probabilityRange = this.standardRange
  }
}
