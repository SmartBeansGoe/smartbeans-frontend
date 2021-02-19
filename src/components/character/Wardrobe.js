import React, { Component } from 'react';
import Bean from './avatar/Bean';
import PropTypes from 'prop-types';
import { mdiTshirtCrew, mdiHatFedora } from '@mdi/js';
import { Icon } from '@mdi/react';
import pants from '../../images/pants.svg';
import assets from './sources/assets.json';

import { SHIRTS, PANTS, HATS, LIGHTBLUE } from '../../js/constants';
import lang from '../../lang/de_DE.json';

export default class Wardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight, // The height is needed for the scroll panel of the assets.
      body_color: this.props.body_color,
      shirt_id: this.props.shirt_id,
      pants_id: this.props.pants_id,
      hat_id: this.props.hat_id,
      category: SHIRTS,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // The height must be updated if the window size changes, therefore the Event Listener.
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  setBodyColor(color) {
    this.setState({
      body_color: color,
    });
  }

  isBodyChanged() {
    return (
      this.props.body_color !== this.state.body_color ||
      this.props.shirt_id !== this.state.shirt_id ||
      this.props.pants_id !== this.state.pants_id ||
      this.props.hat_id !== this.state.hat_id
    );
  }

  setAsset(asset_id) {
    switch (this.state.category) {
      case SHIRTS:
        this.setState({
          shirt_id: asset_id === this.state.shirt_id ? '' : asset_id,
        });
        break;
      case PANTS:
        this.setState({
          pants_id: asset_id === this.state.pants_id ? '' : asset_id,
        });
        break;
      case HATS:
        this.setState({
          hat_id: asset_id === this.state.hat_id ? '' : asset_id,
        });
        break;
    }
  }

  tab(cloth) {
    ['tab-' + HATS, 'tab-' + SHIRTS, 'tab-' + PANTS].forEach((tab) =>
      document.getElementById(tab).classList.remove('is-active')
    );
    document.getElementById('tab-' + cloth).classList.add('is-active');
    this.setState({ category: cloth });
  }

  render() {
    return (
      <div className="tile">
        <div className="tile is-parent is-4">
          <div className="tile is-child box">
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
        </div>
        <div className="tile is-parent is-vertical">
          <div className="tile is-child box">
            <div className="tabs">
              <ul>
                <li id={'tab-' + HATS}>
                  <a onClick={() => this.tab(HATS)}>
                    <span className="icon is-small">
                      <Icon path={mdiHatFedora} size={1} />
                    </span>
                    <span>{lang['wardrobe.head-accessory']}</span>
                  </a>
                </li>
                <li id={'tab-' + SHIRTS} className="is-active">
                  <a onClick={() => this.tab(SHIRTS)}>
                    <span className="icon is-small">
                      <Icon path={mdiTshirtCrew} size={1} />
                    </span>
                    <span>
                      {lang['wardrobe.shirts']} & {lang['wardrobe.dresses']}
                    </span>
                  </a>
                </li>
                <li id={'tab-' + PANTS}>
                  <a onClick={() => this.tab(PANTS)}>
                    <span className="icon is-small">
                      <img src={pants} alt="" />
                    </span>
                    <span>
                      {lang['wardrobe.pants']} & {lang['wardrobe.skirts']}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div
                className="flex-container scroll"
                style={{
                  height: this.state.height * 0.5,
                }}
              >
                {this.props.assets[this.state.category].map((asset) => {
                  var asset_id_type =
                    this.state.category === SHIRTS
                      ? this.state.shirt_id
                      : this.state.category === PANTS
                      ? this.state.pants_id
                      : this.state.hat_id;
                  return (
                    <div
                      key={asset.asset_id}
                      onClick={() => this.setAsset(asset.asset_id)}
                    >
                      <div
                        className="box"
                        style={{
                          width: 'auto',
                          cursor: 'pointer',
                          backgroundColor:
                            asset_id_type === asset.asset_id
                              ? LIGHTBLUE
                              : 'white',
                        }}
                      >
                        <svg
                          viewBox="0 0 77.707 108.77"
                          height={this.state.height / 6}
                          width={((this.state.height / 6) * 78) / 108}
                          dangerouslySetInnerHTML={{
                            __html: assets[this.state.category][asset.asset_id],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="tile is-parent">
              <div
                style={{
                  flexGrow: 1,
                }}
              >
                <input
                  className="button"
                  type="color"
                  name="body-color"
                  id="body-color"
                  title="Farbe"
                  value={this.state.body_color}
                  onChange={(event) => this.setBodyColor(event.target.value)}
                  style={{
                    backgroundColor: this.state.body_color,
                    padding: 0,
                    width: 40,
                    height: 40,
                  }}
                />
              </div>
              <div>
                <button
                  className="button is-success"
                  disabled={!this.isBodyChanged()}
                  onClick={() =>
                    this.props.onSaveCharacterProperties(
                      this.state.body_color,
                      this.state.shirt_id,
                      this.state.pants_id,
                      this.state.hat_id
                    )
                  }
                >
                  {lang['wardrobe.save']}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Wardrobe.propTypes = {
  body_color: PropTypes.string.isRequired,
  assets: PropTypes.object.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  face_id: PropTypes.string.isRequired,
  pants_id: PropTypes.string.isRequired,
  shirt_id: PropTypes.string.isRequired,
  hat_id: PropTypes.string.isRequired,
};