import Asset from './Asset'

export default class Shirt extends Asset {
  constructor(props) {
    super("hats", props.id)
  }
}
