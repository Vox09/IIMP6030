import BaseGacha from './base-gacha'
import drops from '../data/k1.json'

export default class K1 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
