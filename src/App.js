import React, { Component } from 'react';
import axios_inst from './js/backend';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage';
import ExercisePage from './components/exercises/ExercisePage';
import { NotificationContext } from './components/notification/NotificationProvider';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { handleError } from './errors/Error';
import Error404 from './components/errors/Error404';
import NavBarNotLoggedIn from './components/navigation/NavBarNotLoggedIn';
import FirstLoginModal from './components/login/FirstLoginModal';
import lang from './lang/de_DE.json';
import About from './components/about/About';
import assetIDs from './components/character/sources/assetIDs.json';

import axiosRetry from 'axios-retry';

axiosRetry(axios_inst, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

export default class App extends Component {
  static contextType = NotificationContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      charname: '',
      exercises: [],
      submissions: [],
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
      logged_in: false,
      firstLogin: false,
      hasError: false,
    };
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
    this.loadExercises = this.loadExercises.bind(this);
    this.loadSubmissions = this.loadSubmissions.bind(this);
    this.loadLevelData = this.loadLevelData.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    axios_inst
      .get('/username')
      .then((res) => {
        this.setState({
          logged_in: true,
        });
        this.checkFirstLogin();
        this.loadUser();
        this.loadCharacter();
        this.loadCharname();
        this.loadLevelData();
        this.loadAchievements();
        this.loadAssets();
        this.loadExercises();
        this.loadSubmissions();
        this.getNotifications();
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  checkFirstLogin() {
    axios_inst
      .get('/user/data')
      .then((response) =>
        this.setState({
          firstLogin: response.data.first_login,
        })
      )
      .catch((error) => {
        this.handleError(error);
      });
  }

  setNoFirstLogin() {
    axios_inst.post('/user/first_login_done').catch((error) => {
      this.handleError(error);
    });
  }

  handleError(error) {
    this.setState({
      hasError: true,
    });
    handleError(error);
  }

  loadUser() {
    axios_inst
      .get('/username')
      .then((response) =>
        this.setState({
          username: response.data.username,
        })
      )
      .catch((error) => {
        this.handleError(error);
      });
  }

  loadCharname() {
    axios_inst
      .get('/charname')
      .then((response) => {
        this.setState({
          charname: response.data.charname,
        });
      })
      .catch((error) => {
        this.handleError(error);
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
        this.handleError(error);
      });
    this.setState({
      charname: charname,
    });
  };

  loadCharacter() {
    axios_inst
      .get('/character')
      .then((response) => {
        var data = response.data;
        this.setCharacter(
          data.body_color === null ? '#E7C27A' : data.body_color,
          data.shirt_id === null ? '' : data.shirt_id,
          this.state.character.face_id,
          data.pants_id === null ? '' : data.pants_id,
          data.hat_id === null ? '' : data.hat_id
        );
      })
      .catch((error) => {
        this.handleError(error);
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
      .catch((error) => {
        this.handleError(error);
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
    axios_inst
      .get('/assets')
      .then((response) => {
        this.setState({
          assets: response.data,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  loadExercises() {
    axios_inst
      .get('/tasks')
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  loadSubmissions() {
    axios_inst
      .get('/submissions/all')
      .then((res) => {
        this.setState({
          submissions: res.data,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  loadLevelData() {
    axios_inst
      .get('/level_data')
      .then((res) => {
        this.setState({
          level_data: res.data,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  loadAchievements() {
    axios_inst
      .get('/achievements')
      .then((res) => {
        this.setState({
          achievements: res.data,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  getNotifications() {
    const id = setInterval(() => {
      axios_inst
        .get('/system_messages', { requests: 6 })
        .then((res) => {
          if (res.data.length !== 0) {
            res.data.forEach((message) => {
              if (message.type === 'achievement_unlocked') {
                this.context({
                  type: 'ADD_NOTIFICATION',
                  payload: {
                    id: message.id,
                    type: message.type,
                    title: lang['app.notifications.achievement.title'],
                    message: message.content.description,
                    achievementId: message.content.id,
                    name: message.content.name,
                  },
                });
                this.loadAchievements();
                this.loadAssets();
                this.sendAssetNotificationForAchievement(message.content.id);
              } else if (message.type === 'text') {
                this.context({
                  type: 'ADD_NOTIFICATION',
                  payload: {
                    id: message.id,
                    type: message.type,
                    title: lang['app.notifications.text.title'],
                    message: message.content,
                  },
                });
              }
            });
          }
        })
        .catch((error) => {
          this.stopNotifications();
          this.handleError(error);
          console.log('error notifications: ', error);
        });
    }, 5000);
    this.setState({
      intervalID: id,
    });
  }

  sendAssetNotificationForAchievement(achievementId) {
    // Version für später
    let result = assetIDs.filter(
      (asset) => asset.precondition.achievementId === achievementId
    );
    // Version für jetzt
    // let result = assetIDs.filter(
    //   (asset) => asset.precondition === achievementId
    // );
    if (result.length !== 0) {
      this.context({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: new Date().toLocaleString(),
          type: 'assets_unlocked',
          title: lang['app.notifications.asset.title'],
          message: lang['app.notifications.asset.message'],
          assetsIds: result,
        },
      });
    }
  }

  stopNotifications = () => {
    clearInterval(this.state.intervalID);
  };

  renderWhenLoggedIn(node) {
    if (this.state.logged_in) {
      return node;
    } else {
      return <></>;
    }
  }

  render() {
    let navigation;
    if (this.state.logged_in && !this.state.hasError) {
      navigation = <NavBar username={this.state.username} />;
    } else {
      navigation = <NavBarNotLoggedIn />;
    }

    let firstLoginModal;
    if (this.state.firstLogin)
      firstLoginModal = this.renderWhenLoggedIn(
        <FirstLoginModal setNoFirstLogin={this.setNoFirstLogin} />
      );
    else firstLoginModal = <></>;

    return (
      <Router>
        <div className="App">
          {navigation}
          <div
            id="body"
            className="tile is-ancestor"
            style={{
              margin: 0,
            }}
          >
            <Switch>
              <Route
                exact
                path="/"
                component={() => {
                  return this.renderWhenLoggedIn(
                    <Dashboard
                      charname={this.state.charname}
                      character={this.state.character}
                      assets={this.state.assets}
                      achievements={this.state.achievements}
                      level_data={this.state.level_data}
                      exercises={this.state.exercises}
                      onSaveCharacterProperties={this.onSaveCharacterProperties}
                      onSaveCharname={this.onSaveCharname}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/leaderboard"
                render={() => {
                  return this.renderWhenLoggedIn(
                    <React.Fragment>
                      <LeaderboardPage
                        charname={this.state.charname}
                        character={this.state.character}
                      />
                    </React.Fragment>
                  );
                }}
              />
              <Route
                exact
                path="/exercises/:taskid"
                render={() => {
                  return this.renderWhenLoggedIn(
                    <React.Fragment>
                      <ExercisePage
                        loadExercises={this.loadExercises}
                        loadSubmissions={this.loadSubmissions}
                        loadLevelData={this.loadLevelData}
                        exercises={this.state.exercises}
                        submissions={this.state.submissions}
                        charname={this.state.charname}
                        character={this.state.character}
                        handleError={this.handleError}
                      />
                    </React.Fragment>
                  );
                }}
              />
              <Route
                exact
                path="/exercises"
                render={() => {
                  return this.renderWhenLoggedIn(
                    <React.Fragment>
                      <ExerciseOverviewPage
                        exercises={this.state.exercises}
                        charname={this.state.charname}
                        character={this.state.character}
                      />
                    </React.Fragment>
                  );
                }}
              />
              <Route
                exact
                path="/about"
                render={() => {
                  return this.renderWhenLoggedIn(<About />);
                }}
              />
              <Route
                render={() => {
                  return <Error404 handleError={this.handleError} />;
                }}
              />
            </Switch>
            {firstLoginModal}
          </div>
        </div>
      </Router>
    );
  }
}
