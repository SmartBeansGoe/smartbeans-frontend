import React, { Component } from 'react';
import PersonalCard from './PersonalCard';
import team from './team.json';

export default class Team extends Component {
  render() {
    return (
      <>
        {team.map((el, id) => (
          <PersonalCard
            key={el.name + id}
            name={el.name}
            job={el.job}
            description={el.description}
            svg={el.svg}
            leftAlign={id % 2 === 0}
          />
        ))}
      </>
    );
  }
}
