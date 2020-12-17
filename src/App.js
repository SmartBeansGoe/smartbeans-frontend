import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios_inst from './js/backend'
import NavBar from './components/navigation/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage'
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage'
import Bean from './components/character/Bean'
import ExercisePage from './components/exercises/ExercisePage';
import CharacterBuildingPage from './components/character/CharacterBuildingPage';

import { SHIRTS, PANTS, HATS, FACES } from './js/constants'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        nickname: "Thomas",
      },
      character: {
        body_color: "#E7C27A",
        shirt_id: "shirt001",
        face_id: "face001",
        pants_id: "pants001",
        hats_id: "default",
      },
      clothes: {
        shirts: ["shirt001", "granny_smith_shirt", "default"],
        pants: ["pants001", "default"],
        hats: ["default"],
      }
    };
    this.onBodyColorChange = this.onBodyColorChange.bind(this);
    this.onAssetChange = this.onAssetChange.bind(this);
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  checkLogin() {
    axios_inst.get("/username")
    .then(response => {})
    .catch(error => {
      var error_message;
      if(error.response === undefined) {
        error_message = "Keine Antwort vom Server erhalten.";
      }
      else {
        error_message = "Du bist nicht eingeloggt.";
      }
      
      document.getElementById("body").innerHTML = "<div class=\"notification is-danger is-light has-text-centered\">" + error_message + "</div>";
    });
  }

  loadUser() {
    axios_inst.get("/username").then(response => 
      this.setState({
        user: {
          username: response.data.username,
          nickname: this.state.user.nickname, // TODO: backend
        }
    }));
  }

  componentDidUpdate() {
    console.log(this.state.character);
  }

  onBodyColorChange = color => {
    console.log("SAVE COLOR");
    this.setCharacterBodyColor(color);
  }

  setCharacterBodyColor = (body_color) => {
    this.setCharacter(body_color, this.state.character.shirt_id, this.state.character.face_id, this.state.character.pants_id, this.state.character.hat_id);
  }

  setCharacterShirt = (shirt_id) => {
    this.setCharacter(this.state.character.body_color, shirt_id, this.state.character.face_id, this.state.character.pants_id, this.state.character.hat_id);
  }
  setCharacterFace = (face_id) => {
    this.setCharacter(this.state.character.body_color, this.state.character.shirt_id, face_id, this.state.character.pants_id, this.state.character.hat_id);
  }
  setCharacterPants = (pants_id) => {
    this.setCharacter(this.state.character.body_color, this.state.character.shirt_id, this.state.character.face_id, pants_id, this.state.character.hat_id);
  }
  setCharacterHat = (hat_id) => {
    this.setCharacter(this.state.character.body_color, this.state.character.shirt_id, this.state.character.face_id, this.state.character.pants_id, hat_id);
  }

  setCharacter = (body_color, shirt_id, face_id, pants_id, hats_id) => {
    this.setState({
      character: {
        body_color: body_color,
        shirt_id: shirt_id,
        face_id: face_id,
        pants_id: pants_id,
        hats_id: hats_id
      },
    });
  }

  onSaveCharacterProperties = (body_color, shirt_id, pants_id, hat_id) => {
    this.setCharacter(body_color, shirt_id, this.state.character.face_id, pants_id, hat_id);
  }
  onAssetChange = (asset_category, asset_id) => {
    switch (asset_category) {
      case SHIRTS: this.setCharacterShirt(asset_id); break;
      case PANTS: this.setCharacterPants(asset_id); break;
      case HATS: this.setCharacterHat(asset_id); break;
      case FACES: this.setCharacterFace(asset_id); break;
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar username={ this.state.user.username }/>
          <div id="body" className="tile is-ancestor">
            <Switch>
            <Route
              exact
              path="/character"
              render={() => 
                <CharacterBuildingPage 
                  body_color={this.state.character.body_color}
                  face_id={this.state.character.face_id}
                  pants_id={this.state.character.pants_id}
                  shirt_id={this.state.character.shirt_id}
                  clothes={this.state.clothes}
                  onSaveCharacterProperties={this.onSaveCharacterProperties}
                />
              }
            />
            <React.Fragment>
            <React.Fragment>
                <Route 
                  exact
                  path="/leaderboard"
                  component={LeaderboardPage}
                />
                <Route
                  exact
                  path="/exercises/:taskid"
                  component={ExercisePage}
                />

                <Route 
                  exact
                  path="/exercises"
                  component={ExerciseOverviewPage}
                />
            </React.Fragment>
            <div className="tile is-vertical is-2 is-parent">
              <div className="tile is-child box">
                <p className="title has-text-centered has-background-success-light">
                  { this.state.user.nickname }
                </p>
                <Bean 
                  width="auto"
                  height="auto"                      
                  body_color={this.state.character.body_color}
                  face_id={this.state.character.face_id}
                  pants_id={this.state.character.pants_id}
                  shirt_id={this.state.character.shirt_id}/>
              </div>
            </div>
            </React.Fragment>
          </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
