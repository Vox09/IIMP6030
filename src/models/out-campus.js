import BaseGacha from './base-gacha'
import drops from '../data/out-campus.json'

export default class OutCampus extends BaseGacha {
  constructor() {
    super(drops)
  }
}