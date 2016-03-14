import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let SocialPersonAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </SvgIcon>
);
SocialPersonAdd = pure(SocialPersonAdd)
SocialPersonAdd.displayName = 'SocialPersonAdd';

export default SocialPersonAdd;