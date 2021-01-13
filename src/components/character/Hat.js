import Asset from './Asset'
import { HATS } from '../../js/constants.js'

export default class Shirt extends Asset {
  constructor(props) {
    super(HATS, props.id)
  }
}
