import BaseGacha from './base-gacha'
import drops from '../data/k3.json'

export default class K3 extends BaseGacha {
  constructor() {
    super(drops)
  }
}