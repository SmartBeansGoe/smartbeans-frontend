import React, { Component } from 'react';
import lang from '../../lang/de_DE.json';

export default class Research extends Component {
  render() {
    return (
      <article>
        <p>{lang['firstlogin.message-1']}</p>
        <ul>
          <li>{lang['firstlogin.message-1-a']}</li>
          <br />
          <li>{lang['firstlogin.message-1-b']}</li>
          <br />
          <li>{lang['firstlogin.message-1-c']}</li>
          <br />
        </ul>
      </article>
    );
  }
}
