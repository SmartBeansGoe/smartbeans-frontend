import React, { Component } from 'react';
import PersonalCard from './PersonalCard';
import team from './team.json';

export default class Team extends Component {
  render() {
    return (
      <div className="container"
        style={{
          maxWidth: 'auto',
        }}
      >
        {team.map((el, id) => (
          <PersonalCard
            name={el.name}
            job={el.job}
            description={el.description}
            svg={el.svg}
            leftAlign={id % 2 === 0}
          />
        ))}
      </div>
    );
  }
}
