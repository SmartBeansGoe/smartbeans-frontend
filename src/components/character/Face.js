import Asset from './Asset'

export default class Face extends Asset {
  constructor(props) {
    super("faces", props.id)
  }
}
