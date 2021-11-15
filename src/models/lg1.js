import BaseGacha from './base-gacha'
import drops from '../data/lg1.json'

export default class LG1 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
