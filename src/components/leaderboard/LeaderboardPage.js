import React, { Component } from 'react'
import Leaderboard from './Leaderboard'
import axios_inst from '../../js/backend'

export default class LeaderboardPage extends Component {
  state = {
    leaderboards: [{
      title: "",
      description: "",
      header: {
        rank: "",
        bean: "",
        points: "",
      },
      rows: [
        {
          rank: 1,
          bean: "",
          points: 0,
        },
      ],
    }],
  }

  componentDidMount() {
    this.getLeaderboards();
  }

  getLeaderboards() {
    // Dummy state
    // Axios will look up these.

    this.setState({
      leaderboards: [{
        title: "Meister der Möglichkeiten",
        description: "Verwende die meisten if-Abfragen in einer Aufgabe",
        header: {
          rank: "Rang",
          bean: "Bohne",
          points: "Anzahl",
        },
        rows: [
          {
            rank: 1,
            bean: "Trollbob_100",
            points: 70,
          },
          {
            rank: 2,
            bean: "DieLiese71",
            points: 65,
          },
          {
            rank: 3,
            bean: "MarkusHerold",
            points: 62,
          },
          {
            rank: 4,
            bean: "DerKleineJonas",
            points: 61,
          },
          {
            rank: 5,
            bean: "Nico",
            points: 59,
          },
        ],
      }],
  
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.leaderboards.map((l) => (
          <Leaderboard 
            key={l.title}
            title={l.title}
            description={l.description}
            header={l.header}
            rows={l.rows}
          />
        ))}
      </React.Fragment>
    )
  }
}
