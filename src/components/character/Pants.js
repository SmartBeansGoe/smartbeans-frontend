import Asset from './Asset';
import { PANTS } from '../../js/constants.js';

export default class Pants extends Asset {
  constructor(props) {
    super(PANTS, props.id);
  }
}
