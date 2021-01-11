import React, { Component } from 'react'
import axios_inst from './js/backend'
import NavBar from './components/navigation/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage'
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage'
import Bean from './components/character/Bean'
import ExercisePage from './components/exercises/ExercisePage';
import CharacterBuildingPage from './components/character/CharacterBuildingPage';

import "./App.css"

import { SHIRTS, PANTS, HATS, FACES } from './js/constants'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        nickname: "Thomas",
      },
      exercises: {
        categories: [
          {
            title: "",
            subtitle: "",
            exerciseList: [],
          }
        ]
      },
      character: {
        body_color: "#E7C27A",
        shirt_id: "",
        face_id: "face001",
        pants_id: "",
        hat_id: "",
      },
      clothes: {
        shirts: ["sweater_w_blue",
          "sweater_w_green",
          "sweater_w_mustard",
          "bicycle_shirt",
          "french_shirt_red",
          "french_shirt",
          "granny_smith_shirt",
          "beanybuffer_dress",
          "gardener_shirts",
          "summer_feelings_w_dress",
          "Business_Bean_m_shirt",
          "Business_Bean_m_shirt_2",
          "Summer_feelings_m_shirt",
          "shirt001",
          "ballerina_dress",
          "surferbohne_shirt",
          "bikini_shirt"],
        pants: ["egirl_skirt_rose", "egirl_skirt_blue", "Business_Bean_m_pants", "Business_Bean_m_pants_2", "french_pants_light_blue", "french_pants", "granny_smith_skirt", "bikini_pants", "Summer_feelings_m_pants", "pants001", "gardener_pants", "surferbohne_pants", "ballerina_legs"],
        hats: ["egirl_kitten_band", "french_hat", "beanybuffer_hat", "granny_smith_hair", "summer_feelings_w_hat"],
      }
    };
    this.onAssetChange = this.onAssetChange.bind(this);
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
    this.loadCharacter();
    this.loadExercises();
  }

  componentDidUpdate() {
    // console.log("App did update.")
    // this.checkLogin();
  }

  checkLogin() {
    axios_inst.get("/username")
      .then(response => {
      })
      .catch(error => {
        var error_message;
        if (error.response === undefined) {
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

  loadCharacter() {
    axios_inst.get("/character")
      .then(response => {
        var data = response.data;
        this.setCharacter(
          data.body_color === null ? "#E7C27A" : data.body_color,
          data.shirt_id === null ? "" : data.shirt_id,
          this.state.character.face_id,
          data.pants_id === null ? "" : data.pants_id,
          data.hat_id === null ? "" : data.hat_id);
      });
  }

  setCharacter = (body_color, shirt_id, face_id, pants_id, hat_id) => {
    this.setState({
      character: {
        body_color: body_color,
        shirt_id: shirt_id,
        face_id: face_id,
        pants_id: pants_id,
        hat_id: hat_id
      },
    });
  }

  onSaveCharacterProperties = (body_color, shirt_id, pants_id, hat_id) => {
    axios_inst.post('/character', {
      body_color: body_color,
      shirt_id: shirt_id,
      face_id: this.state.character.face_id,
      pants_id: pants_id,
      hat_id: hat_id,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setCharacter(body_color, shirt_id, this.state.character.face_id, pants_id, hat_id);
  }

  onAssetChange = (asset_category, asset_id) => {
    switch (asset_category) {
      case SHIRTS: this.setCharacterShirt(asset_id); break;
      case PANTS: this.setCharacterPants(asset_id); break;
      case HATS: this.setCharacterHat(asset_id); break;
      case FACES: this.setCharacterFace(asset_id); break;
      default: Error("Could not find asset category"); break;
    }
  }

  loadExercises() {
    axios_inst.get("/tasks").then(res => {
      var bronze = res.data.filter(function (el) {
        return el.shortname[0] === "X";
      });
      var silver = res.data.filter(function (el) {
        return el.shortname[0] === "E";
      });
      var gold = res.data.filter(function (el) {
        return el.shortname[0] === "S";
      });
      var platin = res.data.filter(function (el) {
        return el.shortname[0] === "Z";
      });
      var diamond = res.data.filter(function (el) {
        return el.shortname[0] === "K";
      });
      this.setState({
        exercises: {
          categories: [
            {
              title: "Bronze",
              subtitle: "Basis Aufgaben",
              exerciseList: bronze,
            },
            {
              title: "Silver",
              subtitle: "Einsteiger Aufgaben",
              exerciseList: silver,
            },
            {
              title: "Gold",
              subtitle: "Fortgeschrittenen Aufgaben",
              exerciseList: gold,
            },
            {
              title: "Platin",
              subtitle: "Klausurniveau Aufgaben",
              exerciseList: platin,
            },
            {
              title: "Diamond",
              subtitle: "Overkill Aufgaben",
              exerciseList: diamond,
            },
          ]
        }
      })
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar username={this.state.user.username} />
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
                    hat_id={this.state.character.hat_id}
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
                    render={() => (
                      <div className="tile is-parent is-vertical">
                        <ExerciseOverviewPage categories={this.state.exercises.categories} />
                      </div>
                    )}
                  />
                </React.Fragment>
                <div className="tile is-vertical is-hidden-touch is-2 is-parent" style={{ marginLeft: 0, paddingLeft: 0 }} >
                  <div className="tile is-child box" style={{ flex: 0 }} >
                    <div className="container">
                      <p className="title has-text-centered has-background-success-light">
                        {this.state.user.nickname}
                      </p>
                      <Bean
                        width="auto"
                        height="auto"
                        body_color={this.state.character.body_color}
                        face_id={this.state.character.face_id}
                        pants_id={this.state.character.pants_id}
                        hat_id={this.state.character.hat_id}
                        shirt_id={this.state.character.shirt_id} />
                    </div>
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
