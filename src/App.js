import React, { Component } from 'react';
import axios_inst from './js/backend';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage';
import BeanWrapper from './components/character/BeanWrapper';
import ExercisePage from './components/exercises/ExercisePage';
import { NotificationContext } from './components/notification/NotificationProvider';

import './App.css';

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
      errorResponseCounter: 0,
    };
    this.onSaveCharacterProperties = this.onSaveCharacterProperties.bind(this);
    this.loadExercises = this.loadExercises.bind(this);
    this.putSubmissionsInState = this.putSubmissionsInState.bind(this);
    this.addSubmission = this.addSubmission.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
    this.loadCharacter();
    this.loadCharname();
    this.loadAchievements();
    this.loadAssets();
    this.loadExercises();
    this.loadSubmissions();
    this.getNotifications();
  }

  componentDidUpdate() {
    //console.log("App did update.")
    //this.checkLogin();
  }

  checkLogin() {
    axios_inst
      .get('/username')
      .then((response) => { })
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

  loadSubmissions() {
    axios_inst.get('/submissions/all')
      .then(res => {
        this.putSubmissionsInState(res.data, 0);
      }
      )
  }

  putSubmissionsInState(submissions, tries) {
    if (tries < 20) {
      if (this.state.exercises.length !== 0) {
        this.state.exercises.categories.map(categorie => {
          let kleinListe = categorie.exerciseList.map(exercise => {
            let result = submissions.filter(submission => submission.taskid === exercise.taskid).sort(function (a, b) { return a.timestamp < b.timestamp });
            exercise.submissions = result;
            return exercise;
          })
          return kleinListe;
        })
      } else {
        tries++;
        setTimeout(() => this.putSubmissionsInState(submissions, tries), 50);
      }
    }
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
      axios_inst.get('/system_messages')
        .then((res) => {
          this.setState({
            errorResponseCounter: 0
          })
          if (res.data.length !== 0) {
            res.data.forEach(message => {
              let messageBody;
              let title;
              let name = null;
              // Dirty fix until backend gives right ids
              let pictureId = 4;
              if (message.type === 'achievement_unlocked') {
                messageBody = message.content.description;
                title = 'Errungenschaft freigeschaltet!';
                name = message.content.name;
                pictureId = message.content.id;
                this.loadAchievements();
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
                  type: "",
                  message: messageBody,
                  title: title,
                  pictureId: pictureId,
                  name: name,
                },
              });
            });
          }
        })
        .catch(error => {
          if (this.state.errorResponseCounter > 12) {
            // Umleiten auf error Page
          } else {
            this.setState({
              errorResponseCounter: this.state.errorResponseCounter + 1
            })
          }
          console.log("error notifications: ", error);
        })
    }, 5000);
    this.setState({
      intervalID: id,
    });
  }

  stopNotifications = () => {
    clearInterval(this.state.intervalID);
  };

  addSubmission = (taskid, submission) => {
    this.setState({
      exercises: this.state.exercises.categories.map(categorie =>
        categorie.exerciseList.map(exercise => {
          if (exercise.taskid === taskid)
            exercise.submissions = [submission, ...exercise.submissions];
          return exercise;
        })
      )
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar username={this.state.username} />
          <div id="body" className="tile is-ancestor">
            <Switch>
              <React.Fragment>
                <React.Fragment>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <ProfilePage
                        charname={this.state.charname}
                        character={this.state.character}
                        assets={this.state.assets}
                        achievements={this.state.achievements}
                        onSaveCharacterProperties={
                          this.onSaveCharacterProperties
                        }
                        onSaveCharname={this.onSaveCharname}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/leaderboard"
                    render={LeaderboardPage}
                  />
                  <Route
                    exact
                    path="/exercises/:taskid"
                    render={() => (
                      <ExercisePage
                        loadExercises={this.loadExercises}
                        addSubmission={this.addSubmission}
                        exercises={this.state.exercises}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/exercises"
                    render={() => (
                      <ExerciseOverviewPage
                        categories={this.state.exercises.categories}
                      />
                    )}
                  />
                </React.Fragment>
                <BeanWrapper
                  charname={this.state.charname}
                  character={this.state.character} />
              </React.Fragment>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
