import Asset from './Asset'
import { FACES } from '../../js/constants.js'

export default class Face extends Asset {
  constructor(props) {
    super(FACES, props.id)
  }
}
