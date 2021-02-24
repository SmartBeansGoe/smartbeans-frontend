import React, { Component } from 'react';
import lang from '../../lang/de_DE.json';

export default class PrivacyPolicy extends Component {
  render() {
    return (
        <article >
          <p>{lang['firstlogin.privacy-policy-part-1']}</p>
          <ul>
            <li>{lang['firstlogin.privacy-policy-part-2-a']}</li>
            <li>{lang['firstlogin.privacy-policy-part-2-b']}</li>
            <li>{lang['firstlogin.privacy-policy-part-2-c']}</li>
          </ul>
          <p>{lang['firstlogin.privacy-policy-part-3']}</p>
          <p>
            {lang['about.privacy-policy.more-info-a']}{' '}
            <a
              href={lang['firstlogin.opt-in-consent-b-link']}
              target="_blank"
              rel="noreferrer"
            >
              {lang['about.privacy-policy.more-info-b']}
            </a>{' '}
            {lang['about.privacy-policy.more-info-c']}
          </p>
        </article>
    );
  }
}
