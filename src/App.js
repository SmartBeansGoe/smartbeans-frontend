import React, { Component } from 'react'
import axios_inst from './js/backend'
import NavBar from './components/navigation/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LeaderboardPage from './components/leaderboard/LeaderboardPage'
import ExerciseOverviewPage from './components/exercises/ExerciseOverviewPage'
import Bean from './components/character/Bean'
import ExercisePage from './components/exercises/ExercisePage';


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
    };
  }

  componentDidMount() {
    this.checkLogin();
    this.loadUser();
    this.loadExercises();
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
          <NavBar username={ this.state.user.username }/>
          <div id="body" className="tile is-ancestor">
            <React.Fragment>
                <Route 
                  exact
                  path="/leaderboard"
                  component={LeaderboardPage}
                />
                <Route
                  exact
                  path="/exercises/:taskid"
                  component={() => <ExercisePage categories={this.state.exercises.categories} />}
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
            <div className="tile is-vertical is-2 is-parent">
              <div className="tile is-child box">
                <p className="title has-text-centered has-background-success-light">
                  { this.state.user.nickname }
                </p>
                <Bean />
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
