import React, { Component } from 'react';
import Bean from './avatar/Bean';
import PropTypes from 'prop-types';
import { mdiTshirtCrew, mdiHatFedora, mdiInformation } from '@mdi/js';
import { Icon } from '@mdi/react';
import pants from '../../images/pants.svg';
import Asset from './avatar/Asset';
import assets from '../../data/assets.json';
import { SHIRTS, PANTS, HATS, LIGHTBLUE, BLUE } from '../../js/constants';
import lang from '../../lang/de_DE.json';
import { getAttributesOf } from './avatar/Asset';

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
          shirt_id: asset_id === this.state.shirt_id ? null : asset_id,
        });
        break;
      case PANTS:
        this.setState({
          pants_id: asset_id === this.state.pants_id ? null : asset_id,
        });
        break;
      case HATS:
        this.setState({
          hat_id: asset_id === this.state.hat_id ? null : asset_id,
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
    let isNoPants = getAttributesOf(this.state.shirt_id).includes('no-pants');
    let assets_by_category = this.props.assets.filter((el) => {
      let asset = assets.find((x) => el === x.id);
      if (asset !== undefined) {
        return asset.category === this.state.category;
      } else {
        return false;
      }
    });
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
                {assets_by_category.map((asset) => {
                  var active_asset =
                    this.state.category === SHIRTS
                      ? this.state.shirt_id
                      : this.state.category === PANTS
                      ? this.state.pants_id
                      : this.state.hat_id;
                  return (
                    <div
                      key={asset}
                      onClick={() =>
                        this.state.category === PANTS && isNoPants
                          ? null
                          : this.setAsset(asset)
                      }
                    >
                      <div
                        className="box"
                        style={{
                          width: 'auto',
                          cursor:
                            this.state.category === PANTS && isNoPants
                              ? 'not-allowed'
                              : 'pointer',
                          backgroundColor:
                            active_asset === asset ? LIGHTBLUE : 'white',
                        }}
                      >
                        <svg
                          viewBox="0 0 77.707 108.77"
                          height={this.state.height / 6}
                          width={((this.state.height / 6) * 78) / 108}
                        >
                          <Asset id={asset} />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="tile is-parent">
              <div class="field has-addons">
                <div class="control">
                  <label
                    class="button is-rounded"
                    for="body-color"
                    style={{
                      backgroundColor: this.state.body_color,
                    }}
                  ></label>
                </div>
                <div class="control">
                  <label class="button" for="body-color">
                    {lang['wardrobe.skin-color']}
                  </label>
                </div>
              </div>
              <input
                className="input is-rounded"
                type="color"
                name="body-color"
                id="body-color"
                title={lang['wardrobe.skin-color']}
                value={this.state.body_color}
                onChange={(event) => this.setBodyColor(event.target.value)}
                style={{
                  backgroundColor: this.state.body_color,
                  opacity: 0,
                  visibility: 'hidden',
                }}
              />

              <div
                style={{
                  flexGrow: 0.8,
                }}
              >
                {this.state.category === PANTS && isNoPants ? (
                  <React.Fragment>
                    <span
                      style={{
                        paddingRight: 10,
                      }}
                    >
                      <Icon
                        path={mdiInformation}
                        size={1.0}
                        style={{
                          position: 'relative',
                          top: '5px',
                          left: '5px',
                          color: BLUE,
                        }}
                      />
                    </span>
                    <span style={{ color: BLUE }}>
                      {lang['wardrobe.information.no-pants']}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
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
  assets: PropTypes.array.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  face_id: PropTypes.string.isRequired,
  pants_id: PropTypes.string,
  shirt_id: PropTypes.string,
  hat_id: PropTypes.string,
};
