import React from 'react';
import lang from '../../lang/de_DE.json';

export default function Error404() {
  return (
    <div className="tile is-parent">
      <article className="tile is-child box">
        <p className="title">{lang['error.404.title']}</p>
        <p className="subtitle">{lang['error.404.message']}</p>
      </article>
    </div>
  );
}
