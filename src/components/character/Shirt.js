import Asset from './Asset';
import { SHIRTS } from '../../js/constants.js';

export default class Shirt extends Asset {
  constructor(props) {
    super(SHIRTS, props.id);
  }
}
