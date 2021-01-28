import React, { Component } from 'react';
import axios_inst from './js/backend';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage';
import Bean from './components/character/avatar/Bean';
import ExercisePage from './components/exercises/ExercisePage';
import { NotificationContext } from './components/notification/NotificationProvider';

import './App.css';

import Dashboard from './components/dashboard/Dashboard';

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
      level_data: {
        level: 0,
        max_level: 0,
        next_points: 0,
        points: 0,
        skills: [
          {
            name: '',
            max_points: 0,
            points: 0,
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
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
    this.setTaskSolved = this.setTaskSolved.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
    this.loadCharacter();
    this.loadCharname();
    this.loadLevelData();
    this.loadAchievements();
    this.loadAssets();
    this.loadExercises();
    this.getNotifications();
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

  onSaveCharname = (charname) => {
    axios_inst
      .post('/charname', charname, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      charname: charname,
    });
  };

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

  loadLevelData() {
    axios_inst.get('/level_data').then((res) => {
      this.setState({
        level_data: res.data,
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
      axios_inst
        .get('/system_messages')
        .then((res) => {
          if (res.data.length !== 0) {
            res.data.forEach((message) => {
              let messageBody;
              let title;
              let name = '';
              let pictureId = -1;
              if (message.type === 'achievement_unlocked') {
                messageBody = message.content.description;
                title = 'Errungenschaft freigeschaltet!';
                name = message.content.name;
                pictureId = message.content.id;
                pictureId = 4;
                this.setAchievementCompleted(pictureId);
              } else if (message.type === 'text') {
                messageBody = message.content;
                title = 'Du hast einen neue Nachricht!';
              } else {
                title = 'Kleidungsstück freigeschaltet!';
                messageBody = 'Mal schauen was die API sagt';
              }
              this.context({
                type: 'ADD_NOTIFICATION',
                payload: {
                  id: message.id,
                  type: message.type,
                  message: messageBody,
                  title: title,
                  achievementId: pictureId,
                  achievementName: name,
                },
              });
            });
          }
        })
        .catch((error) => {
          console.log('error notifications: ', error);
        });
    }, 5000);
    this.setState({
      intervalID: id,
    });
  }

  stopNotifications = () => {
    clearInterval(this.state.intervalID);
  };

  setTaskSolved = (taskid) => {
    this.loadExercises();
  };

  setAchievementCompleted = (id) => {
    this.loadAchievements();
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
                path="/"
                component={() => (
                  <Dashboard
                    charname={this.state.charname}
                    character={this.state.character}
                    assets={this.state.assets}
                    achievements={this.state.achievements}
                    level_data={this.state.level_data}
                    onSaveCharacterProperties={this.onSaveCharacterProperties}
                    onSaveCharname={this.onSaveCharname}
                  />
                )}
              />
              <React.Fragment>
                <Route exact path="/leaderboard" component={LeaderboardPage} />
                <Route
                  exact
                  path="/exercises/:taskid"
                  component={() => (
                    <ExercisePage
                      categories={this.state.exercises.categories}
                      loadExercises={this.loadExercises}
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
                <div className="tile is-vertical is-2 is-hidden-touch is-parent">
                  <div className="tile is-child box" style={{ flex: 0 }}>
                    <p className="title has-text-centered">
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
