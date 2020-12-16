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


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        nickname: "Thomas",
      },
      character: {
        body_color: "#f6b73c",
        shirt_id: "",
        face_id: "",     
      }
    };
    this.onBodyColorChange = this.onBodyColorChange.bind(this);
    console.log(this.state.character.body_color);
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
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
        },
        character: {
          body_color: this.state.character.body_color,
          shirt_id: this.state.character.shirt_id,
          face_id: this.state.character.face_id,
        }
      }));
  }

  onBodyColorChange = color => {
    this.setState({
      user: {
        username: this.state.user.username,
        nickname: this.state.user.nickname,
      },
      character: {
        body_color: color,
        shirt_id: this.state.character.shirt_id,
        face_id: this.state.character.face_id,
      }
    });
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
                  onBodyColorChange={this.onBodyColorChange} />
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
                <Bean body_color={this.state.character.body_color}/>
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
