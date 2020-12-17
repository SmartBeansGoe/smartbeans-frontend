import Asset from './Asset'

export default class Shirt extends Asset {
  constructor(props) {
    super("shirts", props.id)
  }
}
