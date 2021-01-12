import React, { Component } from 'react'
import Scroll from 'react-scroll';
import Bean from './Bean'
import PropTypes from 'prop-types'
import { mdiTshirtCrew, mdiHatFedora } from '@mdi/js';
import { Icon } from '@mdi/react'
import pants from '../../images/pants.svg'
import assets from './sources/assets.json'
import './CharacterBuildingPage.css'

import { SHIRTS, PANTS, HATS } from '../../js/constants'
import axios_inst from '../../js/backend';

export default class CharacterBuildingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body_color: this.props.body_color,
      shirt_id: this.props.shirt_id,
      pants_id: this.props.pants_id,
      hat_id: this.props.hat_id,
      category: SHIRTS,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    // This axios call is needed if the character page is reloaded.
    // Because then the App component is not mounted and the state is not initialized.
    // Therefore the character information has to be reloaded from the backend.
    axios_inst.get("/character")
    .then(response => {
      var data = response.data;
      this.setState({
        body_color: data.body_color === null ? this.props.body_color : data.body_color,
        shirt_id: data.shirt_id === null ? this.props.shirt_id : data.shirt_id,
        pants_id: data.pants_id === null ? this.props.pants_id : data.pants_id,
        hat_id: data.hat_id  === null ? this.props.pants_id : data.hat_id});
    });
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  setBodyColor(color) {
    this.setState({
      body_color: color,
    })
  }

  setAsset(asset_id) {
    switch (this.state.category) {
      case SHIRTS: this.setState({shirt_id: asset_id}); break;
      case PANTS: this.setState({pants_id: asset_id}); break;
      case HATS: this.setState({hat_id: asset_id}); break;
    };
  }

  tab(cloth) {
    ["tab_" + HATS, "tab_" + SHIRTS, "tab_" + PANTS].forEach(tab => document.getElementById(tab).classList.remove("is-active"));
    document.getElementById("tab_" + cloth).classList.add("is-active");
    this.setState({category: cloth});
  }

  render() {
    return (
      <React.Fragment>
      <div className="tile is-parent is-horizontal">
      <div className="tile is-child box is-4">
        <Bean 
          width="auto"
          height="auto"
          body_color={this.state.body_color}
          face_id={this.props.face_id}
          pants_id={this.state.pants_id}
          shirt_id={this.state.shirt_id}
          hat_id={this.state.hat_id}
          />
      </div>
      <div className="tile is-child box is-vertical">
        <div>
          <span>
            <label className="label" htmlFor="body">BodyColor</label>
            <input className="button" type="color" id="body" name="body" value={this.state.body_color} onChange={(event) => this.setBodyColor(event.target.value)}/>
          </span>
          <span>
            <button className="button is-success" onClick={() => 
              this.props.onSaveCharacterProperties(
                this.state.body_color,
                this.state.shirt_id,
                this.state.pants_id,
                this.state.hat_id)
            
          }>Save Configurations</button>
          </span>
        </div>
        <div className="tabs">
          <ul>
            <li id={"tab_" + HATS}>
              <a onClick={() => this.tab(HATS)}>
                <span className="icon is-small">
                <Icon path={mdiHatFedora} />
                </span>
                <span>Hats</span>
              </a>
            </li>
            <li id={"tab_" + SHIRTS} className="is-active">
              <a onClick={() => this.tab(SHIRTS)}>
                <span className="icon is-small">
                <Icon path={mdiTshirtCrew} />
                </span>
                <span>Shirts</span>
              </a>
            </li>
            <li id={"tab_" + PANTS}>
              <a onClick={() => this.tab(PANTS)}>
                <span className="icon is-small">
                  <img src={pants} alt=""/>
                </span>
                <span>Pants</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="table" role="listbox">
            <Scroll.Element className="element" style={{
              position: 'relative',
              height: document.documentElement.clientHeight *0.7,
              overflow: 'scroll',
              marginBottom: '100px'
            }}>

            <ul className="row">
            {this.props.clothes[this.state.category].map(asset => {
              var asset_id_type = (this.state.category === SHIRTS ? this.state.shirt_id :
                                  (this.state.category === PANTS ? this.state.pants_id : this.state.hat_id));
              return (
                <li key={asset} onClick={() => this.setAsset(asset)}>
                  <div className={"box" + (asset_id_type === asset ?" my-active" : "")}>
                  <svg viewBox="0 0 77.707 108.77" height="auto" width="auto" dangerouslySetInnerHTML={{__html: assets[this.state.category][asset]} }/>
                  </div>
                </li>
              );
            })}
            </ul>
            </Scroll.Element>
          </div>
        </div>
      </div>
      </div>
      </React.Fragment>
    )
  }
}


CharacterBuildingPage.propTypes = {
  body_color: PropTypes.string.isRequired,
  clothes: PropTypes.object.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  face_id: PropTypes.string.isRequired,
  pants_id: PropTypes.string.isRequired,
  shirt_id: PropTypes.string.isRequired,
  hat_id: PropTypes.string.isRequired,
}

