import BaseGacha from './base-gacha'
import drops from '../data/k2.json'

export default class K2 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
