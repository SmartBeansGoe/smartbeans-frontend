import React, { Component } from 'react';
import axios_inst from './js/backend';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage';
import Bean from './components/character/Bean';
import ExercisePage from './components/exercises/ExercisePage';
import CharacterBuildingPage from './components/character/CharacterBuildingPage';
import { NotificationContext } from './components/notification/NotificationProvider';

import './App.css';

import { SHIRTS, PANTS, HATS, FACES } from './js/constants';
import ProfilePage from './components/profile/ProfilePage';

export default class App extends Component {
  static contextType = NotificationContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      charname: '',
      exercises: {
        categories: [
          {
            title: '',
            subtitle: '',
            exerciseList: [],
          },
        ],
      },
      character: {
        body_color: '#E7C27A',
        shirt_id: '',
        face_id: 'face001',
        pants_id: '',
        hat_id: '',
      },
      assets: {
        shirts: [],
        pants: [],
        faces: [],
        hats: [],
      },
      achievements: [],
      intervalID: null,
    };
    this.onAssetChange = this.onAssetChange.bind(this);
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
    this.loadCharacter();
    this.loadCharname();
    this.loadAchievements();
    this.loadAssets();
    this.loadExercises();
    this.getNotifications();
  }

  componentDidUpdate() {
    //console.log("App did update.")
    //this.checkLogin();
  }

  checkLogin() {
    axios_inst
      .get('/username')
      .then((response) => {})
      .catch((error) => {
        var error_message;
        if (error.response === undefined) {
          error_message = 'Keine Antwort vom Server erhalten.';
        } else {
          error_message = 'Du bist nicht eingeloggt.';
        }

        document.getElementById('body').innerHTML =
          '<div class="notification is-danger is-light has-text-centered">' +
          error_message +
          '</div>';
      });
  }

  loadUser() {
    axios_inst.get('/username').then((response) =>
      this.setState({
        username: response.data.username,
      })
    );
  }

  loadCharname() {
    axios_inst.get('/charname').then((response) => {
      this.setState({
        charname: response.data.charname,
      });
    });
  }

  loadCharacter() {
    axios_inst.get('/character').then((response) => {
      var data = response.data;
      this.setCharacter(
        data.body_color === null ? '#E7C27A' : data.body_color,
        data.shirt_id === null ? '' : data.shirt_id,
        this.state.character.face_id,
        data.pants_id === null ? '' : data.pants_id,
        data.hat_id === null ? '' : data.hat_id
      );
    });
  }

  setCharacter = (body_color, shirt_id, face_id, pants_id, hat_id) => {
    this.setState({
      character: {
        body_color: body_color,
        shirt_id: shirt_id,
        face_id: face_id,
        pants_id: pants_id,
        hat_id: hat_id,
      },
    });
  };

  onSaveCharacterProperties = (body_color, shirt_id, pants_id, hat_id) => {
    axios_inst
      .post('/character', {
        body_color: body_color,
        shirt_id: shirt_id,
        face_id: this.state.character.face_id,
        pants_id: pants_id,
        hat_id: hat_id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setCharacter(
      body_color,
      shirt_id,
      this.state.character.face_id,
      pants_id,
      hat_id
    );
  };

  onAssetChange = (asset_category, asset_id) => {
    switch (asset_category) {
      case SHIRTS:
        this.setCharacterShirt(asset_id);
        break;
      case PANTS:
        this.setCharacterPants(asset_id);
        break;
      case HATS:
        this.setCharacterHat(asset_id);
        break;
      case FACES:
        this.setCharacterFace(asset_id);
        break;
      default:
        Error('Could not find asset category');
        break;
    }
  };

  loadAssets() {
    axios_inst.get('/assets').then((response) => {
      this.setState({
        assets: response.data,
      });
    });
  }

  loadExercises() {
    axios_inst.get('/tasks').then((res) => {
      var bronze = res.data.filter(function (el) {
        return el.shortname[0] === 'X';
      });
      var silver = res.data.filter(function (el) {
        return el.shortname[0] === 'E';
      });
      var gold = res.data.filter(function (el) {
        return el.shortname[0] === 'S';
      });
      var platin = res.data.filter(function (el) {
        return el.shortname[0] === 'Z';
      });
      var diamond = res.data.filter(function (el) {
        return el.shortname[0] === 'K';
      });
      this.setState({
        exercises: {
          categories: [
            {
              title: 'Bronze',
              subtitle: 'Basis Aufgaben',
              exerciseList: bronze,
            },
            {
              title: 'Silver',
              subtitle: 'Einsteiger Aufgaben',
              exerciseList: silver,
            },
            {
              title: 'Gold',
              subtitle: 'Fortgeschrittenen Aufgaben',
              exerciseList: gold,
            },
            {
              title: 'Platin',
              subtitle: 'Klausurniveau Aufgaben',
              exerciseList: platin,
            },
            {
              title: 'Diamond',
              subtitle: 'Overkill Aufgaben',
              exerciseList: diamond,
            },
          ],
        },
      });
    });
  }

  loadAchievements() {
    axios_inst.get('/achievements').then((res) => {
      this.setState({
        achievements: res.data,
      });
    });
  }

  getNotifications() {
    const id = setInterval(() => {
      axios_inst.get('/system_messages').then((res) => {
        if (res.data.length !== 0) {
          res.data.forEach((message, index) => {
            this.context({
              type: 'ADD_NOTIFICATION',
              payload: {
                id: message.id,
                message:
                  message.type === 'achievement_unlocked'
                    ? message.content.description
                    : message.content,
                title:
                  message.type === 'achievement_unlocked'
                    ? message.content.name
                    : 'Du hast einen neue Nachricht!',
              },
            });
          });
        }
      });
    }, 6000);
    this.setState({
      intervalID: id,
    });
  }

  stopNotifications = () => {
    clearInterval(this.state.intervalID);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar username={this.state.username} />
          <div id="body" className="tile is-ancestor">
            <Switch>
              <Route
                exact
                path="/character"
                render={() => (
                  <CharacterBuildingPage
                    body_color={this.state.character.body_color}
                    face_id={this.state.character.face_id}
                    pants_id={this.state.character.pants_id}
                    shirt_id={this.state.character.shirt_id}
                    hat_id={this.state.character.hat_id}
                    assets={this.state.assets}
                    onSaveCharacterProperties={this.onSaveCharacterProperties}
                  />
                )}
              />
              <React.Fragment>
                <React.Fragment>
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <ProfilePage
                        charname={this.state.charname}
                        achievements={this.state.achievements}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/leaderboard"
                    component={LeaderboardPage}
                  />
                  <Route
                    exact
                    path="/exercises/:taskid"
                    component={() => (
                      <ExercisePage
                        categories={this.state.exercises.categories}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/exercises"
                    render={() => (
                      <div className="tile is-parent is-vertical">
                        <ExerciseOverviewPage
                          categories={this.state.exercises.categories}
                        />
                      </div>
                    )}
                  />
                </React.Fragment>
                <div
                  className="tile is-vertical is-2 is-hidden-touch is-parent"
                  style={{ marginLeft: 0, paddingLeft: 0 }}
                >
                  <div className="tile is-child box" style={{ flex: 0 }}>
                    <p className="title has-text-centered has-background-success-light">
                      {this.state.charname}
                    </p>
                    <Bean
                      width="auto"
                      height="auto"
                      body_color={this.state.character.body_color}
                      face_id={this.state.character.face_id}
                      pants_id={this.state.character.pants_id}
                      hat_id={this.state.character.hat_id}
                      shirt_id={this.state.character.shirt_id}
                    />
                  </div>
                  <button onClick={this.stopNotifications}>
                    Stop Notifications
                  </button>
                </div>
              </React.Fragment>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
