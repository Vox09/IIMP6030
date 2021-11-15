import BaseGacha from './base-gacha'
import drops from '../data/lg7.json'

export default class LG7 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
